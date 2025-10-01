import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Users, Star, Shield, Award, Camera, Video, Mic, Lightbulb, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Import actual space images for featured locations
import studio01 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-01.jpg";
import studio02 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-02.jpg";
import studio03 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-03.jpg";
import studio04 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-04.jpg";
import studio05 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-05.jpg";
import laGemImage from "@/assets/space-la-gem.jpg";
import joshuaTreeImage from "@/assets/space-joshua-tree.jpg";

const spaceImages = [studio01, studio02, studio03, studio04, studio05];

const Home = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchGuests, setSearchGuests] = useState("");

  const featuredLocations = [
    {
      id: 1,
      title: "Vintage Cuban Elegance - Luxurious Latin Kitchen",
      location: "Los Angeles, CA",
      image: studio01,
      rating: 4.9,
      reviews: 127,
      price: "Contact for pricing",
      type: "Kitchen & Dining",
      features: ["Vintage Design", "Natural Light", "Kitchen Access"]
    },
    {
      id: 2,
      title: "Artsy Beautiful Home",
      location: "Los Angeles, CA", 
      image: laGemImage,
      rating: 4.8,
      reviews: 89,
      price: "Contact for pricing",
      type: "Residential",
      features: ["Modern Design", "Multiple Rooms", "Garden Access"]
    },
    {
      id: 3,
      title: "Creative Space LA - Film Photography Studio",
      location: "Los Angeles, CA",
      image: studio02,
      rating: 4.9,
      reviews: 156,
      price: "Contact for pricing",
      type: "Studio",
      features: ["Professional Equipment", "Cyc Wall", "Lighting Setup"]
    },
    {
      id: 4,
      title: "Industrial Loft Space",
      location: "Los Angeles, CA",
      image: joshuaTreeImage,
      rating: 4.7,
      reviews: 73,
      price: "Contact for pricing",
      type: "Industrial",
      features: ["High Ceilings", "Exposed Brick", "Loading Access"]
    },
    {
      id: 5,
      title: "Modern Office Space",
      location: "Los Angeles, CA",
      image: studio03,
      rating: 4.8,
      reviews: 94,
      price: "Contact for pricing",
      type: "Office",
      features: ["Conference Rooms", "High-Speed WiFi", "Parking"]
    },
    {
      id: 6,
      title: "Rooftop Event Space",
      location: "Los Angeles, CA",
      image: studio04,
      rating: 4.9,
      reviews: 112,
      price: "Contact for pricing",
      type: "Event Space",
      features: ["City Views", "Outdoor Space", "Catering Kitchen"]
    }
  ];

  const services = [
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Production Services",
      description: "Full-service production support for your creative projects"
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Filming & Photography",
      description: "Professional filming and photography services"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Location Scouting",
      description: "Expert location scouting to find the perfect space"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Crewing Services",
      description: "Professional crew and talent for your productions"
    }
  ];

  const handleSearch = () => {
    navigate("/locations", { 
      state: { 
        location: searchLocation, 
        date: searchDate, 
        guests: searchGuests 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Peerspace Style */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find the Perfect
              <span className="block text-blue-400">Creative Space</span>
          </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-200">
              Professional locations for filming, photography, events, and creative productions
            </p>
            
            {/* Search Bar - Peerspace Style */}
            <div className="bg-white rounded-2xl p-2 shadow-2xl max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Where do you need a space?"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-12 h-14 text-lg border-0 focus:ring-0"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="pl-12 h-14 text-lg border-0 focus:ring-0"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Select value={searchGuests} onValueChange={setSearchGuests}>
                      <SelectTrigger className="pl-12 h-14 text-lg border-0 focus:ring-0">
                        <SelectValue placeholder="How many people?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 people</SelectItem>
                        <SelectItem value="6-10">6-10 people</SelectItem>
                        <SelectItem value="11-20">11-20 people</SelectItem>
                        <SelectItem value="21-50">21-50 people</SelectItem>
                        <SelectItem value="50+">50+ people</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                </div>
                <Button 
                  onClick={handleSearch}
                  className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-lg font-semibold rounded-xl"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Insurance Banner */}
      <section className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-blue-900">
              Production Insurance Coverage: $2 Million
            </span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Protected
            </Badge>
          </div>
        </div>
      </section>

      {/* Featured Locations - Airbnb Style */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Creative Spaces
            </h2>
            <p className="text-xl text-gray-600">
              Professional locations for your next production
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredLocations.map((location) => (
              <Card key={location.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={location.image} 
                    alt={location.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                      {location.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                      {location.title}
                  </h3>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{location.rating}</span>
                    <span className="text-gray-500">({location.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{location.location}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {location.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      {location.price}
                    </span>
                    <Button 
                      asChild 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              <Link to="/locations">View All Locations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Production Services - MrLocationScout Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Production Services
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for your creative production
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Production?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Contact us to discuss your project and get a custom quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg"
            >
              <Link to="/locations">Browse Locations</Link>
          </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;