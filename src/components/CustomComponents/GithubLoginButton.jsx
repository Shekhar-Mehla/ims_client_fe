import { Button } from "@/components/ui/button";
import { signInWithPopup } from "firebase/auth";
import { auth, githubProvider } from "@/firebase";
import { FaGithub } from "react-icons/fa";

const GithubLoginButton = () => {
  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
    } catch (error) {
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center gap-2 border border-gray-300 hover:bg-gray-100 transition"
      onClick={handleGithubLogin}
    >
      <FaGithub className="text-gray-800 text-xl" />
      Continue with GitHub
    </Button>
  );
};

export default GithubLoginButton;
