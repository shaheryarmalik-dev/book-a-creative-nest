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
import studio06 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-06.jpg";
import studio07 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-07.jpg";
import studio08 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-08.jpg";
import studio09 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-09.jpg";
import studio10 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-10.jpg";
import studio11 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-11.jpg";
import studio12 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-12.jpg";
import studio13 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-13.jpg";
import studio14 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-14.jpg";
import studio15 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-15.jpg";
import laGemImage from "@/assets/space-la-gem.jpg";
import joshuaTreeImage from "@/assets/space-joshua-tree.jpg";

const Home = () => {
  console.log("Home component rendering");
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchGuests, setSearchGuests] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [searchPlanning, setSearchPlanning] = useState("");
  const [showPlanningSuggestions, setShowPlanningSuggestions] = useState(false);
  const [planningSuggestions, setPlanningSuggestions] = useState([]);
  const [hoveredActivity, setHoveredActivity] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Background images that will cycle through
  const backgroundImages = [
    studio01,
    studio02,
    studio03,
    studio04,
    studio05,
    laGemImage,
    joshuaTreeImage
  ];

  // Location suggestions data
  const locationOptions = [
    "Los Angeles, CA",
    "New York, NY", 
    "Chicago, IL",
    "Miami, FL",
    "San Francisco, CA",
    "Austin, TX",
    "Seattle, WA",
    "Boston, MA",
    "Denver, CO",
    "Nashville, TN"
  ];

  // Planning suggestions based on actual website locations
  const planningOptions = [
    "Film Production",
    "Photography Shoot", 
    "Video Production",
    "Commercial Shoot",
    "Music Video",
    "Documentary",
    "Corporate Video",
    "Event Photography",
    "Portrait Session",
    "Product Photography",
    "Fashion Shoot",
    "Wedding Photography",
    "Real Estate Photography",
    "Content Creation",
    "Social Media Content",
    "YouTube Video",
    "Podcast Recording",
    "Interview Recording",
    "Live Streaming",
    "Art Exhibition",
    "Creative Workshop",
    "Team Building Event",
    "Corporate Event",
    "Product Launch",
    "Brand Campaign",
    "Marketing Video",
    "Training Video",
    "Educational Content",
    "Tutorial Video",
    "Behind the Scenes"
  ];

  // Auto-rotate background images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Handle location search with suggestions
  const handleLocationChange = (value) => {
    setSearchLocation(value);
    if (value.length > 0) {
      const filtered = locationOptions.filter(location => 
        location.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
    }
  };

  const selectLocation = (location) => {
    setSearchLocation(location);
    setShowLocationSuggestions(false);
  };

  // Handle planning search with suggestions
  const handlePlanningChange = (value) => {
    setSearchPlanning(value);
    if (value.length > 0) {
      const filtered = planningOptions.filter(planning => 
        planning.toLowerCase().includes(value.toLowerCase())
      );
      setPlanningSuggestions(filtered);
      setShowPlanningSuggestions(true);
    } else {
      setShowPlanningSuggestions(false);
    }
  };

  const selectPlanning = (planning) => {
    setSearchPlanning(planning);
    setShowPlanningSuggestions(false);
  };

  // Why FrameScout slides data
  const whyFrameScoutSlides = [
    {
      title: "New and never-ending possibilities",
      description: "Find everything from professionally equipped studios to unconventional rooms and residences. From vintage Cuban kitchens to modern art studios, we offer the perfect backdrop for your creative vision.",
      image: studio01
    },
    {
      title: "Complete production support", 
      description: "Beyond just spaces, we provide full production services including location scouting, crew coordination, and professional equipment. Your creative vision, our expertise.",
      image: studio02
    },
    {
      title: "$2M Production Insurance",
      description: "Every project is protected with comprehensive production insurance coverage, giving you peace of mind for your most important shoots.",
      image: studio03
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % whyFrameScoutSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + whyFrameScoutSlides.length) % whyFrameScoutSlides.length);
  };

  const handleSearch = () => {
    navigate('/locations');
  };

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
      description: "Complete production support from planning to execution"
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Peerspace Style with Dynamic Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Images */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Background ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Where
            <br />
            <span className="text-blue-400">extraordinary</span>
            <br />
            begins
          </h1>
          <div className="flex justify-center mb-4">
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold shadow-xl">
              <Link to="/locations">Find your space</Link>
            </Button>
          </div>
          
          {/* Search Bar - Peerspace Style */}
          <div className="bg-white rounded-2xl p-2 shadow-2xl max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    placeholder="What are you planning?"
                    value={searchPlanning}
                    onChange={(e) => handlePlanningChange(e.target.value)}
                    onFocus={() => setShowPlanningSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowPlanningSuggestions(false), 200)}
                    className="pl-12 h-14 text-lg border-0 focus:ring-0 rounded-xl text-gray-900 placeholder-gray-500"
                  />
                  {/* Planning Suggestions Dropdown */}
                  {showPlanningSuggestions && planningSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                      {planningSuggestions.map((planning, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-900 border-b border-gray-100 last:border-b-0"
                          onClick={() => selectPlanning(planning)}
                        >
                          <div className="flex items-center">
                            <Search className="h-4 w-4 text-gray-400 mr-3" />
                            <span className="text-sm">{planning}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    placeholder="Where?"
                    value={searchLocation}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    onFocus={() => setShowLocationSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                    className="pl-12 h-14 text-lg border-0 focus:ring-0 rounded-xl text-gray-900 placeholder-gray-500"
                  />
                  {/* Location Suggestions Dropdown */}
                  {showLocationSuggestions && locationSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                      {locationSuggestions.map((location, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-900 border-b border-gray-100 last:border-b-0"
                          onClick={() => selectLocation(location)}
                        >
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                            <span className="text-sm">{location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="pl-12 h-14 text-lg border-0 focus:ring-0 rounded-xl text-gray-900"
                  />
                </div>
              </div>
              <Button 
                onClick={handleSearch}
                className="h-14 px-8 bg-black hover:bg-gray-800 text-white text-lg font-semibold rounded-xl"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
                </div>

          {/* Bottom Banner - Peerspace Style */}
          <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between text-white">
                <div>
                <p className="text-sm text-gray-300">Event — Unique outdoor space</p>
                <p className="text-lg font-semibold">LOS ANGELES, CA</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">Professional Location</p>
                <p className="text-lg font-semibold">FrameScout Locations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements Animation */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-400/30 rounded-full animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-green-400/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 right-10 w-5 h-5 bg-purple-400/30 rounded-full animate-pulse"></div>
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

      {/* Interactive Location Categories - Peerspace Style */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              A space for every moment
            </h2>
            <p className="text-xl text-gray-600">
              Book a unique space for your activity
            </p>
                </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Location Categories Grid */}
                <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { name: "Vintage Cuban Elegance", image: studio01, location: "Los Angeles, CA" },
                  { name: "Artsy Beautiful Home", image: studio02, location: "Los Angeles, CA" },
                  { name: "Creative Space LA", image: studio03, location: "Los Angeles, CA" },
                  { name: "Peerspace Board", image: studio04, location: "Los Angeles, CA" },
                  { name: "Modern Studio", image: studio05, location: "Los Angeles, CA" },
                  { name: "Event Space", image: studio06, location: "Los Angeles, CA" },
                  { name: "Blue Cloud Studios", image: studio07, location: "Los Angeles, CA" },
                  { name: "Imperial Art Studios", image: studio08, location: "Los Angeles, CA" },
                  { name: "Riverfront Stages", image: studio09, location: "Los Angeles, CA" },
                  { name: "Creative Space", image: studio10, location: "Los Angeles, CA" },
                  { name: "Professional Studio", image: studio11, location: "Los Angeles, CA" },
                  { name: "Event Venue", image: studio12, location: "Los Angeles, CA" },
                  { name: "Creative Workspace", image: studio13, location: "Los Angeles, CA" },
                  { name: "Modern Studio Space", image: studio14, location: "Los Angeles, CA" },
                  { name: "Creative Production", image: studio15, location: "Los Angeles, CA" },
                  { name: "LA Gem Studio", image: laGemImage, location: "Los Angeles, CA" }
                ].map((location, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-blue-300"
                    onMouseEnter={() => setHoveredActivity(location)}
                    onMouseLeave={() => setHoveredActivity(null)}
                    onClick={() => navigate('/locations')}
                  >
                    <span className="text-gray-700 group-hover:text-blue-600 font-medium text-sm leading-tight">
                      {location.name}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  asChild
                  className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg font-semibold rounded-lg"
                >
                  <Link to="/locations">Browse all activities</Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Dynamic Image */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={hoveredActivity ? hoveredActivity.image : studio01} 
                    alt={hoveredActivity ? hoveredActivity.name : "Featured space"}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-white font-bold text-xl">
                      {hoveredActivity ? hoveredActivity.name : "Photo shoot"}
                    </p>
                    <p className="text-white/80 text-lg">
                      {hoveredActivity ? hoveredActivity.location : "Los Angeles, CA"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why FrameScout Locations Section - Interactive Slider */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Dynamic Image */}
            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={whyFrameScoutSlides[currentSlide].image} 
                  alt={whyFrameScoutSlides[currentSlide].title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Right Side - Slider Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                  Why FrameScout
                  <br />
                  <span className="text-blue-600">Locations</span>
                </h2>
                
                {/* Single Slide Content */}
                <div className="min-h-[200px] flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-all duration-500">
                    {whyFrameScoutSlides[currentSlide].title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed transition-all duration-500">
                    {whyFrameScoutSlides[currentSlide].description}
                  </p>
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center justify-between pt-6">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {String(currentSlide + 1).padStart(2, '0')} / {String(whyFrameScoutSlides.length).padStart(2, '0')}
                </div>
              </div>
                </div>
                </div>
            </div>
      </section>

      {/* (Removed) Featured banner section per request */}

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Production Services
            </h2>
            <p className="text-xl text-gray-600">
              Complete production support for all your creative needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Creative Professionals
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied clients who trust FrameScout Locations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Creative Spaces</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by creative professionals worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Film Director",
                content: "FrameScout Locations made our production seamless. The location scouting was exceptional and the crew coordination was flawless.",
                rating: 5,
                image: "👩‍💼"
              },
              {
                name: "Mike Chen",
                role: "Photographer",
                content: "Professional equipment and expert crew made our shoot a huge success. Highly recommended for any creative project!",
                rating: 5,
                image: "👨‍🎨"
              },
              {
                name: "Lisa Rodriguez",
                role: "Event Producer",
                content: "Their location scouting service found us the perfect venue. The team was professional, efficient, and exceeded expectations.",
                rating: 5,
                image: "👩‍🎭"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.image}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started with FrameScout Locations in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Search & Discover",
                description: "Browse our extensive collection of professional locations and find the perfect space for your project.",
                icon: "🔍"
              },
              {
                step: "02", 
                title: "Book & Coordinate",
                description: "Contact us to discuss your needs and we'll handle all the coordination and logistics.",
                icon: "📅"
              },
              {
                step: "03",
                title: "Create & Produce",
                description: "Focus on your creative vision while we ensure everything runs smoothly behind the scenes.",
                icon: "🎬"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <div className="text-4xl mb-4">{step.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Peerspace style banner */}
      <section className="py-0">
        <div className="relative h-[55vh] md:h-[65vh] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${studio10})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              Ready to Start Your Production?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6">
              Find the perfect location for your next creative project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold shadow-xl">
                <Link to="/locations">Browse Locations</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-semibold">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;