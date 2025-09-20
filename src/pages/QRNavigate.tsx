import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCodeIcon, NavigationIcon, ShareIcon, DownloadIcon, MapPinIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const QRNavigate = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);

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
                      <Input
                        placeholder="Enter starting point (e.g., Main Library)"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className="bg-secondary/50 border-0 focus:bg-background transition-colors h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <NavigationIcon className="h-4 w-4 text-primary" />
                        To Location
                      </label>
                      <Input
                        placeholder="Enter destination (e.g., Student Union)"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        className="bg-secondary/50 border-0 focus:bg-background transition-colors h-12"
                      />
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
                        <div className="grid grid-cols-8 gap-1 w-32 h-32 mx-auto mb-4">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-foreground' : 'bg-transparent'} rounded-sm`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">Scan with camera</p>
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
      
      <Footer />
    </div>
  );
};

export default QRNavigate;