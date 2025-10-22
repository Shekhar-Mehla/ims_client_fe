import { Button } from "@/components/ui/button";
import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider } from "@/firebase";
import { FaFacebook } from "react-icons/fa";

const FacebookLoginButton = () => {
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("✅ Facebook Login Success:", result.user);
    } catch (error) {
      console.error("❌ Facebook Login Error:", error.message);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center gap-2 border border-gray-300 hover:bg-blue-50 transition"
      onClick={handleFacebookLogin}
    >
      <FaFacebook className="text-blue-600 text-xl" />
      Continue with Facebook
    </Button>
  );
};

export default FacebookLoginButton;
