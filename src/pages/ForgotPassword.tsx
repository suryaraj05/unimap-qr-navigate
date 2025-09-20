import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon, MailIcon, CheckCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Password reset request for:", email);
      setIsLoading(false);
      setIsEmailSent(true);
    }, 2000);
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <Header />
        
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md">
            <Card className="shadow-elevated border-0 bg-background/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircleIcon className="h-8 w-8 text-green-600" />
                </div>
                
                <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
                <p className="text-muted-foreground mb-6">
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Please check your email and follow the instructions to reset your password.
                </p>
                
                <div className="space-y-4">
                  <Button 
                    onClick={() => setIsEmailSent(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Try Different Email
                  </Button>
                  
                  <Button asChild className="w-full bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300">
                    <Link to="/login">
                      <ArrowLeftIcon className="mr-2 h-4 w-4" />
                      Back to Login
                    </Link>
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the email? Check your spam folder or contact support if the problem persists.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="shadow-elevated border-0 bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MailIcon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Reset Your Password</CardTitle>
              <p className="text-muted-foreground">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleResetPassword} className="space-y-4">
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

                <Button 
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full h-12 bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300 text-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Reset Link...
                    </div>
                  ) : (
                    <>
                      <MailIcon className="mr-2 h-5 w-5" />
                      Send Reset Link
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
                
                <div className="pt-4 border-t">
                  <Button variant="outline" size="sm" asChild className="w-full hover:bg-secondary/50 transition-colors">
                    <Link to="/">
                      <ArrowLeftIcon className="mr-2 h-4 w-4" />
                      Back to Home
                    </Link>
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

export default ForgotPassword;
