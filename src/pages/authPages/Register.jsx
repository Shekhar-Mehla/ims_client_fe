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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UseForm from "../../hooks/UseForm";
import { registerUser } from "../../features/user/userapi.js";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleOnChange, form, setForm } = UseForm({});

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const { confirmpassword, ...rest } = form;
    const response = await registerUser(rest);
    console.log(response);
    if (response?.status === "success") {
      toast.success("Registration successful! Please verify your email.");
      // setForm({});
    } else {
      toast.error("Registration failed. Please try again.");
    }
  };
  return (
    <div className="bg-gradient-to-b from-amber-50 to-amber-200 min-h-screen flex items-center justify-center">
      <div className="flex sm:flex-row flex-col items-stretch m-8 rounded-2xl gap-4 p-4 shadow-lg bg-amber-100">
        <img
          src="/public/1.jpg"
          alt=""
          className="sm:w-1/2 w-full h-96 sm:h-auto object-cover rounded-lg "
        />

        <Card className="w-full sm:w-1/2   ">
          <CardHeader>
            <CardTitle className="text-4xl text-center">Sign up</CardTitle>
            <CardDescription>
              Enter your detials to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOnSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fName">First Name *</Label>
                    <Input
                      id="fName"
                      name="fName"
                      type="text"
                      placeholder="john"
                      value={form.fName}
                      required
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lName">First Name *</Label>
                    <Input
                      id="lName"
                      name="lName"
                      type="text"
                      placeholder="Abraham"
                      required
                      value={form.lName}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={form.email}
                    required
                    onChange={handleOnChange}
                  />
                </div>
                {/* password and conform password */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Password Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="pr-10"
                        value={form.password}
                        onChange={handleOnChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmpassword"
                        name="confirmpassword"
                        type={showPassword ? "text" : "password"}
                        required
                        className="pr-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 rounded-full p-1 transition-colors cursor-pointer text-lg font-semibold text-white"
                >
                  Sign UP
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
