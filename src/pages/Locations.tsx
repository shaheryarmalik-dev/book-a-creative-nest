import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, DollarSign, LayoutGrid, List as ListIcon, SlidersHorizontal, Heart, Star, Users, Award, Shield, TrendingUp, Search, Filter, Calendar, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";

// Import all available images for unique locations
import laGemImage from "@/assets/space-la-gem.jpg";
import joshuaTreeImage from "@/assets/space-joshua-tree.jpg";
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

const Locations = () => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    amenities: [] as string[],
    priceRange: '',
    rating: 0
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      
      toast({
        title: newFavorites.includes(id) ? "Added to favorites" : "Removed from favorites",
        description: newFavorites.includes(id) ? "Space saved to your wishlist" : "Space removed from wishlist",
      });
      
      return newFavorites;
    });
  };

  // Actual client locations from provided links
  const locations = [
    {
      id: 1,
      title: "Vintage Cuban Elegance - Luxurious Latin Kitchen",
      location: "Los Angeles, CA",
      image: studio01,
      rating: 4.9,
      reviews: 127,
      type: "Kitchen & Dining",
      features: ["Vintage Cuban Design", "Latin Kitchen", "Elegant Decor", "Authentic Style"],
      amenities: ["Full Kitchen", "Dining Area", "Vintage Decor", "Latin Style"],
      instantBook: true,
      superhost: true,
      bookings: 89
    },
    {
      id: 2,
      title: "Artsy Beautiful Home",
      location: "Los Angeles, CA",
      image: studio02,
      rating: 4.8,
      reviews: 89,
      type: "Residential",
      features: ["Artistic Design", "Beautiful Interiors", "Creative Space", "Modern Art"],
      amenities: ["Multiple Rooms", "Art Gallery", "Creative Atmosphere", "Natural Light"],
      instantBook: false,
      superhost: true,
      bookings: 67
    },
    {
      id: 3,
      title: "Creative Space LA - Film Photography Studio",
      location: "Los Angeles, CA",
      image: studio03,
      rating: 4.9,
      reviews: 156,
      type: "Studio",
      features: ["Professional Equipment", "Cyc Wall", "Lighting Setup", "Soundproof"],
      amenities: ["Professional Lighting", "Cyc Wall", "Equipment", "Soundproof"],
      instantBook: true,
      superhost: true,
      bookings: 134
    },
    {
      id: 4,
      title: "Peerspace Board - Creative Workspace",
      location: "Los Angeles, CA",
      image: studio04,
      rating: 4.7,
      reviews: 73,
      type: "Creative Workspace",
      features: ["Flexible Layout", "Creative Environment", "Professional Setup", "Modern Design"],
      amenities: ["Flexible Space", "Creative Tools", "Professional Setup", "Modern Amenities"],
      instantBook: false,
      superhost: true,
      bookings: 45
    },
    {
      id: 5,
      title: "Peerspace Listing - Modern Studio",
      location: "Los Angeles, CA",
      image: studio05,
      rating: 4.8,
      reviews: 94,
      type: "Studio",
      features: ["Modern Design", "Professional Setup", "High-End Equipment", "Flexible Space"],
      amenities: ["Modern Equipment", "Professional Setup", "Flexible Layout", "High-End Tools"],
      instantBook: true,
      superhost: true,
      bookings: 78
    },
    {
      id: 6,
      title: "Peerspace Listing - Event Space",
      location: "Los Angeles, CA",
      image: studio06,
      rating: 4.9,
      reviews: 112,
      type: "Event Space",
      features: ["Event Ready", "Professional Setup", "Flexible Layout", "Modern Amenities"],
      amenities: ["Event Setup", "Professional Equipment", "Flexible Space", "Modern Design"],
      instantBook: false,
      superhost: true,
      bookings: 96
    },
    {
      id: 7,
      title: "Blue Cloud Studios",
      location: "Los Angeles, CA",
      image: studio07,
      rating: 4.6,
      reviews: 58,
      type: "Production Studio",
      features: ["Professional Studio", "Cloud Services", "Modern Technology", "Flexible Setup"],
      amenities: ["Professional Equipment", "Cloud Technology", "Modern Setup", "Flexible Layout"],
      instantBook: false,
      superhost: false,
      bookings: 34
    },
    {
      id: 8,
      title: "Imperial Art Studios",
      location: "Los Angeles, CA",
      image: studio08,
      rating: 4.9,
      reviews: 89,
      type: "Art Studio",
      features: ["Art Focused", "Creative Environment", "Professional Setup", "Inspiring Space"],
      amenities: ["Art Equipment", "Creative Tools", "Professional Setup", "Inspiring Atmosphere"],
      instantBook: true,
      superhost: true,
      bookings: 67
    },
    {
      id: 9,
      title: "Riverfront Stages - Bar Stage",
      location: "Los Angeles, CA",
      image: studio09,
      rating: 4.8,
      reviews: 76,
      type: "Stage & Performance",
      features: ["Stage Setup", "Performance Ready", "Professional Lighting", "Sound System"],
      amenities: ["Stage Equipment", "Lighting System", "Sound Setup", "Performance Ready"],
      instantBook: false,
      superhost: true,
      bookings: 52
    },
    {
      id: 10,
      title: "Peerspace Listing - Creative Space",
      location: "Los Angeles, CA",
      image: studio10,
      rating: 4.7,
      reviews: 63,
      type: "Creative Space",
      features: ["Creative Environment", "Flexible Layout", "Modern Design", "Professional Setup"],
      amenities: ["Creative Tools", "Flexible Space", "Modern Equipment", "Professional Setup"],
      instantBook: true,
      superhost: false,
      bookings: 41
    },
    {
      id: 11,
      title: "Peerspace Listing - Professional Studio",
      location: "Los Angeles, CA",
      image: studio11,
      rating: 4.8,
      reviews: 98,
      type: "Professional Studio",
      features: ["Professional Grade", "High-End Equipment", "Modern Setup", "Flexible Layout"],
      amenities: ["Professional Equipment", "High-End Tools", "Modern Technology", "Flexible Space"],
      instantBook: true,
      superhost: true,
      bookings: 82
    },
    {
      id: 12,
      title: "Peerspace Listing - Event Venue",
      location: "Los Angeles, CA",
      image: studio12,
      rating: 4.9,
      reviews: 105,
      type: "Event Venue",
      features: ["Event Ready", "Professional Setup", "Flexible Layout", "Modern Amenities"],
      amenities: ["Event Equipment", "Professional Setup", "Flexible Space", "Modern Design"],
      instantBook: false,
      superhost: true,
      bookings: 89
    },
    {
      id: 13,
      title: "Peerspace Listing - Creative Workspace",
      location: "Los Angeles, CA",
      image: studio13,
      rating: 4.7,
      reviews: 87,
      type: "Creative Workspace",
      features: ["Creative Environment", "Flexible Layout", "Modern Design", "Professional Setup"],
      amenities: ["Creative Tools", "Flexible Space", "Modern Equipment", "Professional Setup"],
      instantBook: true,
      superhost: true,
      bookings: 73
    },
    {
      id: 14,
      title: "Peerspace Listing - Modern Studio",
      location: "Los Angeles, CA",
      image: studio14,
      rating: 4.8,
      reviews: 95,
      type: "Modern Studio",
      features: ["Modern Design", "Professional Equipment", "Flexible Layout", "High-End Setup"],
      amenities: ["Modern Equipment", "Professional Tools", "Flexible Space", "High-End Technology"],
      instantBook: false,
      superhost: true,
      bookings: 68
    },
    {
      id: 15,
      title: "Peerspace Listing - Creative Space",
      location: "Los Angeles, CA",
      image: studio15,
      rating: 4.9,
      reviews: 118,
      type: "Creative Space",
      features: ["Creative Environment", "Professional Setup", "Modern Design", "Flexible Layout"],
      amenities: ["Creative Equipment", "Professional Setup", "Modern Tools", "Flexible Space"],
      instantBook: true,
      superhost: true,
      bookings: 94
    }
  ];

  const filteredLocations = locations.filter(location => {
    // Search across title, location city, type, and features
    if (filters.location) {
      const searchTerm = filters.location.toLowerCase();
      const matchesTitle = location.title.toLowerCase().includes(searchTerm);
      const matchesLocation = location.location.toLowerCase().includes(searchTerm);
      const matchesType = location.type.toLowerCase().includes(searchTerm);
      const matchesFeatures = location.features.some(feature => 
        feature.toLowerCase().includes(searchTerm)
      );
      
      if (!matchesTitle && !matchesLocation && !matchesType && !matchesFeatures) {
        return false;
      }
    }
    if (filters.type && location.type !== filters.type) {
      return false;
    }
    if (filters.rating > 0 && location.rating < filters.rating) {
      return false;
    }
    return true;
  });

  const sortedLocations = [...filteredLocations].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'bookings':
        return b.bookings - a.bookings;
      default:
    return 0;
    }
  });

  const locationTypes = [...new Set(locations.map(loc => loc.type))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-100">Creative Spaces</h1>
              <span className="text-gray-400">({filteredLocations.length} spaces)</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search locations..."
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="pl-10 w-64"
                />
              </div>

              {/* Filters */}
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="bg-slate-900 border-slate-700">
                  <DrawerHeader>
                    <DrawerTitle className="text-gray-100">Filters</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-6 space-y-6">
            <div>
                      <label className="text-sm font-medium mb-2 block text-gray-100">Space Type</label>
                      <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-gray-100">
                          <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="" className="text-gray-100">All types</SelectItem>
                          {locationTypes.map(type => (
                            <SelectItem key={type} value={type} className="text-gray-100">{type}</SelectItem>
                          ))}
                </SelectContent>
              </Select>
            </div>
                    
            <div>
                      <label className="text-sm font-medium mb-2 block text-gray-100">Minimum Rating</label>
                      <Select value={filters.rating.toString()} onValueChange={(value) => setFilters(prev => ({ ...prev, rating: parseInt(value) }))}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-gray-100">
                          <SelectValue placeholder="Any rating" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="0" className="text-gray-100">Any rating</SelectItem>
                          <SelectItem value="4" className="text-gray-100">4+ stars</SelectItem>
                          <SelectItem value="4.5" className="text-gray-100">4.5+ stars</SelectItem>
                          <SelectItem value="4.8" className="text-gray-100">4.8+ stars</SelectItem>
                        </SelectContent>
                      </Select>
            </div>
            </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">Apply Filters</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              {/* View Toggle */}
              <div className="flex border border-gray-200 rounded-lg">
              <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
          </div>
        </div>
      </div>

          {/* Sort */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="bookings">Most Popular</SelectItem>
              </SelectContent>
            </Select>
            </div>
            </div>
          </div>
        </div>

      {/* Production Insurance Banner */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-100">
              Production Insurance Coverage: $2 Million
            </span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Protected
            </Badge>
                  </div>
                  </div>
                </div>

      {/* Locations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedLocations.map((location) => (
              <Card key={location.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={location.image} 
                      alt={location.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(location.id);
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`h-5 w-5 ${
                        favorites.includes(location.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-300'
                      }`} 
                    />
                  </button>
                  
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                      {location.type}
                    </Badge>
                  </div>

                  {location.instantBook && (
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-green-600 text-white">
                        <Zap className="h-3 w-3 mr-1" />
                        Instant Book
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-100 line-clamp-2">
                      {location.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{location.rating}</span>
                    <span className="text-gray-500">({location.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-gray-300 mb-3">{location.location}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {location.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-100">
                      Contact for pricing
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
        ) : (
          <div className="space-y-4">
            {sortedLocations.map((location) => (
              <Card key={location.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="flex">
                  <div className="relative w-80 h-48 overflow-hidden rounded-l-lg">
                    <img 
                      src={location.image} 
                      alt={location.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(location.id);
                      }}
                      className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <Heart 
                        className={`h-5 w-5 ${
                          favorites.includes(location.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-300'
                        }`} 
                      />
                    </button>
                  </div>
                  
                  <CardContent className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-xl text-gray-100">
                      {location.title}
                    </h3>
                      <Badge className="bg-gray-100 text-gray-800">
                        {location.type}
                      </Badge>
                  </div>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{location.rating}</span>
                      <span className="text-gray-500">({location.reviews} reviews)</span>
                  </div>
                  
                    <p className="text-gray-300 mb-3">{location.location}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                    {location.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold text-gray-100">
                        Contact for pricing
                      </span>
                  <Button 
                    asChild 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                        <Link to="/contact">Contact Us</Link>
                  </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No locations found matching your filters.</p>
            <Button 
              variant="outline" 
              onClick={() => setFilters({ location: '', type: '', amenities: [], priceRange: '', rating: 0 })}
              className="mt-4"
            >
              Clear Filters
          </Button>
        </div>
        )}
      </div>
    </div>
  );
};

export default Locations;