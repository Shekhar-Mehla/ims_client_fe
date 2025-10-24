import React, { useActionState, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, KeyRound, Lock } from "lucide-react";

const ForgotPassword = () => {
  const [step, setStep] = useState("email");
  const [mail, setmail] = useState(null);
  const handleOnSubmit = async (prevState, formdata) => {
    const email = formdata.get("email");
    const otp = formdata.get("otp");
    const password = formdata.get("password");
    if (email) {
      // make api call
      return startTransition(() => {
        setStep("otp");
        setmail(email);
      });
    }
    if (otp) {
      // make api call here
      console.log(otp);
      return startTransition(() => {
        setStep("reset");
      });
    }
    if (password) {
      


      console.log(password);
    }
  };

  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(handleOnSubmit, {});

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=1920&q=80')"
      }}
    >
      {/* Gentle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/20 to-transparent" />

      {/* Centered form container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center w-full max-w-5xl mx-auto backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 bg-white/80 md:bg-white/70 dark:bg-neutral-900/70 dark:border-neutral-800 transition-all">
        {/* Left info section */}
        <div className="hidden md:flex flex-1 flex-col justify-center items-start px-10 py-14 bg-gradient-to-br from-blue-600/90 via-blue-700/80 to-indigo-800/90 text-white">
          <h1 className="text-4xl font-semibold leading-tight mb-4">
            Internship Management Portal
          </h1>
          <p className="text-base text-blue-100 max-w-sm">
            Manage your internship journey with ease. Reset your password to
            continue applying for IT opportunities.
          </p>
        </div>

        {/* Right form section */}
        <div className="flex-1 w-full px-8 py-10 md:py-14">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-white">
                {step === "email" && "Forgot Password"}
                {step === "otp" && "Verify OTP"}
                {step === "reset" && "Reset Password"}
              </CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {step === "email" &&
                  "We’ll send a verification code to your email address."}
                {step === "otp" && `Enter the 6-digit OTP sent to ${mail}.`}
                {step === "reset" && "Enter your new password below."}
              </p>
            </CardHeader>

            <CardContent className="space-y-6 mt-6">
              <form action={formAction}>
                {step === "email" && (
                  <div className="space-y-3">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-9"
                        name="email"
                      />
                    </div>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      type="submit"
                      disabled={isPending}
                    >
                      {isPending ? "Sending..." : "Send OTP"}
                    </Button>
                  </div>
                )}

                {step === "otp" && (
                  <div className="space-y-3">
                    <Label htmlFor="otp">OTP Code</Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        id="otp"
                        type="text"
                        placeholder="6-digit code"
                        maxLength={6}
                        className="pl-9 text-center tracking-[0.4em]"
                        name="otp"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="w-1/2"
                        onClick={() => setStep("email")}
                        disabled={isPending}
                      >
                        Back
                      </Button>
                      <Button
                        className="w-1/2 bg-blue-600 hover:bg-blue-700"
                        type="submit"
                        disabled={isPending}
                      >
                        {isPending ? "Verifying..." : "Verify"}
                      </Button>
                    </div>
                  </div>
                )}

                {step === "reset" && (
                  <div className="space-y-3">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter new password"
                        className="pl-9"
                        name="password"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="w-1/2"
                        type="submit"
                        disabled={isPending}
                        onClick={() => {
                          setStep("otp");
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        className="w-1/2 bg-blue-600 hover:bg-blue-700"
                        type="submit"
                        disabled={isPending}
                      >
                        {isPending ? "Saving..." : "Reset Password"}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>

            <CardFooter className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
              <p>
                Remember your password?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
