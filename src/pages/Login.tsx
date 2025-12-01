import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogIn, User } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useUser();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        const { name, email, picture } = userInfo.data;
        login({ name, email, picture });

        toast.success("Google Login Successful!");
        navigate("/");
      } catch (error) {
        console.error("Failed to fetch user info", error);
        toast.error("Failed to fetch user info from Google");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setLoading(false);
      toast.error("Google Login Failed");
    },
  });

  const handleGuestLogin = () => {
    login({ name: "Guest User", email: "", picture: "" });
    toast.success("Welcome, Guest!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            onClick={() => handleGoogleLogin()}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 h-12 text-base"
            variant="outline"
          >
            <LogIn className="w-5 h-5" />
            {loading ? "Connecting..." : "Sign in with Google"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            onClick={handleGuestLogin}
            className="w-full flex items-center justify-center gap-2 h-12 text-base bg-gray-800 hover:bg-gray-900 text-white"
            variant="default"
          >
            <User className="w-5 h-5" />
            Sign in as Guest
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
