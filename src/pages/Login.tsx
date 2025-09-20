import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EyeIcon, EyeOffIcon, MapIcon, MailIcon, LockIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, redirect to student dashboard
      navigate("/student-dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 bg-gradient-secondary">
        <div className="w-full max-w-md">
          <Card className="shadow-elevated border-0">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapIcon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <p className="text-muted-foreground">
                Sign in to your UniMap account to access personalized features
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MailIcon className="h-4 w-4 text-primary" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your university email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary/50 border-0 focus:bg-background transition-colors h-11"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <LockIcon className="h-4 w-4 text-primary" />
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-secondary/50 border-0 focus:bg-background transition-colors h-11 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-9 w-9 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <Link 
                    to="/forgot-password" 
                    className="text-primary hover:underline transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading || !email || !password}
                  className="w-full h-11 bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6">
                <Separator className="my-4" />
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link 
                      to="/register" 
                      className="text-primary hover:underline font-medium transition-colors"
                    >
                      Sign up here
                    </Link>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    By signing in, you agree to our{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access for Guests */}
          <Card className="mt-6 shadow-card border-0">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Want to explore without an account?
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild className="flex-1 hover:bg-secondary/50 transition-colors">
                    <Link to="/map">View Map</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="flex-1 hover:bg-secondary/50 transition-colors">
                    <Link to="/events">Browse Events</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;