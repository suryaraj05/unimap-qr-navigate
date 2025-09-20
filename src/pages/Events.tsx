import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon, SearchIcon, FilterIcon, HeartIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const categories = [
    { id: "all", name: "All Events" },
    { id: "academic", name: "Academic" },
    { id: "social", name: "Social" },
    { id: "sports", name: "Sports" },
    { id: "career", name: "Career" },
    { id: "cultural", name: "Cultural" },
  ];

  const events = [
    {
      id: 1,
      title: "Computer Science Career Fair",
      description: "Meet with top tech companies and explore internship opportunities in computer science and engineering.",
      date: "March 15, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "Student Union Ballroom",
      category: "career",
      attendees: 150,
      image: "💼",
    },
    {
      id: 2,
      title: "Spring Music Festival",
      description: "Annual spring celebration featuring local bands, food trucks, and community activities.",
      date: "March 20, 2024",
      time: "12:00 PM - 8:00 PM",
      location: "Campus Quad",
      category: "cultural",
      attendees: 500,
      image: "🎵",
    },
    {
      id: 3,
      title: "Machine Learning Workshop",
      description: "Hands-on workshop covering the fundamentals of machine learning and AI applications.",
      date: "March 18, 2024",
      time: "3:00 PM - 5:00 PM",
      location: "Science Building Room 201",
      category: "academic",
      attendees: 45,
      image: "🤖",
    },
    {
      id: 4,
      title: "Basketball Championship Finals",
      description: "Cheer on our university team in the championship finals. Free admission for students!",
      date: "March 22, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Sports Arena",
      category: "sports",
      attendees: 2000,
      image: "🏀",
    },
    {
      id: 5,
      title: "International Food Festival",
      description: "Taste cuisines from around the world prepared by international student organizations.",
      date: "March 25, 2024",
      time: "11:00 AM - 4:00 PM",
      location: "Dining Hall Plaza",
      category: "cultural",
      attendees: 300,
      image: "🌍",
    },
    {
      id: 6,
      title: "Study Abroad Information Session",
      description: "Learn about study abroad opportunities and scholarship programs available to students.",
      date: "March 28, 2024",
      time: "4:00 PM - 5:30 PM",
      location: "International Center",
      category: "academic",
      attendees: 80,
      image: "✈️",
    },
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      academic: "bg-blue-100 text-blue-800",
      social: "bg-green-100 text-green-800",
      sports: "bg-orange-100 text-orange-800",
      career: "bg-purple-100 text-purple-800",
      cultural: "bg-pink-100 text-pink-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="py-12 bg-gradient-secondary">
          <div className="container">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Campus Events</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover exciting events happening around campus. Connect with your community and never miss out on what matters to you.
              </p>
            </div>
            
            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background border-0 shadow-card focus:shadow-elevated transition-all"
                  />
                </div>
                <Dialog open={showLocationPicker} onOpenChange={setShowLocationPicker}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="bg-background hover:bg-secondary/50 transition-colors">
                      <MapPinIcon className="mr-2 h-4 w-4" />
                      Select Location
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Select Location from Map</DialogTitle>
                    </DialogHeader>
                    <div className="h-64 bg-gradient-to-br from-secondary to-accent/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPinIcon className="h-12 w-12 text-primary mx-auto mb-2" />
                        <p className="text-muted-foreground">Interactive map location picker</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? 
                      "bg-gradient-primary border-0 hover:shadow-glow transition-all" : 
                      "bg-background hover:bg-secondary/50 transition-colors"
                    }
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-0 shadow-card overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="text-4xl mb-2">{event.image}</div>
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <ClockIcon className="h-4 w-4 mr-2 text-primary" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPinIcon className="h-4 w-4 mr-2 text-primary" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <UsersIcon className="h-4 w-4 mr-2 text-primary" />
                        {event.attendees} attending
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="flex-1 bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300"
                        onClick={() => {
                          // For guest users, this would redirect to login
                          console.log("Interest in event:", event.id);
                        }}
                      >
                        <HeartIcon className="mr-2 h-4 w-4" />
                        Interested
                      </Button>
                      <Button variant="outline" size="icon" className="hover:bg-secondary/50 transition-colors">
                        <MapPinIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <CalendarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or check back later for new events.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;