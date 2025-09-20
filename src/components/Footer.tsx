import { MapIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-primary rounded-lg flex items-center justify-center">
                <MapIcon className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold bg-gradient-primary bg-clip-text text-transparent">
                UniMap
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Navigate your university with ease. Find events, get directions, and connect with your campus community.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Campus Navigation</li>
              <li>Event Discovery</li>
              <li>QR Code Routes</li>
              <li>Real-time Updates</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Student Portal</li>
              <li>University Website</li>
              <li>Campus IT Support</li>
              <li>Feedback</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 UniMap. All rights reserved. Built for university communities.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;