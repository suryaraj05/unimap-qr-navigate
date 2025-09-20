import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapIcon, CalendarIcon, QrCodeIcon, ClockIcon, StarIcon, TrendingUpIcon, UsersIcon, NavigationIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const StudentDashboard = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Machine Learning Workshop",
      date: "March 18, 2024",
      time: "3:00 PM",
      location: "Science Building Room 201",
      category: "academic",
    },
    {
      id: 2,
      title: "Spring Music Festival",
      date: "March 20, 2024",
      time: "12:00 PM",
      location: "Campus Quad",
      category: "cultural",
    },
    {
      id: 3,
      title: "Basketball Championship Finals",
      date: "March 22, 2024",
      time: "7:00 PM",
      location: "Sports Arena",
      category: "sports",
    },
  ];

  const recentReviews = [
    {
      event: "Computer Science Career Fair",
      rating: 5,
      comment: "Great networking opportunities and helpful career advice!",
      date: "2 days ago",
    },
    {
      event: "International Food Festival",
      rating: 4,
      comment: "Amazing food variety, could use better organization.",
      date: "1 week ago",
    },
  ];

  const quickStats = [
    { label: "Events Attended", value: "12", icon: CalendarIcon, color: "text-primary" },
    { label: "Favorite Locations", value: "8", icon: MapIcon, color: "text-accent" },
    { label: "QR Codes Generated", value: "23", icon: QrCodeIcon, color: "text-warm-orange" },
    { label: "Campus Rating", value: "4.8", icon: StarIcon, color: "text-success-green" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} userRole="student" />
      
      <main className="flex-1 py-8 bg-gradient-secondary/30">
        <div className="container">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Alex! 👋</h1>
            <p className="text-muted-foreground text-lg">Here's what's happening on your campus today.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => (
              <Card key={index} className="shadow-card border-0 hover:shadow-elevated transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* My Upcoming Events */}
              <Card className="shadow-card border-0">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    My Upcoming Events
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/events">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="space-y-1">
                        <div className="font-medium">{event.title}</div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3" />
                            {event.time}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">{event.location}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="capitalize">
                          {event.category}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <NavigationIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {upcomingEvents.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No upcoming events. Explore events to get started!</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Reviews */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <StarIcon className="h-5 w-5 text-primary" />
                    Recent Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentReviews.map((review, index) => (
                    <div key={index} className="p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-medium">{review.event}</div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon 
                              key={i} 
                              className={`h-3 w-3 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">"{review.comment}"</p>
                      <div className="text-xs text-muted-foreground">{review.date}</div>
                    </div>
                  ))}
                  {recentReviews.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>No reviews yet. Attend events and share your experience!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Quick Links */}
            <div className="space-y-6">
              {/* Quick Links */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    asChild 
                    className="w-full justify-start bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300"
                  >
                    <Link to="/map">
                      <MapIcon className="mr-3 h-4 w-4" />
                      Explore Campus Map
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full justify-start bg-background hover:bg-secondary/50 transition-colors"
                  >
                    <Link to="/events">
                      <CalendarIcon className="mr-3 h-4 w-4" />
                      Browse Events
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full justify-start bg-background hover:bg-secondary/50 transition-colors"
                  >
                    <Link to="/qr-navigate">
                      <QrCodeIcon className="mr-3 h-4 w-4" />
                      Generate QR Route
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Campus Insights */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUpIcon className="h-5 w-5 text-primary" />
                    Campus Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Most Popular Location</span>
                      <span className="text-sm font-medium">Student Union</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Trending Event Type</span>
                      <span className="text-sm font-medium">Academic</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Students Today</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <UsersIcon className="h-3 w-3" />
                        1,247
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help & Support */}
              <Card className="shadow-card border-0 bg-gradient-primary text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Get support or provide feedback about your UniMap experience.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-white text-primary bg-white hover:bg-white/90 transition-colors"
                  >
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudentDashboard;