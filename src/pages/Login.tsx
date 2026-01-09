import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Auth logic will be implemented later
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mx-auto mb-4 shadow-soft">
            <span className="text-2xl font-bold text-primary-foreground">DS</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">DSA Portal</h1>
          <p className="text-muted-foreground">Data Structures & Algorithms</p>
          <p className="text-sm text-muted-foreground">PUCIT - Fall 2024</p>
        </div>

        {/* Login Card */}
        <div 
          className="bg-card rounded-2xl border border-border p-8 shadow-card animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-1">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">Sign in with your PUCIT email</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="bcsf23m001@pucit.edu.pk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 rounded-xl"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Use your official @pucit.edu.pk email
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full rounded-xl gap-2 bg-primary hover:bg-primary/90 h-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Continue with Google
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full rounded-xl gap-2 h-12"
            onClick={() => window.location.href = "/admin"}
          >
            <Lock className="h-4 w-4" />
            TA / Admin Login
          </Button>
        </div>

        {/* Footer */}
        <p 
          className="text-center text-xs text-muted-foreground mt-6 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
