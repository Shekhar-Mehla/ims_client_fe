import { Button } from "@/components/ui/button";
import { signInWithPopup } from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
} from "../../firebase/firebase-config.js";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✅ Google Login Success:", result.user);
    } catch (error) {
      console.error("❌ Google Login Error:", error.message);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center gap-2 border border-gray-300 hover:bg-gray-100 transition"
      onClick={handleGoogleLogin}
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;
