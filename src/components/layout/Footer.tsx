import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src="/book-a-creative-nest/logo.jpeg" alt="Book-A-Space Logo" className="h-10 w-auto" />
              <span className="font-bold text-2xl text-foreground">Book-A-Space</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Book inspiring creative spaces by the hour. From cozy apartments to breathtaking desert views, 
              find the perfect location for your next project.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Home
              </Link>
              <Link 
                to="/locations" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Locations
              </Link>
              <Link 
                to="/about" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                About
              </Link>
              <Link 
                to="/clients" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Clients
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Book-A-Space. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;