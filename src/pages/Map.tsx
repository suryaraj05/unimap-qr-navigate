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
        {/* Google Maps-like Map Container */}
        <div className="relative h-[calc(100vh-4rem)] bg-background">
          {/* Interactive Map */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-muted/50 overflow-hidden">
            {/* Road Network Pattern */}
            <div className="absolute inset-0 opacity-30">
              {/* Horizontal roads */}
              <div className="absolute top-1/6 left-0 right-0 h-0.5 bg-muted-foreground/40"></div>
              <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-muted-foreground/40"></div>
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted-foreground/50"></div>
              <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-muted-foreground/40"></div>
              <div className="absolute top-5/6 left-0 right-0 h-0.5 bg-muted-foreground/40"></div>
              
              {/* Vertical roads */}
              <div className="absolute left-1/6 top-0 bottom-0 w-0.5 bg-muted-foreground/40"></div>
              <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-muted-foreground/40"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-muted-foreground/50"></div>
              <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-muted-foreground/40"></div>
              <div className="absolute left-5/6 top-0 bottom-0 w-0.5 bg-muted-foreground/40"></div>
            </div>
            
            {/* Campus Location Pins */}
            <div className="absolute top-[20%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer">
              <div className="w-10 h-10 bg-university-teal rounded-full flex items-center justify-center text-white shadow-elevated hover:bg-university-blue transition-colors">
                📚
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium whitespace-nowrap">Main Library</div>
            </div>
            
            <div className="absolute top-[35%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer">
              <div className="w-10 h-10 bg-university-teal rounded-full flex items-center justify-center text-white shadow-elevated hover:bg-university-blue transition-colors">
                🏢
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium whitespace-nowrap">Student Union</div>
            </div>
            
            <div className="absolute top-[55%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer">
              <div className="w-10 h-10 bg-university-teal rounded-full flex items-center justify-center text-white shadow-elevated hover:bg-university-blue transition-colors">
                🍕
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium whitespace-nowrap">Dining Hall</div>
            </div>
            
            <div className="absolute top-[70%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer">
              <div className="w-10 h-10 bg-university-teal rounded-full flex items-center justify-center text-white shadow-elevated hover:bg-university-blue transition-colors">
                🏃
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium whitespace-nowrap">Gym</div>
            </div>
            
            <div className="absolute top-[25%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer">
              <div className="w-10 h-10 bg-university-teal rounded-full flex items-center justify-center text-white shadow-elevated hover:bg-university-blue transition-colors">
                🔬
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium whitespace-nowrap">Science Building</div>
            </div>
            
            <div className="absolute top-[45%] left-[15%] transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer">
              <div className="w-10 h-10 bg-university-teal rounded-full flex items-center justify-center text-white shadow-elevated hover:bg-university-blue transition-colors">
                🎨
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium whitespace-nowrap">Arts Center</div>
            </div>
            
            <div className="absolute top-[80%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer">
              <div className="w-10 h-10 bg-university-teal rounded-full flex items-center justify-center text-white shadow-elevated hover:bg-university-blue transition-colors">
                🅿️
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium whitespace-nowrap">Parking A</div>
            </div>
            
            <div className="absolute top-[65%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer">
              <div className="w-10 h-10 bg-university-teal rounded-full flex items-center justify-center text-white shadow-elevated hover:bg-university-blue transition-colors">
                🏥
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium whitespace-nowrap">Medical Center</div>
            </div>
            
            {/* UniMap Branding */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-card">
              <h2 className="font-bold text-primary text-lg">UniMap</h2>
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