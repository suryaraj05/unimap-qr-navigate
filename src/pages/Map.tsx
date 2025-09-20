import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NavigationIcon, MapPinIcon, RouteIcon, QrCodeIcon, SearchIcon, PlusIcon, MinusIcon, CompassIcon, LayersIcon, XIcon, ClockIcon, UsersIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationPicker from "@/components/LocationPicker";

const Map = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [showNavigationDialog, setShowNavigationDialog] = useState(false);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [mapZoom, setMapZoom] = useState(100);
  const [mapLayers, setMapLayers] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleGenerateRoute = () => {
    if (fromLocation && toLocation) {
      // This would typically generate a QR code or navigate to QR display page
      console.log(`Generating route from ${fromLocation} to ${toLocation}`);
      setShowNavigationDialog(false);
    }
  };

  const handleLocationSelect = (location: string, type: 'from' | 'to') => {
    if (type === 'from') {
      setFromLocation(location);
    } else {
      setToLocation(location);
    }
  };

  const campusLocations = [
    { name: "Main Library", type: "Academic", icon: "📚", position: { top: "20%", left: "25%" } },
    { name: "Student Union", type: "Social", icon: "🏢", position: { top: "35%", left: "60%" } },
    { name: "Dining Hall", type: "Food", icon: "🍕", position: { top: "55%", left: "40%" } },
    { name: "Gym", type: "Fitness", icon: "🏃", position: { top: "70%", left: "75%" } },
    { name: "Science Building", type: "Academic", icon: "🔬", position: { top: "25%", left: "80%" } },
    { name: "Arts Center", type: "Academic", icon: "🎨", position: { top: "45%", left: "15%" } },
    { name: "Parking A", type: "Parking", icon: "🅿️", position: { top: "80%", left: "30%" } },
    { name: "Medical Center", type: "Health", icon: "🏥", position: { top: "65%", left: "65%" } },
  ];

  const filteredLocations = campusLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 relative">
        {/* Google Maps-like Map Container */}
        <div className="relative h-[calc(100vh-4rem)] bg-background">
          {/* Interactive Map */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Realistic Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-blue-50">
              {/* Campus Buildings and Roads */}
              <div className="absolute inset-0">
                {/* Main Campus Road */}
                <div className="absolute top-1/2 left-0 right-0 h-8 bg-gray-400 opacity-80"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-gray-400 opacity-80"></div>
                
                {/* Side Roads */}
                <div className="absolute top-1/4 left-0 right-0 h-4 bg-gray-300 opacity-60"></div>
                <div className="absolute top-3/4 left-0 right-0 h-4 bg-gray-300 opacity-60"></div>
                <div className="absolute left-1/4 top-0 bottom-0 w-4 bg-gray-300 opacity-60"></div>
                <div className="absolute left-3/4 top-0 bottom-0 w-4 bg-gray-300 opacity-60"></div>
                
                {/* Campus Buildings */}
                <div className="absolute top-[15%] left-[20%] w-16 h-12 bg-gray-600 rounded-sm"></div>
                <div className="absolute top-[25%] left-[60%] w-20 h-16 bg-gray-600 rounded-sm"></div>
                <div className="absolute top-[45%] left-[15%] w-14 h-10 bg-gray-600 rounded-sm"></div>
                <div className="absolute top-[55%] left-[70%] w-18 h-14 bg-gray-600 rounded-sm"></div>
                <div className="absolute top-[70%] left-[30%] w-16 h-12 bg-gray-600 rounded-sm"></div>
                <div className="absolute top-[80%] left-[60%] w-12 h-8 bg-gray-600 rounded-sm"></div>
                
                {/* Parking Lots */}
                <div className="absolute top-[10%] left-[5%] w-8 h-6 bg-yellow-200 border border-yellow-400"></div>
                <div className="absolute top-[75%] left-[80%] w-10 h-8 bg-yellow-200 border border-yellow-400"></div>
                
                {/* Green Spaces */}
                <div className="absolute top-[5%] left-[40%] w-12 h-8 bg-green-300 rounded-full opacity-70"></div>
                <div className="absolute top-[60%] left-[45%] w-16 h-12 bg-green-300 rounded-full opacity-70"></div>
                
                {/* Sidewalks */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200"></div>
              </div>
            </div>
            
            {/* Campus Location Pins */}
            {filteredLocations.map((location, index) => (
              <div
                key={location.name}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer ${
                  selectedLocation === location.name ? 'scale-125 z-10' : ''
                }`}
                style={{
                  top: location.position.top,
                  left: location.position.left,
                }}
                onClick={() => setSelectedLocation(selectedLocation === location.name ? null : location.name)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-elevated transition-colors ${
                  selectedLocation === location.name 
                    ? 'bg-warm-orange animate-pulse' 
                    : 'bg-university-teal hover:bg-university-blue'
                }`}>
                  {location.icon}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium whitespace-nowrap bg-background/90 px-2 py-1 rounded shadow-card">
                  {location.name}
                </div>
                {selectedLocation === location.name && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8 bg-background border shadow-elevated rounded-lg p-4 min-w-64 z-20">
                    <div className="font-medium text-lg mb-2">{location.name}</div>
                    <div className="text-sm text-muted-foreground mb-3">{location.type}</div>
                    
                    {/* Location Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4 text-primary" />
                        <span>Building A, Floor 2</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4 text-primary" />
                        <span>Open 8:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4 text-primary" />
                        <span>Capacity: 200 people</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFromLocation(location.name);
                          setSelectedLocation(null);
                        }}
                        className="text-xs flex-1"
                      >
                        Set as Start
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setToLocation(location.name);
                          setSelectedLocation(null);
                        }}
                        className="text-xs flex-1"
                      >
                        Set as End
                      </Button>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLocation(null);
                      }}
                      className="w-full mt-2 text-xs"
                    >
                      Close
                    </Button>
                  </div>
                )}
              </div>
            ))}
            
            {/* UniMap Branding */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-card">
              <h2 className="font-bold text-primary text-lg">UniMap</h2>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-10 space-y-2">
            {/* Zoom Controls */}
            <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-card p-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setMapZoom(Math.min(200, mapZoom + 10))}
                className="h-8 w-8 p-0"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
              <div className="w-px h-4 bg-muted-foreground/20 mx-1"></div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setMapZoom(Math.max(50, mapZoom - 10))}
                className="h-8 w-8 p-0"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Layer Controls */}
            <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-card p-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setMapLayers(mapLayers === "default" ? "satellite" : "default")}
                className="h-8 w-8 p-0"
              >
                <LayersIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Compass */}
            <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-card p-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <CompassIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Button */}
          <div className="absolute bottom-4 right-4 z-10">
            <Dialog open={showNavigationDialog} onOpenChange={setShowNavigationDialog}>
              <DialogTrigger asChild>
                <Button 
                  size="lg"
                  className="bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300 shadow-elevated"
                >
                  <NavigationIcon className="mr-2 h-5 w-5" />
                  Navigate
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <RouteIcon className="h-5 w-5 text-primary" />
                    Plan Your Route
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter starting location..."
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className="bg-secondary/50 border-0 focus:bg-background transition-colors"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setShowFromPicker(true)}
                        className="bg-secondary/50 border-0 hover:bg-secondary transition-colors"
                      >
                        <MapPinIcon className="h-4 w-4 text-primary" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">To</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter destination..."
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        className="bg-secondary/50 border-0 focus:bg-background transition-colors"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setShowToPicker(true)}
                        className="bg-secondary/50 border-0 hover:bg-secondary transition-colors"
                      >
                        <MapPinIcon className="h-4 w-4 text-primary" />
                      </Button>
                    </div>
                  </div>
                  <Button 
                    onClick={handleGenerateRoute}
                    className="w-full bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300"
                    disabled={!fromLocation || !toLocation}
                  >
                    <QrCodeIcon className="mr-2 h-4 w-4" />
                    Generate QR for Route
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search Overlay */}
          <div className="absolute top-4 left-4 z-10 w-80">
            <Card className="shadow-elevated border-0">
              <CardContent className="p-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search locations on campus..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary/50 border-0 focus:bg-background transition-colors"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campus Locations List */}
          <div className="absolute bottom-4 left-4 z-10 w-80">
            <Card className="shadow-elevated border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Popular Locations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                {filteredLocations.map((location) => (
                  <div 
                    key={location.name}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedLocation(selectedLocation === location.name ? null : location.name)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{location.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{location.name}</div>
                        <div className="text-xs text-muted-foreground">{location.type}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <NavigationIcon className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Location Pickers */}
      <LocationPicker
        isOpen={showFromPicker}
        onClose={() => setShowFromPicker(false)}
        onLocationSelect={(location) => handleLocationSelect(location, 'from')}
        title="Select Starting Location"
      />
      
      <LocationPicker
        isOpen={showToPicker}
        onClose={() => setShowToPicker(false)}
        onLocationSelect={(location) => handleLocationSelect(location, 'to')}
        title="Select Destination"
      />
      
      <Footer />
    </div>
  );
};

export default Map;