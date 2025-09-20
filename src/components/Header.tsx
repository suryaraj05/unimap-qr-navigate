import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapIcon, CalendarIcon, QrCodeIcon, SearchIcon, LogOutIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  isAuthenticated?: boolean;
  userRole?: 'student' | 'host' | 'admin';
}

const Header = ({ isAuthenticated = false, userRole }: HeaderProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { user, logout } = useAuth();
  
  // Use context user if available, otherwise use props
  const currentUser = user || { role: userRole };
  const isLoggedIn = !!user || isAuthenticated;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center transition-transform hover:scale-110">
            <MapIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            UniMap
          </span>
        </Link>

        {/* Search Bar - Only show on home page */}
        {isHomePage && (
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search locations, events..." 
                className="pl-10 bg-secondary/50 border-0 focus:bg-background transition-colors"
              />
            </div>
          </div>
        )}

        {/* Navigation Icons */}
        <nav className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="hover:bg-secondary transition-colors"
          >
            <Link to="/map" className="flex items-center space-x-2">
              <MapIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Map</span>
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="hover:bg-secondary transition-colors"
          >
            <Link to="/events" className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="hover:bg-secondary transition-colors"
          >
            <Link to="/qr-navigate" className="flex items-center space-x-2">
              <QrCodeIcon className="h-4 w-4" />
              <span className="hidden sm:inline">QR Navigate</span>
            </Link>
          </Button>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2 ml-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name || 'User'}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                asChild
                className="bg-gradient-primary text-white border-0 hover:shadow-glow transition-all"
              >
                <Link to={`/${currentUser?.role}-dashboard`}>Dashboard</Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={logout}
                className="hover:bg-secondary/50 transition-colors"
              >
                <LogOutIcon className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button 
                size="sm" 
                asChild
                className="bg-gradient-primary border-0 hover:shadow-glow transition-all"
              >
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;