import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapIcon, CalendarIcon, QrCodeIcon, NavigationIcon, UsersIcon, ClockIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-campus.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Navigate Your University<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-warm-orange">
              Like Never Before
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover events, find your way around campus, and connect with your university community through UniMap's smart navigation system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild
              className="bg-white text-primary hover:bg-white/90 shadow-elevated transition-all duration-300 hover:shadow-glow"
            >
              <Link to="/map">
                <MapIcon className="mr-2 h-5 w-5" />
                Explore Campus Map
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild
              className="border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              <Link to="/events">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Discover Events
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Navigate Campus
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From finding your next class to discovering exciting events, UniMap makes university life easier and more connected.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                  <MapIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Interactive Campus Map</h3>
                <p className="text-muted-foreground mb-4">
                  Navigate through buildings, find facilities, and get real-time directions with our comprehensive campus map.
                </p>
                <Button variant="ghost" asChild className="text-primary hover:bg-primary/10">
                  <Link to="/map">Explore Map</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                  <CalendarIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Campus Events</h3>
                <p className="text-muted-foreground mb-4">
                  Discover and join events happening around campus. Never miss out on what's happening in your university community.
                </p>
                <Button variant="ghost" asChild className="text-primary hover:bg-primary/10">
                  <Link to="/events">Browse Events</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                  <QrCodeIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">QR Navigation</h3>
                <p className="text-muted-foreground mb-4">
                  Generate QR codes for routes and share directions instantly. Perfect for helping friends find locations quickly.
                </p>
                <Button variant="ghost" asChild className="text-primary hover:bg-primary/10">
                  <Link to="/qr-navigate">Generate QR</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
              <p className="text-muted-foreground">Campus Buildings</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">200+</div>
              <p className="text-muted-foreground">Events Monthly</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">5K+</div>
              <p className="text-muted-foreground">Active Students</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
              <p className="text-muted-foreground">Navigation Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore Your Campus?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students already using UniMap to navigate their university experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild
              className="bg-white text-primary hover:bg-white/90 shadow-elevated transition-all duration-300"
            >
              <Link to="/register">
                <UsersIcon className="mr-2 h-5 w-5" />
                Get Started Free
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild
              className="border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              <Link to="/map">
                <NavigationIcon className="mr-2 h-5 w-5" />
                Try Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;