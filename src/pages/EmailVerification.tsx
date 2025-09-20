import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MailIcon, CheckCircleIcon, RefreshCwIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EmailVerification = () => {
  const handleResendEmail = () => {
    // Simulate resending verification email
    console.log("Resending verification email...");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 bg-gradient-secondary">
        <div className="w-full max-w-md">
          <Card className="shadow-elevated border-0 text-center">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MailIcon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Check Your Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We've sent a verification link to your university email address. Please check your inbox and click the link to activate your account.
                </p>
                
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <CheckCircleIcon className="h-4 w-4 text-success-green" />
                    <span>Email sent successfully</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or:
                </p>
                
                <Button 
                  onClick={handleResendEmail}
                  variant="outline" 
                  className="w-full bg-background hover:bg-secondary/50 transition-colors"
                >
                  <RefreshCwIcon className="mr-2 h-4 w-4" />
                  Resend Verification Email
                </Button>
              </div>

              <div className="pt-4 border-t space-y-3">
                <p className="text-sm text-muted-foreground">
                  Already verified your email?
                </p>
                <Button 
                  asChild
                  className="w-full bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300"
                >
                  <Link to="/login">
                    Continue to Login
                  </Link>
                </Button>
              </div>

              <div className="text-xs text-muted-foreground space-y-2">
                <p>
                  📧 Make sure to check your spam/junk folder if you don't see the email in your inbox.
                </p>
                <p>
                  🔗 The verification link will expire in 24 hours for security reasons.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="mt-6 shadow-card border-0">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Having trouble with email verification?
              </p>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmailVerification;