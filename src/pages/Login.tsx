import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogIn, User } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            setLoading(false);
            console.log(tokenResponse);
            toast.success("Google Login Successful!");
            // In a real app, you would verify this token with your backend
            // For now, we simulate a session
            navigate("/");
        },
        onError: () => {
            setLoading(false);
            toast.error("Google Login Failed");
        },
        onNonRecoverableError: () => {
            setLoading(false);
            toast.error("Google Login Failed (Non-recoverable)");
        }
    });

    const handleGoogleLogin = () => {
        setLoading(true);
        login();
    };

    const handleGuestLogin = () => {
        toast.success("Welcome, Guest!");
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue</p>
                </div>

                <div className="mt-8 space-y-4">
                    <Button
                        onClick={handleGoogleLogin}
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
