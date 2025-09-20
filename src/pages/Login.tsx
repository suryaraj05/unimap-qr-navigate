import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon, GraduationCapIcon, MailIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt:", { email, password });
      setIsLoading(false);
      // Redirect to student dashboard
      navigate("/student-dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <GraduationCapIcon className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  UniMap
                </h1>
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                Navigate Your Campus
                <span className="block text-primary">With Confidence</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Access interactive maps, discover events, and connect with your university community all in one place.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-lg">
                <div className="text-2xl mb-2">🗺️</div>
                <h3 className="font-semibold mb-1">Interactive Maps</h3>
                <p className="text-sm text-muted-foreground">Find any location on campus instantly</p>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-4 rounded-lg">
                <div className="text-2xl mb-2">📅</div>
                <h3 className="font-semibold mb-1">Campus Events</h3>
                <p className="text-sm text-muted-foreground">Stay updated with university activities</p>
              </div>
            </div>
          </div>
          
          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <Card className="shadow-elevated border-0 bg-background/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <p className="text-muted-foreground">Sign in to your UniMap account</p>
              </CardHeader>
              <CardContent className="space-y-6">
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
                      className="bg-secondary/50 border-0 focus:bg-background transition-colors h-12"
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
                        className="bg-secondary/50 border-0 focus:bg-background transition-colors h-12 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-12 w-12"
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
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading || !email || !password}
                    className="w-full h-12 bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300 text-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      <>
                        <LockIcon className="mr-2 h-5 w-5" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                      Sign up here
                    </Link>
                  </p>
                  
                  <div className="pt-4 border-t">
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;