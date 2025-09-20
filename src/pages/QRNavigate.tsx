import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCodeIcon, NavigationIcon, ShareIcon, DownloadIcon, MapPinIcon } from "lucide-react";
import QRCode from "react-qr-code";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationPicker from "@/components/LocationPicker";

const QRNavigate = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  // Location suggestions data
  const locationSuggestions = [
    "Main Library",
    "Student Union",
    "Dining Hall",
    "Gym & Recreation",
    "Science Building",
    "Arts Center",
    "Medical Center",
    "Parking Lot A",
    "Computer Science Building",
    "Business School",
    "Engineering Building",
    "Dormitory A",
    "Dormitory B",
    "Campus Bookstore",
    "Student Center",
    "Cafeteria",
    "Sports Complex",
    "Research Lab",
    "Administration Building",
    "Parking Garage"
  ];

  const handleLocationInput = (value: string, type: 'from' | 'to') => {
    if (type === 'from') {
      setFromLocation(value);
      if (value.length > 0) {
        const filtered = locationSuggestions.filter(loc => 
          loc.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5);
        setFromSuggestions(filtered);
        setShowFromSuggestions(true);
      } else {
        setShowFromSuggestions(false);
      }
    } else {
      setToLocation(value);
      if (value.length > 0) {
        const filtered = locationSuggestions.filter(loc => 
          loc.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5);
        setToSuggestions(filtered);
        setShowToSuggestions(true);
      } else {
        setShowToSuggestions(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string, type: 'from' | 'to') => {
    if (type === 'from') {
      setFromLocation(suggestion);
      setShowFromSuggestions(false);
    } else {
      setToLocation(suggestion);
      setShowToSuggestions(false);
    }
  };

  const handleGenerateQR = () => {
    if (fromLocation && toLocation) {
      setShowQRCode(true);
    }
  };

  const handleReset = () => {
    setFromLocation("");
    setToLocation("");
    setShowQRCode(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-gradient-secondary">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">QR Navigate</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate QR codes for campus routes and share directions instantly with friends and colleagues.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {!showQRCode ? (
              /* Route Input Form */
              <Card className="shadow-elevated border-0">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <QrCodeIcon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Create Navigation QR Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4 text-primary" />
                        From Location
                      </label>
                      <div className="relative">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter starting point (e.g., Main Library)"
                            value={fromLocation}
                            onChange={(e) => handleLocationInput(e.target.value, 'from')}
                            onFocus={() => fromLocation.length > 0 && setShowFromSuggestions(true)}
                            className="bg-secondary/50 border-0 focus:bg-background transition-colors h-12 flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 bg-secondary/50 border-0 hover:bg-secondary transition-colors"
                            onClick={() => setShowFromPicker(true)}
                          >
                            <MapPinIcon className="h-4 w-4 text-primary" />
                          </Button>
                        </div>
                        
                        {/* From Suggestions Dropdown */}
                        {showFromSuggestions && fromSuggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-12 mt-1 bg-background border shadow-elevated rounded-lg z-10 max-h-48 overflow-y-auto">
                            {fromSuggestions.map((suggestion, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-secondary/50 cursor-pointer text-sm border-b last:border-b-0"
                                onClick={() => handleSuggestionClick(suggestion, 'from')}
                              >
                                <div className="flex items-center gap-2">
                                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                                  {suggestion}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <NavigationIcon className="h-4 w-4 text-primary" />
                        To Location
                      </label>
                      <div className="relative">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter destination (e.g., Student Union)"
                            value={toLocation}
                            onChange={(e) => handleLocationInput(e.target.value, 'to')}
                            onFocus={() => toLocation.length > 0 && setShowToSuggestions(true)}
                            className="bg-secondary/50 border-0 focus:bg-background transition-colors h-12 flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 bg-secondary/50 border-0 hover:bg-secondary transition-colors"
                            onClick={() => setShowToPicker(true)}
                          >
                            <MapPinIcon className="h-4 w-4 text-primary" />
                          </Button>
                        </div>
                        
                        {/* To Suggestions Dropdown */}
                        {showToSuggestions && toSuggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-12 mt-1 bg-background border shadow-elevated rounded-lg z-10 max-h-48 overflow-y-auto">
                            {toSuggestions.map((suggestion, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-secondary/50 cursor-pointer text-sm border-b last:border-b-0"
                                onClick={() => handleSuggestionClick(suggestion, 'to')}
                              >
                                <div className="flex items-center gap-2">
                                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                                  {suggestion}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      onClick={handleGenerateQR}
                      disabled={!fromLocation || !toLocation}
                      className="w-full h-12 bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300 text-lg"
                    >
                      <QrCodeIcon className="mr-2 h-5 w-5" />
                      Generate QR Code
                    </Button>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>💡 Tip: QR codes can be scanned by any smartphone camera to instantly access directions</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* QR Code Display */
              <Card className="shadow-elevated border-0">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Your Navigation QR Code</CardTitle>
                  <p className="text-muted-foreground">
                    From <span className="font-medium text-foreground">{fromLocation}</span> to <span className="font-medium text-foreground">{toLocation}</span>
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* QR Code Display Area */}
                  <div className="bg-white p-8 rounded-lg mx-auto w-fit shadow-card">
                    <div className="w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <QRCode
                          value={`unimap://navigate?from=${encodeURIComponent(fromLocation)}&to=${encodeURIComponent(toLocation)}`}
                          size={200}
                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        />
                        <p className="text-xs text-muted-foreground mt-2">Scan with camera</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 bg-background hover:bg-secondary/50 transition-colors"
                    >
                      <ShareIcon className="mr-2 h-4 w-4" />
                      Share QR Code
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 bg-background hover:bg-secondary/50 transition-colors"
                    >
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Download Image
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                      className="flex-1 bg-background hover:bg-secondary/50 transition-colors"
                    >
                      Create New Route
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-primary border-0 hover:shadow-glow transition-all duration-300"
                    >
                      <NavigationIcon className="mr-2 h-4 w-4" />
                      View on Map
                    </Button>
                  </div>

                  <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                    <h4 className="font-medium text-sm">How to use this QR code:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Point any smartphone camera at the QR code</li>
                      <li>• Tap the notification that appears</li>
                      <li>• Follow the navigation instructions</li>
                      <li>• Share the code with friends to help them find the location</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Features Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center p-6 border-0 shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCodeIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Instant Generation</h3>
              <p className="text-sm text-muted-foreground">
                Create QR codes for any campus route in seconds
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ShareIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Easy Sharing</h3>
              <p className="text-sm text-muted-foreground">
                Share directions with friends via text, email, or social media
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <NavigationIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Universal Access</h3>
              <p className="text-sm text-muted-foreground">
                Works with any smartphone camera - no app required
              </p>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Location Pickers */}
      <LocationPicker
        isOpen={showFromPicker}
        onClose={() => setShowFromPicker(false)}
        onLocationSelect={setFromLocation}
        title="Select Starting Location"
      />
      
      <LocationPicker
        isOpen={showToPicker}
        onClose={() => setShowToPicker(false)}
        onLocationSelect={setToLocation}
        title="Select Destination"
      />
      
      <Footer />
    </div>
  );
};

export default QRNavigate;