import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Clock, MapPin, Calendar, Shield, Award, TrendingUp, Star, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Import all space images for background
const heroImagesGlob = import.meta.glob(
  "/src/assets/locations/artsy-modern-apt-film-studio/*.jpg",
  { eager: true, query: "?url", import: "default" }
);

const heroImages = Object.keys(heroImagesGlob)
  .sort()
  .map((key) => (heroImagesGlob as Record<string, string>)[key]);

const Home = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryOffset, setGalleryOffset] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll position relative to gallery section only
  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Only calculate offset when gallery is in viewport
        if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
          // Calculate scroll progress within the section
          // Clamp the value to prevent movement outside the section
          const scrollProgress = Math.max(0, Math.min(windowHeight - sectionTop, sectionHeight));
          setGalleryOffset(scrollProgress);
        } else if (sectionTop >= windowHeight) {
          // Section hasn't entered viewport yet
          setGalleryOffset(0);
        } else {
          // Section has passed completely
          setGalleryOffset(0);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activities = [
    { value: "photo", label: "Photo Shoot" },
    { value: "film", label: "Filming" },
    { value: "event", label: "Event" },
    { value: "meeting", label: "Meeting" }
  ];
  const benefits = [
    {
      icon: Clock,
      title: "Affordable Hourly Pricing",
      description: "Pay only for the time you need, starting from $57/hour"
    },
    {
      icon: MapPin,
      title: "Unique Creative Spaces",
      description: "From LA studios to Joshua Tree oases, find inspiring locations"
    },
    {
      icon: Calendar,
      title: "Easy Online Booking",
      description: "Simple booking process with instant confirmation"
    }
  ];

  const stats = [
    { value: "1,450+", label: "Happy Clients", icon: Users },
    { value: "3,200+", label: "Successful Bookings", icon: TrendingUp },
    { value: "4.9/5", label: "Average Rating", icon: Star },
    { value: "100%", label: "Verified Spaces", icon: Shield }
  ];

  const trustBadges = [
    { icon: Shield, label: "Secure Payments" },
    { icon: Award, label: "Top Rated" },
    { icon: CheckCircle2, label: "Instant Confirmation" },
    { icon: Users, label: "24/7 Support" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative min-h-[95vh] flex items-center justify-center overflow-hidden"
      >
        {/* Real Space Images Background with Fade Transition */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url(${image})`,
              backgroundPosition: 'center center'
            }}
          />
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Book Inspiring Creative Spaces{" "}
            <span className="text-primary">by the Hour</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover unique locations perfect for photoshoots, filming, meetings, and creative projects. 
            Professional spaces available at affordable hourly rates.
          </p>
          <div className="mx-auto max-w-5xl">
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 border rounded-xl shadow-lg p-4 sm:p-6">
              <form
                className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end text-left"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const activity = (form.elements.namedItem("activity") as HTMLInputElement)?.value || "";
                  const where = (form.elements.namedItem("where") as HTMLInputElement)?.value || "";
                  const when = (form.elements.namedItem("when") as HTMLInputElement)?.value || "";
                  const params = new URLSearchParams();
                  if (activity) params.set("activity", activity);
                  if (where) params.set("where", where);
                  if (when) params.set("when", when);
                  navigate(`/locations?${params.toString()}`);
                }}
              >
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">What are you planning?</label>
                  <Select name="activity">
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity" />
                    </SelectTrigger>
                    <SelectContent>
                      {activities.map((a) => (
                        <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Where?</label>
                  <Input name="where" placeholder="City or neighborhood" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">When?</label>
                  <Input name="when" type="date" min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="flex">
                  <Button type="submit" size="lg" className="w-full md:w-auto">Search</Button>
                </div>
              </form>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button asChild size="lg" className="btn-hero text-lg px-8 py-4">
                <Link to="/locations">Browse Locations</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/locations">Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-y border-blue-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-primary mr-2" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <badge.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Gallery Section - Giggster Style */}
      <section ref={galleryRef} className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
              Featured Spaces
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Discover Amazing Creative Spaces
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our handpicked collection of unique and inspiring locations
            </p>
          </div>

          {/* Parallax Columns - Different scroll speeds */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Column 1 - Slow */}
            <div 
              className="space-y-6"
              style={{
                transform: `translateY(${Math.min(galleryOffset * 0.02, 100)}px)`,
                transition: 'transform 0.05s ease-out'
              }}
            >
              {heroImages.slice(0, 4).map((image, index) => (
                <div key={index} className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={image}
                    alt={`Creative Space ${index + 1}`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Column 2 - Fast */}
            <div 
              className="space-y-6 hidden sm:block"
              style={{
                transform: `translateY(${Math.max(galleryOffset * -0.03, -100)}px)`,
                transition: 'transform 0.05s ease-out'
              }}
            >
              {heroImages.slice(4, 8).map((image, index) => (
                <div key={index} className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={image}
                    alt={`Creative Space ${index + 5}`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Column 3 - Medium */}
            <div 
              className="space-y-6 hidden lg:block"
              style={{
                transform: `translateY(${Math.min(galleryOffset * 0.025, 100)}px)`,
                transition: 'transform 0.05s ease-out'
              }}
            >
              {heroImages.slice(8, 12).map((image, index) => (
                <div key={index} className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={image}
                    alt={`Creative Space ${index + 9}`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Column 4 - Slow reverse */}
            <div 
              className="space-y-6 hidden xl:block"
              style={{
                transform: `translateY(${Math.max(galleryOffset * -0.015, -100)}px)`,
                transition: 'transform 0.05s ease-out'
              }}
            >
              {heroImages.slice(12, 15).map((image, index) => (
                <div key={index} className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={image}
                    alt={`Creative Space ${index + 13}`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <Button asChild size="lg" className="btn-hero text-lg px-10 py-4">
              <Link to="/locations">View All Spaces</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white border-0">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Book-A-Space?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make it easy to find and book the perfect creative space for your project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-elevated text-center p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-primary/50">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Book Your Perfect Space?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Browse our curated collection of creative spaces and book your next project location today.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-2xl text-lg px-10 py-4 font-bold rounded-xl hover:scale-105 transition-all">
            <Link to="/locations">Explore Locations</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;