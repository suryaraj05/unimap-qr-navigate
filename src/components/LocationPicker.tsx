import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MapPinIcon, SearchIcon, XIcon } from "lucide-react";
import { listPlaces, type PlaceDoc } from "@/services/firestore";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icons (works with bundlers)
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadowUrl, iconAnchor: [12, 41], popupAnchor: [1, -34] });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(L.Marker as any).prototype.options.icon = DefaultIcon;

type Location = PlaceDoc & { id: string };

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: string) => void;
  title?: string;
}

const LocationPicker = ({ isOpen, onClose, onLocationSelect, title = "Select Location" }: LocationPickerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const places = await listPlaces();
        setLocations(places as Location[]);
      } catch (e) {
        setLocations([]);
      }
    })();
  }, []);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mapBounds = useMemo(() => {
    const src = filteredLocations.length ? filteredLocations : locations;
    if (!src.length) return null;
    return L.latLngBounds(src.map(l => [l.lat, l.lng]) as [number, number][]);
  }, [filteredLocations, locations]);

  const FitView = () => {
    const map = useMap();
    useEffect(() => {
      if (mapBounds) {
        map.fitBounds(mapBounds.pad(0.1));
      } else {
        map.setView([18.8769, 77.9436], 16);
      }
    }, [map, mapBounds]);
    return null;
  };

  const handleLocationClick = (location: Location) => {
    // Immediately select and close
    onLocationSelect(location.name);
    handleClose();
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
          <DialogTitle className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-primary" />
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex h-full">
          {/* Map Area (interactive Leaflet) */}
          <div className="flex-1 relative">
            <MapContainer style={{ height: "100%", width: "100%" }} center={[18.8769, 77.9436]} zoom={16}>
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FitView />
              {(filteredLocations.length ? filteredLocations : locations).map((loc) => (
                <Marker key={loc.id} position={[loc.lat, loc.lng]} eventHandlers={{ click: () => handleLocationClick(loc) }}>
                  <Popup>
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{loc.name}</div>
                      <div className="text-xs text-muted-foreground">{loc.type}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
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