import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  UsersIcon, 
  SearchIcon, 
  FilterIcon,
  HeartIcon,
  ShareIcon,
  StarIcon,
  MapIcon,
  CheckCircleIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationPicker from "@/components/LocationPicker";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [interestedEvents, setInterestedEvents] = useState<number[]>([]);
  const [enrolledEvents, setEnrolledEvents] = useState<number[]>([]);

  const events = [
    {
      id: 1,
      title: "Machine Learning Workshop",
      description: "Learn the fundamentals of machine learning with hands-on projects and real-world applications.",
      date: "2024-01-20",
      time: "2:00 PM - 5:00 PM",
      location: "Science Building Room 201",
      category: "academic",
      attendees: 45,
      maxAttendees: 60,
      price: "Free",
      organizer: "Computer Science Department",
      image: "🧠",
      rating: 4.8,
      tags: ["Technology", "Workshop", "Free"]
    },
    {
      id: 2,
      title: "Spring Music Festival",
      description: "Join us for a day of live music, food trucks, and campus community celebration.",
      date: "2024-01-25",
      time: "12:00 PM - 8:00 PM",
      location: "Campus Quad",
      category: "cultural",
      attendees: 120,
      maxAttendees: 200,
      price: "$5",
      organizer: "Student Activities Board",
      image: "🎵",
      rating: 4.6,
      tags: ["Music", "Festival", "Food"]
    },
    {
      id: 3,
      title: "Basketball Championship Finals",
      description: "Watch the final game of the campus basketball tournament. Free admission for students.",
      date: "2024-01-22",
      time: "7:00 PM - 9:00 PM",
      location: "Sports Arena",
      category: "sports",
      attendees: 300,
      maxAttendees: 500,
      price: "Free",
      organizer: "Athletics Department",
      image: "🏀",
      rating: 4.9,
      tags: ["Sports", "Championship", "Free"]
    },
    {
      id: 4,
      title: "Art Exhibition Opening",
      description: "View the latest student artwork and meet the artists behind these creative pieces.",
      date: "2024-01-18",
      time: "6:00 PM - 9:00 PM",
      location: "Arts Center Gallery",
      category: "cultural",
      attendees: 25,
      maxAttendees: 50,
      price: "Free",
      organizer: "Art Department",
      image: "🎨",
      rating: 4.7,
      tags: ["Art", "Exhibition", "Free"]
    },
    {
      id: 5,
      title: "Career Fair 2024",
      description: "Connect with top employers and explore internship and job opportunities.",
      date: "2024-01-30",
      time: "10:00 AM - 4:00 PM",
      location: "Student Union Ballroom",
      category: "professional",
      attendees: 200,
      maxAttendees: 300,
      price: "Free",
      organizer: "Career Services",
      image: "💼",
      rating: 4.5,
      tags: ["Career", "Networking", "Free"]
    },
    {
      id: 6,
      title: "Environmental Sustainability Talk",
      description: "Learn about sustainable practices and how to make a positive impact on the environment.",
      date: "2024-01-28",
      time: "3:00 PM - 4:30 PM",
      location: "Environmental Science Building",
      category: "academic",
      attendees: 35,
      maxAttendees: 80,
      price: "Free",
      organizer: "Environmental Studies",
      image: "🌱",
      rating: 4.4,
      tags: ["Environment", "Education", "Free"]
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "academic", label: "Academic" },
    { value: "cultural", label: "Cultural" },
    { value: "sports", label: "Sports" },
    { value: "professional", label: "Professional" },
    { value: "social", label: "Social" }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesLocation = !selectedLocation || event.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleInterestToggle = (eventId: number) => {
    setInterestedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleEnrollmentToggle = (eventId: number) => {
    setEnrolledEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationPicker(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 bg-gradient-secondary">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Campus Events</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover exciting events happening around campus and connect with your university community.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-secondary/50 border-0 focus:bg-background transition-colors"
                    />
                  </div>

                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-secondary/50 border-0 focus:bg-background transition-colors">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Location Filter */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Filter by location..."
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="bg-secondary/50 border-0 focus:bg-background transition-colors"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowLocationPicker(true)}
                      className="bg-secondary/50 border-0 hover:bg-secondary transition-colors"
                    >
                      <MapIcon className="h-4 w-4 text-primary" />
                    </Button>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedLocation("");
                    }}
                    className="bg-secondary/50 border-0 hover:bg-secondary transition-colors"
                  >
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="border-0 shadow-card hover:shadow-elevated transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{event.image}</span>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {event.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{event.organizer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{event.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Event Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{event.attendees}/{event.maxAttendees} attendees</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Attendance</span>
                      <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <Badge variant={event.price === "Free" ? "default" : "outline"} className="text-sm">
                      {event.price === "Free" ? "Free Event" : `$${event.price}`}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleInterestToggle(event.id)}
                        className={`flex-1 ${
                          interestedEvents.includes(event.id)
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'hover:bg-secondary/50'
                        }`}
                      >
                        <HeartIcon className={`mr-2 h-4 w-4 ${
                          interestedEvents.includes(event.id) ? 'fill-current' : ''
                        }`} />
                        {interestedEvents.includes(event.id) ? 'Interested' : 'Mark Interest'}
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-secondary/50">
                        <ShareIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Enrollment Button */}
                    <Button
                      size="sm"
                      onClick={() => handleEnrollmentToggle(event.id)}
                      className={`w-full ${
                        enrolledEvents.includes(event.id)
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300'
                      }`}
                    >
                      {enrolledEvents.includes(event.id) ? (
                        <>
                          <CheckCircleIcon className="mr-2 h-4 w-4" />
                          Enrolled
                        </>
                      ) : (
                        <>
                          <UsersIcon className="mr-2 h-4 w-4" />
                          Enroll Now
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or check back later for new events.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedLocation("");
                }}
                variant="outline"
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Card className="border-0 shadow-card bg-gradient-primary text-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Want to Host an Event?</h2>
                <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                  Join our community of event hosts and create memorable experiences for your fellow students.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-primary bg-white hover:bg-white/90 transition-colors"
                    asChild
                  >
                    <Link to="/register">Become a Host</Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 backdrop-blur-sm transition-colors"
                    asChild
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Location Picker */}
      <LocationPicker
        isOpen={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onLocationSelect={handleLocationSelect}
        title="Select Event Location"
      />
      
      <Footer />
    </div>
  );
};

export default Events;