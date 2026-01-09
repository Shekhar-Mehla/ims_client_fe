import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Submit from "../../components/CustomComponents/Submit";
import { useActionState } from "react";
import { registerUser } from "../../features/user/userapi.js";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase-config.js";
import { useDispatch } from "react-redux";
import { googleLoginAction } from "../../features/user/useraction.js";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("12345678");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      navigate("/");
    } catch (error) {
      console.error("❌ Google Registration Error:", error.message);
    }
  };

  const handleOnSubmit = async (prevState, formData) => {
    const fName = formData.get("fName");
    const lName = formData.get("lName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmpassword");

    if (!fName || !lName || !email || !password || !confirmPassword) {
      return { error: "All fields are required" };
    }

    if (!email.includes("@")) {
      return { error: "Please enter a valid email address" };
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    try {
      const userData = {
        fName,
        lName,
        email,
        password,
        technologies: [],
        sectors: [],
        roles: [],
      };
      const response = await registerUser(userData);
      if (response?.status === "success") {
        return "success";
      } else {
        return {
          error: response?.message || "Registration failed. Please try again.",
        };
      }
    } catch (error) {
      return {
        error: error.message || "Registration failed. Please try again.",
      };
    }
  };

  const [state, formAction] = useActionState(handleOnSubmit, {});
  
  const calculateStrength = (pwd) => {
    if (pwd.length === 0) return 0;
    let strength = 0;
    if (pwd.length > 6) strength += 25;
    if (/[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 25;
    return strength;
  };

  const strength = calculateStrength(passwordValue);

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-neutral-950 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Left side - Form Section */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="max-w-md w-full space-y-8 relative">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
               </span>
               New Era of Internships
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
              Create <span className="text-blue-600 dark:text-blue-500">Account</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Start your journey with the world's leading internship platform.
            </p>
          </div>

          {/* Social Logins */}
          <div className="pt-2">
             <button 
                type="button" 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 h-12 border border-gray-200 dark:border-neutral-800 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-900 transition-all font-medium text-sm"
             >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.172-1.02 1.02-2.612 1.94-5.912 1.94-5.464 0-9.42-3.832-9.42-8.3s3.956-8.3 9.42-8.3c3.088 0 5.376 1.076 7.108 2.508l2.308-2.308C19.78 1.48 16.536 0 12.48 0 5.612 0 0 4.88 0 10.92s5.612 10.92 12.48 10.92c3.704 0 6.512-1.076 8.704-3.152 2.256-2.256 2.964-5.412 2.964-8.032 0-.768-.06-1.5-.18-2.188z" />
                </svg>
                Sign up with Google
             </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200 dark:border-neutral-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-neutral-950 px-2 text-gray-500 font-semibold tracking-wider">Or continue with</span>
            </div>
          </div>

          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm font-medium border border-red-100 dark:border-red-900/30 animate-in fade-in slide-in-from-top-1 duration-300">
                <div className="flex gap-2 items-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                   {state.error}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">First Name</Label>
                <div className="group relative">
                  <Input id="fName" name="fName" placeholder="Alex" className="h-12 pl-10 rounded-xl bg-gray-50/50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 focus:bg-white dark:focus:bg-neutral-950 transition-all" required defaultValue="sm" />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Last Name</Label>
                <div className="group relative">
                  <Input id="lName" name="lName" placeholder="Smith" className="h-12 pl-10 rounded-xl bg-gray-50/50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 focus:bg-white dark:focus:bg-neutral-950 transition-all" required defaultValue="meh" />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</Label>
              <div className="group relative">
                <Input id="email" name="email" type="email" placeholder="alex@example.com" className="h-12 pl-10 rounded-xl bg-gray-50/50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 focus:bg-white dark:focus:bg-neutral-950 transition-all" required defaultValue="smehla147@gmail.com" />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Password</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="h-12 pl-10 pr-10 rounded-xl bg-gray-50/50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 focus:bg-white dark:focus:bg-neutral-950 transition-all"
                    required
                    onChange={(e) => setPasswordValue(e.target.value)}
                    defaultValue="12345678"
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="group relative">
                  <Input
                    id="confirmpassword"
                    name="confirmpassword"
                    type={showPassword ? "text" : "password"}
                    className="h-12 pl-10 rounded-xl bg-gray-50/50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 focus:bg-white dark:focus:bg-neutral-950 transition-all"
                    placeholder="Confirm"
                    required
                    defaultValue="12345678"
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>
              
              {/* Strength meter */}
              <div className="px-1 pt-1 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight text-gray-400">
                      <span>Security Strength</span>
                      <span className={strength >= 75 ? "text-green-500" : strength >= 50 ? "text-amber-500" : "text-gray-400"}>
                          {strength >= 75 ? "Excellent" : strength >= 50 ? "Average" : "Weak"}
                      </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden flex gap-1 p-[1px]">
                      <div className={`h-full rounded-full transition-all duration-500 ${strength >= 25 ? "bg-red-500 w-[25%]" : "w-0"}`} />
                      <div className={`h-full rounded-full transition-all duration-500 ${strength >= 50 ? "bg-amber-500 w-[25%]" : "w-0"}`} />
                      <div className={`h-full rounded-full transition-all duration-500 ${strength >= 75 ? "bg-blue-500 w-[25%]" : "w-0"}`} />
                      <div className={`h-full rounded-full transition-all duration-500 ${strength === 100 ? "bg-green-500 w-[25%]" : "w-0"}`} />
                  </div>
              </div>
            </div>

            <div className="pt-4">
              <Submit
                title="Create My Account"
                loadingText="Securing your space..."
                className="w-full h-13 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] font-bold text-lg"
              />
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already powered up?{" "}
            <Link to="/login" className="font-bold text-blue-600 dark:text-blue-400 hover:underline decoration-2 underline-offset-4">
              Sign in to your port
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Immersive Visual Section */}
      <div className="hidden lg:flex lg:w-[45%] bg-neutral-900 relative flex-col justify-between p-16 overflow-hidden">
        {/* Background visual effects */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/public/1.jpg" 
            alt="Workspace" 
            className="w-full h-full object-cover opacity-40 scale-110 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 to-indigo-900/90 mix-blend-color" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Brand logo/name */}
        <div className="relative z-10">
           <div className="flex items-center gap-2 text-white font-bold text-3xl tracking-tighter">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
                 <span className="text-white font-black text-xl">I</span>
              </div>
              IMS
           </div>
        </div>

        {/* Featured Content */}
        <div className="relative z-10 space-y-8">
            <div className="space-y-4">
                <h2 className="text-5xl font-bold leading-tight text-white">
                  Unlock your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">potential.</span>
                </h2>
                <p className="text-lg text-gray-300 max-w-sm">
                  Join the elite circle of students gaining experience at Fortune 500 companies.
                </p>
            </div>

            {/* Testimonial card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl space-y-4 max-w-sm shadow-2xl">
                <div className="flex gap-1 text-amber-400">
                    {[1,2,3,4,5].map(i => <CheckCircle2 key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm font-medium text-white italic">
                  "This platform helped me land a summer internship at Google. The process was seamless and the opportunities are world-class."
                </p>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-blue-500 bg-[url('https://randomuser.me/api/portraits/thumb/women/32.jpg')] bg-cover border-2 border-white/50" />
                   <div>
                       <p className="text-xs font-bold text-white">Sarah Jenkins</p>
                       <p className="text-[10px] text-blue-300">Software Intern @ Tech Giant</p>
                   </div>
                </div>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-4">
                <div>
                    <h4 className="text-2xl font-black text-white">12k+</h4>
                    <p className="text-[10px] text-blue-300 uppercase font-bold tracking-widest">Placements</p>
                </div>
                <div>
                    <h4 className="text-2xl font-black text-white">450</h4>
                    <p className="text-[10px] text-blue-300 uppercase font-bold tracking-widest">Partners</p>
                </div>
            </div>
        </div>

        {/* Bottom footer for auth */}
        <div className="relative z-10 flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <span>&copy; 2026 InternSphere</span>
            <div className="flex gap-4">
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Terms</a>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Register;
