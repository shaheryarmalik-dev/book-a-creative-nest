import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import logoImage from "/logo.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 border-t border-gray-700 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src={logoImage} alt="FrameScout Locations Logo" className="h-12 w-auto" />
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white tracking-tight leading-none">FRAMESCOUT</span>
                <span className="font-medium text-base text-gray-300 tracking-wide leading-none">LOCATIONS</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Professional location scouting and creative space rentals. From studios to unique venues, 
              find the perfect location for your next production.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Home
              </Link>
              <Link 
                to="/locations" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Locations
              </Link>
              <Link 
                to="/services" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Services
              </Link>
              <Link 
                to="/credits" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Production Credits
              </Link>
              <Link 
                to="/about" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/framescout_locations?igsh=NTc4MTIwNjQ2YQ==" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">
              © {currentYear} FrameScout Locations. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              EIN: 39-4495856 | Email: framescoutlocations@gmail.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;