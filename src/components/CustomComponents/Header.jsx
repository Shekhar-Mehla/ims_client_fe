"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Menu,
  X,
  Search,
  Home,
  Briefcase,
  LogOut,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
  autologinAction,
  logoutAction,
} from "../../features/user/useraction.js";
import socket from "../../socket.js";
import { fetchNotificationpActions } from "../../features/notification/notificationAction.js";
import { getApplicationsByUserAction } from "../../features/application/applicationaction.js";
import { fetchInternshipActions } from "../../features/internship/internshipaction.js";
import NotificationIcon from "./NotificationIcon"; // Import the component

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userInfo?.user);
  const { internships, loading, error } = useSelector(
    (state) => state.internshipInfo
  );
  
  // ---------------- Search behaviour ----------------
  // refs for desktop and mobile search inputs
  const mainSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // controlled values for search fields
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  const isMainSearchActive = Boolean(
    searchQuery && searchQuery.toString().trim().length > 0
  );
  const isMobileSearchActive = Boolean(
    mobileSearchQuery && mobileSearchQuery.toString().trim().length > 0
  );
  const refrshtoken = localStorage.getItem("refreshToken");

  useEffect(() => {
    // fetch internships ONCE if not present
    if (internships.length === 0) {
      dispatch(fetchInternshipActions());
    }

    // auto login
    if (!user?._id && refrshtoken) {
      dispatch(autologinAction());
    }

    // when user exists
    if (user?._id) {
      // dispatch(fetchNotificationpActions(user._id)); // NotificationIcon handles its own fetching now
      dispatch(getApplicationsByUserAction(user._id));

      socket.connect();
      socket.emit("join", user._id);
      
      socket.on("applicationStatusUpdated", (data) => {
        console.log("Application status updated:", data);
        dispatch(fetchNotificationpActions(user._id));
        dispatch(getApplicationsByUserAction(user._id));

        return () => {
          socket.off("applicationStatusUpdated");
        };
      });
    }

    return () => {
      socket.off("connect");
    };
  }, [dispatch, user?._id, internships.length]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutAction(user?.authId));
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // For Notification from the admin server

  // visual state helpers for affordances

  const handleSearch = useCallback(
    (query) => {
      const q = (query || "").toString().trim();
      if (!q) return;
      navigate(`/search?q=${encodeURIComponent(q)}`);
      // close mobile menu if open
      setMobileOpen(false);
    },
    [navigate]
  );

  // keyboard shortcut (Ctrl/Cmd+K) to focus desktop search
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        mainSearchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  // --------------------------------------------------

  const links = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    {
      name: "Internships",
      href: "/internships",
      icon: <Briefcase className="w-4 h-4" />,
    },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 px-6 py-3 backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 border-b border-white/10 dark:border-neutral-800 shadow-md transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
          IMS
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 mx-4 hidden md:flex justify-center">
          <div className="relative w-full max-w-3xl">
            <button
              type="button"
              onClick={() =>
                searchQuery && searchQuery.toString().trim()
                  ? handleSearch(searchQuery)
                  : mainSearchRef.current?.focus()
              }
              title={
                searchQuery
                  ? `Search for "${searchQuery}"`
                  : "Focus search (Ctrl/Cmd+K)"
              }
              aria-label="Search or focus"
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-transform ${
                isMainSearchActive
                  ? "text-blue-600 hover:text-blue-700 hover:scale-105"
                  : "text-gray-400 opacity-60 hover:opacity-80 animate-pulse"
              }`}
            >
              <Search className="w-5 h-5" />
            </button>
            <Input
              ref={mainSearchRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(searchQuery);
              }}
              name="search"
              aria-label="Search internships"
              placeholder="Search internships..."
              className="pl-10 pr-4 py-2 rounded-full w-full bg-white/90 dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Right: Links + Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors font-medium"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {user?._id && (
            <Link
              to="/my-applications"
              className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors font-medium"
            >
              <Briefcase className="w-4 h-4" />
              My Applications
            </Link>
          )}
          {/* Notification */}
          {user?._id ? (
            /* Authenticated User */
            <div className="flex items-center gap-3">
              {/* Notification Icon - shown on desktop */}
              <div className="hidden lg:block">
                <NotificationIcon />
              </div>
              
              {/* Profile Avatar */}
              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.firstName?.charAt(0)?.toUpperCase() ||
                    user?.email?.charAt(0)?.toUpperCase() ||
                    "U"}
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-medium hidden lg:block">
                  {user?.firstName || user?.email?.split("@")[0] || "User"}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:block">Logout</span>
              </button>
            </div>
          ) : (
            //test

            /* Non-authenticated User */
            <>
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-3 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-sm p-4 rounded-lg border border-white/10 dark:border-neutral-800 shadow-lg animate-slide-down">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors font-medium py-2 px-2 rounded-md"
              onClick={() => setMobileOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {/* Mobile: Notifications + My Applications (when authenticated) */}
          {user?._id && (
            <>
              <Link
                to="/notifications"
                className="flex items-center justify-between gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors font-medium py-2 px-2 rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </div>
                {/* unread count */}
                {unreadCount > 0 && (
                  <span className="bg-red-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Link>

              <Link
                to="/my-applications"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors font-medium py-2 px-2 rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                <Briefcase className="w-4 h-4" />
                My Applications
              </Link>
            </>
          )}

          {/* Mobile Search */}
          <div className="relative mt-2">
            <button
              type="button"
              onClick={() =>
                mobileSearchQuery && mobileSearchQuery.toString().trim()
                  ? handleSearch(mobileSearchQuery)
                  : mobileSearchRef.current?.focus()
              }
              title={
                mobileSearchQuery
                  ? `Search for "${mobileSearchQuery}"`
                  : "Focus mobile search"
              }
              aria-label="Search or focus mobile search"
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-transform ${
                isMobileSearchActive
                  ? "text-blue-600 hover:text-blue-700 hover:scale-105"
                  : "text-gray-400 opacity-60 hover:opacity-80 animate-pulse"
              }`}
            >
              <Search className="w-5 h-5" />
            </button>
            <Input
              ref={mobileSearchRef}
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(mobileSearchQuery);
              }}
              name="mobile-search"
              aria-label="Search internships"
              placeholder="Search internships..."
              className="pl-10 pr-4 py-2 rounded-full w-full bg-white/90 dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {user?._id ? (
            /* Authenticated User - Mobile */
            <>
              {/* Profile Link */}
              <div
                onClick={() => {
                  navigate("/profile");
                  setMobileOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.firstName?.charAt(0)?.toUpperCase() ||
                    user?.email?.charAt(0)?.toUpperCase() ||
                    "U"}
                </div>
                <div>
                  <div className="text-gray-700 dark:text-gray-200 font-medium">
                    {user?.firstName || user?.email?.split("@")[0] || "User"}
                  </div>
                  <div className="text-sm text-gray-500">View Profile</div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mt-2 transition w-full justify-center"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            /* Non-authenticated User - Mobile */
            <>
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md mt-2 transition w-full">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md mt-2 transition w-full">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
export default Header;
