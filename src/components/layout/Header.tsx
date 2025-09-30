import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/locations", label: "Locations" },
    { href: "/about", label: "About" },
    { href: "/clients", label: "Clients" },
    { href: "/contact", label: "Contact" },
  ];

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const switchAuthMode = () => {
    setAuthMode(prev => prev === "login" ? "signup" : "login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/book-a-creative-nest/logo.svg" alt="Book-A-Space Logo" className="w-10 h-10 transition-transform group-hover:scale-110" />
            <span className="font-bold text-2xl text-foreground tracking-tight">Book-A-Space</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium transition-all duration-200 relative group ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-200 ${
                  isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
            <div className="flex items-center gap-3 ml-4">
              <Button variant="ghost" size="sm" onClick={() => openAuthModal("login")} className="hover:bg-primary/10">
                <LogIn className="mr-2 h-4 w-4" /> Log In
              </Button>
              <Button size="sm" className="btn-hero shadow-lg hover:shadow-xl transition-shadow" onClick={() => openAuthModal("signup")}>
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </Button>
            </div>
          </nav>

          <AuthModal 
            isOpen={authModalOpen} 
            onClose={() => setAuthModalOpen(false)}
            mode={authMode}
            onSwitchMode={switchAuthMode}
          />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2">
                <Button variant="ghost" className="w-fit" onClick={() => { setIsMenuOpen(false); openAuthModal("login"); }}>
                  <LogIn className="mr-2" /> Log In
                </Button>
                <Button className="btn-hero w-fit" onClick={() => { setIsMenuOpen(false); openAuthModal("signup"); }}>
                  <UserPlus className="mr-2" /> Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;