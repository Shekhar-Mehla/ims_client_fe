"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Submit from "../../components/CustomComponents/Submit";
import { useActionState, useEffect, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router";

import { signInWithPopup } from "firebase/auth";
import {
  auth,
  googleProvider,
} from "../../firebase/firebase-config.js";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, googleLoginAction } from "../../features/user/useraction.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";

  const { user, loading } = useSelector((state) => state.userInfo);
 
  useEffect(() => {
    user?._id && navigate(returnUrl);
  }, [user?._id, dispatch]);

  const handleOnSubmit = async (prevState, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email) {
      return { error: "email is not valid" };
    }

    try {
      const results = await dispatch(loginAction({ email, password }));

      results.status === "success" && navigate(returnUrl);
      // }
    } catch (error) {
      return { error: error.message || "Login failed" };
    }
  };

  const [state, formAction] = useActionState(handleOnSubmit, {});

  // ----------------- OAuth Handlers -----------------
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const userData = {
        email: result.user.email,
        fName: result.user.displayName?.split(" ")[0] || "User",
        lName: result.user.displayName?.split(" ").slice(1).join(" ") || "",
        uid: result.user.uid,
      };

      await dispatch(googleLoginAction(userData));

      navigate(returnUrl || "/", {
        state: returnUrl?.startsWith("/apply/")
          ? { internship: location.state?.internship }
          : undefined,
      });
    } catch (error) {
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Centered glassmorphism container */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-5xl mx-auto backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 bg-white/80 md:bg-white/70 dark:bg-neutral-900/70 dark:border-neutral-800 transition-all">
        {/* Left panel: gradient + portal branding */}
        <div className="hidden md:flex flex-1 flex-col justify-center px-12 py-14 bg-gradient-to-br from-blue-600/90 via-blue-700/80 to-indigo-800/90 text-white relative">
          <h1 className="text-4xl font-semibold leading-tight mb-4">
            Internship Management Portal
          </h1>
          <p className="text-base text-blue-100 max-w-sm">
            Manage your internship journey with ease. Apply, track, and get
            updates on IT opportunities.
          </p>
          <svg
            className="absolute bottom-8 right-8 w-32 h-32 opacity-20"
            fill="none"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="32" fill="white" />
          </svg>
        </div>
        {/* LOading part */}
        {loading && (
          <div style={{ textAlign: "center", padding: "30px" }}>
            Checking login…
          </div>
        )}

        {/* Right panel: login form */}
        <div className="flex-1 w-full px-8 py-10 md:py-14">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white">
                Login to your account
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
                Enter your email and password below
              </CardDescription>
              {returnUrl && returnUrl.startsWith("/apply/") && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">
                    🔄 You'll be redirected back to the application form after
                    login
                  </p>
                </div>
              )}
              <CardAction>
                <Link
                  to="/register"
                  variant=""
                  className="p-0 text-blue-600 hover:underline"
                >
                  Sign Up
                </Link>
              </CardAction>
            </CardHeader>

            <CardContent>
              <form action={formAction}>
                <div className="flex flex-col gap-6">
                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        name="email"
                        defaultValue="smehla147@gmail.com"
                        className="pl-9"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        defaultValue="12345678"
                        className="pl-9"
                      />
                    </div>
                  </div>

                  {/* Error message */}
                  {state?.error && (
                    <div className="text-sm text-red-600">{state.error}</div>
                  )}

                  {/* Submit */}
                  <Submit
                    title="Login"
                    loadingText="Logging in..."
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                  />
                </div>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <hr className="flex-1 border-gray-300 dark:border-gray-600" />
                <span className="px-3 text-gray-500 text-sm">
                  or continue with
                </span>
                <hr className="flex-1 border-gray-300 dark:border-gray-600" />
              </div>

              {/* OAuth Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 transition"
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle className="text-xl" /> Continue with Google
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
