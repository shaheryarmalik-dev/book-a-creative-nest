import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";
import { auth } from "@/integrations/firebase/client";
import { signOut } from "firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<User | null>(null);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) setAuthModalOpen(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-white/98 backdrop-blur-lg border-b border-gray-200/60 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/book-a-creative-nest/logo.jpeg" alt="Book-A-Space Logo" className="h-14 w-auto transition-all duration-300 group-hover:scale-105" />
            <span className="font-bold text-2xl text-gray-900 tracking-tight">Book-A-Space</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-semibold text-[15px] transition-all duration-200 relative group ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-200 ${
                  isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
            <div className="flex items-center gap-3 ml-6">
              {user ? (
                <>
                  <span className="text-sm text-gray-600 hidden lg:inline">{user.email}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      await signOut(auth);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    size="default" 
                    onClick={() => openAuthModal("login")} 
                    className="font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 px-5"
                  >
                    <LogIn className="mr-2 h-4 w-4" /> Log In
                  </Button>
                  <Button 
                    size="default" 
                    className="btn-hero shadow-xl hover:shadow-2xl transition-all font-semibold px-6" 
                    onClick={() => openAuthModal("signup")}
                  >
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </Button>
                </>
              )}
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
                {user ? (
                  <>
                    <span className="text-sm text-gray-600">{user.email}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        await signOut(auth);
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="w-fit" onClick={() => { setIsMenuOpen(false); openAuthModal("login"); }}>
                      <LogIn className="mr-2" /> Log In
                    </Button>
                    <Button className="btn-hero w-fit" onClick={() => { setIsMenuOpen(false); openAuthModal("signup"); }}>
                      <UserPlus className="mr-2" /> Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;