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
import { useActionState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router";

const Login = () => {
  const handleOnSubmit = async (prevState, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email) {
      return { error: "email is not valid" };
    }
    // simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3002));
    if (email === "smehla147@gmail.com" && password === "123") {
      return "success";
    } else {
      return { error: "invalid credentials" };
    }
  };

  const [state, formAction] = useActionState(handleOnSubmit, {});

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
          {/* Optional subtle tech SVG */}
          <svg
            className="absolute bottom-8 right-8 w-32 h-32 opacity-20"
            fill="none"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="32" fill="white" />
          </svg>
        </div>

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
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        name="email"
                        className="pl-9"
                      />
                    </div>
                  </div>

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
                        className="pl-9"
                      />
                    </div>
                  </div>

                  {state?.error && (
                    <div className="text-sm text-red-600">{state.error}</div>
                  )}

                  <Submit className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
                    Login
                  </Submit>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
