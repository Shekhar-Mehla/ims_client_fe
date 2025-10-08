import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Submit from "../../components/CustomComponents/Submit";
import { useActionState } from "react";
import loginImage from "../../assets/Student-Internship.jpg";

const Login = () => {
  const handleOnSubmit = async (prevState, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email) {
      return { error: "email is not valid" };
    }
    // make api call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (email === "smehla147@gmail.com" && password === "123") {
      return "success";
    } else {
      return { error: "invalid credentials" };
    }
  };

  const [state, formAction] = useActionState(handleOnSubmit, {});

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <Card className="flex flex-row overflow-hidden rounded-xl shadow-lg">
        {/* Left - Image Section */}
        <div className="w-1/2 bg-slate-800">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right - Form Section */}
        <div className="w-1/2 bg-white text-gray-800 p-10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Login to your account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your email and password below
            </CardDescription>
            <CardAction>
              <Button
                variant="link"
                className="p-0 text-blue-600 hover:underline"
              >
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form action={formAction}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    name="email"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" name="password" />
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
        </div>
      </Card>
    </div>
  );
};
export default Login;
