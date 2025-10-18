import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { EyeIcon, EyeOffIcon, MapIcon, MailIcon, LockIcon, UserIcon, GraduationCapIcon, BriefcaseIcon, ShieldIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    const ok = await signup(formData.email, formData.password, formData.fullName, formData.role as any);
    if (ok) {
      setIsLoading(false);
      if (formData.role === 'host') {
        navigate('/host-request');
      } else {
        navigate(`/${formData.role}-dashboard`);
      }
    } else {
      setIsLoading(false);
      setError("Failed to create account. Please try again.");
    }
  };

  const roleIcons = {
    student: GraduationCapIcon,
    host: BriefcaseIcon,
    admin: ShieldIcon,
  };

  const roleDescriptions = {
    student: "Access campus navigation, events, and personalized features",
    host: "Create and manage events, connect with students",
    admin: "Manage users, approve hosts, and oversee system operations",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 bg-gradient-secondary">
        <div className="w-full max-w-lg">
          <Card className="shadow-elevated border-0">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapIcon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Join UniMap</CardTitle>
              <p className="text-muted-foreground">
                Create your account to unlock personalized campus navigation and events
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-primary" />
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="bg-secondary/50 border-0 focus:bg-background transition-colors h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MailIcon className="h-4 w-4 text-primary" />
                    University Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your university email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
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
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
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

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <LockIcon className="h-4 w-4 text-primary" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="bg-secondary/50 border-0 focus:bg-background transition-colors h-11 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-9 w-9 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Account Type</label>
                  <RadioGroup 
                    value={formData.role} 
                    onValueChange={(value) => handleInputChange("role", value)}
                    className="space-y-2"
                  >
                    {Object.entries(roleDescriptions).map(([role, description]) => {
                      const IconComponent = roleIcons[role as keyof typeof roleIcons];
                      return (
                        <div key={role} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                          <RadioGroupItem value={role} id={role} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={role} className="flex items-center gap-2 font-medium cursor-pointer">
                              <IconComponent className="h-4 w-4 text-primary" />
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              {description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading || !formData.fullName || !formData.email || !formData.password || !formData.confirmPassword}
                  className="w-full h-11 bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6">
                <Separator className="my-4" />
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="text-primary hover:underline font-medium transition-colors"
                    >
                      Sign in here
                    </Link>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    By creating an account, you agree to our{" "}
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;