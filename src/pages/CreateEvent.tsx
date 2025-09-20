import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  UsersIcon, 
  DollarSignIcon,
  ImageIcon,
  PlusIcon,
  ArrowLeftIcon,
  SaveIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationPicker from "@/components/LocationPicker";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    maxAttendees: "",
    price: "",
    tags: [] as string[],
    image: ""
  });
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: "academic", label: "Academic" },
    { value: "cultural", label: "Cultural" },
    { value: "sports", label: "Sports" },
    { value: "professional", label: "Professional" },
    { value: "social", label: "Social" },
    { value: "workshop", label: "Workshop" },
    { value: "conference", label: "Conference" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleLocationSelect = (location: string) => {
    setFormData(prev => ({
      ...prev,
      location
    }));
    setShowLocationPicker(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Creating event:", formData);
      setIsLoading(false);
      // Redirect to host dashboard or show success message
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} userRole="host" />
      
      <main className="flex-1 py-8 bg-gradient-secondary">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/host-dashboard">
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Create New Event</h1>
                <p className="text-muted-foreground">
                  Share your event with the campus community and connect with students.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter event title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="bg-secondary/50 border-0 focus:bg-background transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="bg-secondary/50 border-0 focus:bg-background transition-colors">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event in detail..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-secondary/50 border-0 focus:bg-background transition-colors min-h-32"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Event Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={(e) => handleInputChange("image", e.target.value)}
                      className="bg-secondary/50 border-0 focus:bg-background transition-colors"
                    />
                    <Button type="button" variant="outline" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-primary" />
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="bg-secondary/50 border-0 focus:bg-background transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange("startTime", e.target.value)}
                      className="bg-secondary/50 border-0 focus:bg-background transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange("endTime", e.target.value)}
                      className="bg-secondary/50 border-0 focus:bg-background transition-colors"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Event Location *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      placeholder="Enter event location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="bg-secondary/50 border-0 focus:bg-background transition-colors"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowLocationPicker(true)}
                      className="bg-secondary/50 border-0 hover:bg-secondary transition-colors"
                    >
                      <MapPinIcon className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Capacity & Pricing */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-primary" />
                  Capacity & Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees">Maximum Attendees *</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      placeholder="50"
                      value={formData.maxAttendees}
                      onChange={(e) => handleInputChange("maxAttendees", e.target.value)}
                      className="bg-secondary/50 border-0 focus:bg-background transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Person</Label>
                    <div className="relative">
                      <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className="pl-10 bg-secondary/50 border-0 focus:bg-background transition-colors"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Leave empty for free events</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Event Tags</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Add tags to help students find your event
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (e.g., Technology, Free, Workshop)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="bg-secondary/50 border-0 focus:bg-background transition-colors"
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-primary/70"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link to="/host-dashboard">Cancel</Link>
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Event...
                  </div>
                ) : (
                  <>
                    <SaveIcon className="mr-2 h-4 w-4" />
                    Create Event
                  </>
                )}
              </Button>
            </div>
          </form>
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

export default CreateEvent;
