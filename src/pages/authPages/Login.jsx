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
    <div className="flex justify-center  h-screen items-center ">
      {/* left  */}
      <div className="border h-100 p-20">
        <h2>IMS</h2>
      </div>
      <div>
        <Card className="p-20">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
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
                  <div className="flex items-center gap-20">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" name="password" />
                </div>
                {state?.error && (
                  <div className="text-red-700">{state.error}</div>
                )}
                <Submit></Submit>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2"></CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default Login;
