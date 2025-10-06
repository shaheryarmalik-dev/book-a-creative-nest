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
import { locations as allLocations, ACTIVITY_CATEGORIES } from "@/data/locations";
import LocationActivities from "@/components/LocationActivities";

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
    rating: 0,
    instantBook: false,
    superhost: false,
    activityCategories: [] as string[]
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

  const locations = allLocations;

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
    
    // Filter by type
    if (filters.type && location.type !== filters.type) {
      return false;
    }
    
    // Filter by rating
    if (filters.rating > 0 && location.rating < filters.rating) {
      return false;
    }
    
    // Filter by amenities
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity =>
        location.amenities.some(locationAmenity => 
          locationAmenity.toLowerCase().includes(amenity.toLowerCase())
        ) ||
        location.features.some(feature => 
          feature.toLowerCase().includes(amenity.toLowerCase())
        )
      );
      if (!hasAllAmenities) {
        return false;
      }
    }
    
    // Filter by activity categories
    if (filters.activityCategories.length > 0) {
      const hasAllCategories = filters.activityCategories.every(category => {
        const categoryKey = category.toLowerCase() as keyof typeof location.activities;
        return location.activities[categoryKey] && location.activities[categoryKey]!.length > 0;
      });
      if (!hasAllCategories) {
        return false;
      }
    }
    
    // Filter by instant book
    if (filters.instantBook && !location.instantBook) {
      return false;
    }
    
    // Filter by superhost
    if (filters.superhost && !location.superhost) {
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
                  <Button variant="outline" className="flex items-center gap-2 bg-slate-800 text-gray-100 border-slate-600 hover:bg-slate-700">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="bg-slate-900 border-slate-700">
                  <DrawerHeader className="border-b border-slate-700">
                    <DrawerTitle className="text-gray-100 text-xl">Filters</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
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
                      <label className="text-sm font-medium mb-2 block text-gray-100">Price Range (per hour)</label>
                      <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-gray-100">
                          <SelectValue placeholder="Any price" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="" className="text-gray-100">Any price</SelectItem>
                          <SelectItem value="0-100" className="text-gray-100">Under $100</SelectItem>
                          <SelectItem value="100-200" className="text-gray-100">$100 - $200</SelectItem>
                          <SelectItem value="200-300" className="text-gray-100">$200 - $300</SelectItem>
                          <SelectItem value="300+" className="text-gray-100">$300+</SelectItem>
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

            <div>
              <label className="text-sm font-medium mb-3 block text-gray-100">Activity Categories</label>
                      <div className="space-y-3">
                        {Object.entries(ACTIVITY_CATEGORIES).map(([key, category]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                              id={`activity-${key}`}
                              checked={filters.activityCategories.includes(key)}
                              onCheckedChange={(checked) => {
                                setFilters(prev => ({
                                  ...prev,
                                  activityCategories: checked
                                    ? [...prev.activityCategories, key]
                                    : prev.activityCategories.filter(a => a !== key)
                                }));
                              }}
                              className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <label
                              htmlFor={`activity-${key}`}
                              className="text-sm text-gray-300 cursor-pointer"
                            >
                              {category.name}
                            </label>
            </div>
                        ))}
            </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block text-gray-100">Amenities</label>
                      <div className="space-y-3">
                        {['WiFi', 'Parking', 'Kitchen', 'Air Conditioning', 'Natural Light', 'Backdrop', 'Lighting Equipment', 'Sound System'].map((amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                              id={amenity}
                              checked={filters.amenities.includes(amenity)}
                              onCheckedChange={(checked) => {
                                setFilters(prev => ({
                                  ...prev,
                                  amenities: checked
                                    ? [...prev.amenities, amenity]
                                    : prev.amenities.filter(a => a !== amenity)
                                }));
                              }}
                              className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <label
                              htmlFor={amenity}
                              className="text-sm text-gray-300 cursor-pointer"
                            >
                              {amenity}
                            </label>
            </div>
                        ))}
            </div>
            </div>

                    <div className="border-t border-slate-700 pt-6">
                      <label className="text-sm font-medium mb-3 block text-gray-100">Booking Options</label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="instantBook"
                            checked={filters.instantBook}
                            onCheckedChange={(checked) => setFilters(prev => ({ ...prev, instantBook: checked as boolean }))}
                            className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <label htmlFor="instantBook" className="text-sm text-gray-300 cursor-pointer flex items-center gap-2">
                            <Zap className="h-4 w-4 text-blue-400" />
                            Instant Book
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="superhost"
                            checked={filters.superhost}
                            onCheckedChange={(checked) => setFilters(prev => ({ ...prev, superhost: checked as boolean }))}
                            className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <label htmlFor="superhost" className="text-sm text-gray-300 cursor-pointer flex items-center gap-2">
                            <Award className="h-4 w-4 text-yellow-400" />
                            Superhost
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DrawerFooter className="border-t border-slate-700 flex flex-row gap-3">
              <Button
                      variant="outline"
                      onClick={() => setFilters({
                        location: '',
                        type: '',
                        amenities: [],
                        priceRange: '',
                        rating: 0,
                        instantBook: false,
                        superhost: false,
                        activityCategories: []
                      })}
                      className="flex-1 bg-slate-800 text-gray-100 border-slate-600 hover:bg-slate-700"
                    >
                      Clear All
              </Button>
                    <DrawerClose asChild>
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Apply Filters</Button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedLocations.map((location) => (
              <Card key={location.id} className="group cursor-pointer card-hover border border-border/30 shadow-xl hover:shadow-[0_25px_70px_rgba(147,51,234,0.3)] transition-all duration-500 overflow-hidden bg-gradient-to-br from-card via-card to-card/60 backdrop-blur-sm">
                <div className="relative overflow-hidden">
                    <img 
                      src={location.image} 
                      alt={location.title}
                    className="w-full h-72 object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700"
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
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {location.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                </div>
                  
                  <div className="mb-4">
                    <LocationActivities activities={location.activities} showTitle={false} compact />
                  </div>

                  <div className="flex items-center justify-end">
                    <Button 
                      asChild 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Link to={`/booking/${location.id}`}>Book Now</Link>
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
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                    {location.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                    
                    <div className="mb-4">
                      <LocationActivities activities={location.activities} showTitle={false} compact />
                    </div>

                    <div className="flex items-center justify-end">
                  <Button 
                    asChild 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                        <Link to={`/booking/${location.id}`}>Book Now</Link>
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
              onClick={() => setFilters({ location: '', type: '', amenities: [], priceRange: '', rating: 0, instantBook: false, superhost: false, activityCategories: [] })}
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