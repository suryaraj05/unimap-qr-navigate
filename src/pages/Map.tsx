import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NavigationIcon, MapPinIcon, RouteIcon, QrCodeIcon, SearchIcon, PlusIcon, MinusIcon, CompassIcon, LayersIcon, XIcon, ClockIcon, UsersIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationPicker from "@/components/LocationPicker";
import CampusMap from "@/components/CampusMap";
import { listPlaces, listEvents, type PlaceDoc, type EventDoc } from "@/services/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";

const Map = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [showNavigationDialog, setShowNavigationDialog] = useState(false);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [mapZoom, setMapZoom] = useState(100);
  const [mapLayers, setMapLayers] = useState("default");
  const [locateRequest, setLocateRequest] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [places, setPlaces] = useState<(PlaceDoc & { id: string })[]>([]);
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsForPlace, setEventsForPlace] = useState<(EventDoc & { id?: string })[]>([]);
  const [eventsPlaceName, setEventsPlaceName] = useState<string>("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const fromPlace: PlaceDoc | null = useMemo(() => places.find(p => p.name === fromLocation) || null, [fromLocation, places]);
  const toPlace: PlaceDoc | null = useMemo(() => places.find(p => p.name === toLocation) || null, [toLocation, places]);

  useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const nav = searchParams.get("nav");
    if (from) setFromLocation(from);
    if (to) setToLocation(to);
    if (nav === '1') setShowNavigationDialog(true);
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        const remote = await listPlaces();
        setPlaces(remote);
      } catch (e) {
        setPlaces([]);
      }
    })();
  }, []);

  const handleGenerateRoute = () => {
    if (fromLocation && toLocation) {
      // Close dialog; route is drawn by CampusMap from current from/to
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

  const filteredLocations = places.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 relative">
        {/* Live Leaflet Map */}
        <div className="relative h-[calc(100vh-4rem)] bg-background">
          <div className="absolute inset-0 overflow-hidden">
            <CampusMap
              places={places}
              from={fromPlace}
              to={toPlace}
              mapZoom={mapZoom}
              mapLayers={mapLayers as any}
              locateRequest={locateRequest}
              onSelectFrom={(p) => setFromLocation(p.name)}
              onSelectTo={(p) => setToLocation(p.name)}
              onViewEvents={async (p) => {
                setEventsPlaceName(p.name);
                setEventsLoading(true);
                setShowEventsModal(true);
                try {
                  const all = await listEvents();
                  setEventsForPlace(all.filter(e => e.location?.toLowerCase() === p.name.toLowerCase()));
                } catch {
                  setEventsForPlace([]);
                } finally {
                  setEventsLoading(false);
                }
              }}
            />
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-[1500] space-y-2 pointer-events-none">
            {/* Zoom Controls */}
            <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-card p-1 pointer-events-auto">
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
                onClick={() => setLocateRequest((x) => x + 1)}
              >
                <CompassIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Button (fixed) */}
          <div className="fixed bottom-4 right-4 z-[2000] pointer-events-none">
            <Dialog open={showNavigationDialog} onOpenChange={setShowNavigationDialog}>
              <DialogTrigger asChild>
                <Button 
                  size="lg"
                  className="bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300 shadow-elevated pointer-events-auto"
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
                    <RouteIcon className="mr-2 h-4 w-4" />
                    Show Route
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search Overlay (fixed) */}
          <div className="fixed left-4 z-[2000] w-80" style={{ top: "5rem" }}>
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
                  {searchQuery && filteredLocations.length > 0 && (
                    <div className="absolute left-0 right-0 mt-2 bg-background border rounded-md shadow-card z-[2200] max-h-64 overflow-y-auto">
                      {filteredLocations.slice(0, 8).map((loc) => (
                        <div key={loc.id} className="px-3 py-2 flex items-center justify-between hover:bg-secondary/50 cursor-pointer">
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate">{loc.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{loc.type}</div>
                          </div>
                          <div className="flex gap-2 ml-2">
                            <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setFromLocation(loc.name)}>
                              From
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setToLocation(loc.name)}>
                              To
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campus Locations List (fixed) */}
          <div className="fixed bottom-4 left-4 z-[2000] w-80">
            <Card className="shadow-elevated border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Popular Locations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                {filteredLocations.map((location) => (
                  <div 
                    key={location.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                    onClick={() => {
                      setFromLocation(location.name);
                    }}
                  >
                    <div className="flex items-center space-x-3">
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

      {/* Events at Place Modal */}
      <Dialog open={showEventsModal} onOpenChange={setShowEventsModal}>
        <DialogContent className="sm:max-w-3xl w-full max-w-5xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              Events at {eventsPlaceName || 'Selected Place'}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto text-base">
            {eventsLoading ? (
              <div className="p-4 text-base text-muted-foreground">Loading events...</div>
            ) : eventsForPlace.length === 0 ? (
              <div className="p-4 text-base text-muted-foreground">No events found at this location.</div>
            ) : (
              <div className="grid grid-cols-1 gap-6 p-2">
                {eventsForPlace.map(ev => (
                  <div
                    key={(ev as any).id || ev.title}
                    className="p-4 border rounded-lg shadow-card bg-background cursor-pointer hover:shadow-elevated transition-shadow"
                    onClick={() => navigate(`/event/${(ev as any).id}`)}
                  >
                    {ev.image && (
                      <img
                        src={ev.image as any}
                        alt={ev.title}
                        className="w-full h-[40vh] max-h-[40vh] object-cover rounded-md mb-4"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-lg">{ev.title}</div>
                      <span className="text-sm px-2 py-1 rounded bg-secondary/60">{ev.category}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">{ev.date} • {ev.time}</div>
                    <div className="text-base mb-2 line-clamp-4">{ev.description}</div>
                    <div className="text-sm text-muted-foreground mb-3">{ev.location}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">By {ev.organizer}</div>
                      <Button size="default" variant="outline" onClick={(e) => { e.stopPropagation(); navigate(`/event/${(ev as any).id}`); }}>
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Map;