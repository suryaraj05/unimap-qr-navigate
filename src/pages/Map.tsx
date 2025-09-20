import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NavigationIcon, MapPinIcon, RouteIcon, QrCodeIcon, SearchIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Map = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [showNavigationDialog, setShowNavigationDialog] = useState(false);

  const handleGenerateRoute = () => {
    if (fromLocation && toLocation) {
      // This would typically generate a QR code or navigate to QR display page
      console.log(`Generating route from ${fromLocation} to ${toLocation}`);
      setShowNavigationDialog(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 relative">
        {/* Map Container */}
        <div className="relative h-[calc(100vh-4rem)] bg-gradient-secondary">
          {/* Placeholder Map */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent/20 flex items-center justify-center">
            <div className="text-center p-8 bg-background/80 backdrop-blur-sm rounded-lg shadow-elevated max-w-md">
              <MapPinIcon className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Campus Map</h3>
              <p className="text-muted-foreground mb-4">
                Explore buildings, facilities, and points of interest across campus. 
                Click the Navigate button to get directions.
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-primary/10 p-2 rounded">📚 Library</div>
                <div className="bg-primary/10 p-2 rounded">🍕 Dining Hall</div>
                <div className="bg-primary/10 p-2 rounded">🏃 Gym</div>
                <div className="bg-primary/10 p-2 rounded">🅿️ Parking</div>
              </div>
            </div>
          </div>

          {/* Navigation Button */}
          <div className="absolute top-4 right-4 z-10">
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
                    <Input
                      placeholder="Enter starting location..."
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="bg-secondary/50 border-0 focus:bg-background transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">To</label>
                    <Input
                      placeholder="Enter destination..."
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="bg-secondary/50 border-0 focus:bg-background transition-colors"
                    />
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
                {[
                  { name: "Main Library", type: "Academic", icon: "📚" },
                  { name: "Student Union", type: "Social", icon: "🏢" },
                  { name: "Dining Hall", type: "Food", icon: "🍕" },
                  { name: "Gym & Recreation", type: "Fitness", icon: "🏃" },
                  { name: "Parking Lot A", type: "Parking", icon: "🅿️" },
                  { name: "Science Building", type: "Academic", icon: "🔬" },
                  { name: "Arts Center", type: "Academic", icon: "🎨" },
                  { name: "Medical Center", type: "Health", icon: "🏥" },
                ].map((location, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
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
      
      <Footer />
    </div>
  );
};

export default Map;