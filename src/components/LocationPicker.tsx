import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MapPinIcon, SearchIcon, XIcon } from "lucide-react";

interface Location {
  id: string;
  name: string;
  type: string;
  coordinates: { lat: number; lng: number };
}

const campusLocations: Location[] = [
  { id: "1", name: "Main Library", type: "Academic", coordinates: { lat: 40.7589, lng: -73.9851 } },
  { id: "2", name: "Student Union", type: "Social", coordinates: { lat: 40.7614, lng: -73.9776 } },
  { id: "3", name: "Dining Hall", type: "Food", coordinates: { lat: 40.7505, lng: -73.9934 } },
  { id: "4", name: "Gym & Recreation", type: "Fitness", coordinates: { lat: 40.7560, lng: -73.9860 } },
  { id: "5", name: "Science Building", type: "Academic", coordinates: { lat: 40.7580, lng: -73.9800 } },
  { id: "6", name: "Arts Center", type: "Academic", coordinates: { lat: 40.7620, lng: -73.9820 } },
  { id: "7", name: "Medical Center", type: "Health", coordinates: { lat: 40.7540, lng: -73.9900 } },
  { id: "8", name: "Parking Lot A", type: "Parking", coordinates: { lat: 40.7590, lng: -73.9750 } },
];

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: string) => void;
  title?: string;
}

const LocationPicker = ({ isOpen, onClose, onLocationSelect, title = "Select Location" }: LocationPickerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const filteredLocations = campusLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleConfirmSelection = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation.name);
      onClose();
      setSelectedLocation(null);
      setSearchQuery("");
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedLocation(null);
    setSearchQuery("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-primary" />
              {title}
            </span>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <XIcon className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex h-full">
          {/* Map Area */}
          <div className="flex-1 relative bg-gradient-to-br from-muted to-secondary/30">
            {/* Google Maps-like Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-muted/50">
              {/* Road patterns */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-0 right-0 h-px bg-muted-foreground/30"></div>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-muted-foreground/30"></div>
                <div className="absolute top-3/4 left-0 right-0 h-px bg-muted-foreground/30"></div>
                <div className="absolute left-1/4 top-0 bottom-0 w-px bg-muted-foreground/30"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted-foreground/30"></div>
                <div className="absolute left-3/4 top-0 bottom-0 w-px bg-muted-foreground/30"></div>
              </div>
              
              {/* Location Pins */}
              {filteredLocations.map((location, index) => (
                <div
                  key={location.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-300 hover:scale-110 ${
                    selectedLocation?.id === location.id ? 'scale-125 z-10' : ''
                  }`}
                  style={{
                    left: `${20 + (index % 4) * 20 + Math.random() * 10}%`,
                    top: `${20 + Math.floor(index / 4) * 25 + Math.random() * 10}%`,
                  }}
                  onClick={() => handleLocationClick(location)}
                >
                  <div className={`relative ${selectedLocation?.id === location.id ? 'animate-bounce' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-elevated transition-colors ${
                      selectedLocation?.id === location.id 
                        ? 'bg-warm-orange' 
                        : 'bg-university-teal hover:bg-university-blue'
                    }`}>
                      📍
                    </div>
                    {selectedLocation?.id === location.id && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-background border shadow-elevated rounded-lg p-2 min-w-32 text-center z-20">
                        <div className="font-medium text-sm">{location.name}</div>
                        <div className="text-xs text-muted-foreground">{location.type}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* UniMap Watermark */}
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-card">
                <span className="font-semibold text-primary text-sm">UniMap</span>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-80 bg-background border-l flex flex-col">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campus locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Location List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                    selectedLocation?.id === location.id
                      ? 'bg-primary/10 border-primary shadow-card'
                      : 'bg-secondary/50 border-transparent hover:bg-secondary hover:shadow-card'
                  }`}
                  onClick={() => handleLocationClick(location)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedLocation?.id === location.id ? 'bg-primary' : 'bg-university-teal'
                    }`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{location.name}</div>
                      <div className="text-xs text-muted-foreground">{location.type}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Actions */}
            <div className="p-4 border-t bg-secondary/20">
              <Button
                onClick={handleConfirmSelection}
                disabled={!selectedLocation}
                className="w-full bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300"
              >
                <MapPinIcon className="mr-2 h-4 w-4" />
                Select Location
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationPicker;