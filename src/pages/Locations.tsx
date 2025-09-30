import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, DollarSign, LayoutGrid, List as ListIcon, SlidersHorizontal, Heart, Star, Users, Award, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import laGemImage from "@/assets/space-la-gem.jpg";
import joshuaTreeImage from "@/assets/space-joshua-tree.jpg";
import artsyModernAptImage from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-01.jpg";

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

  const locations = [
    {
      id: 1,
      title: "Eclectic Creative Space | Crystals, Buddha, Natural Light – L.A. Gem",
      location: "Central LA, Los Ángeles, CA",
      rate: 57,
      image: laGemImage,
      features: ["Natural Light", "Crystals", "Buddha Statue", "Creative Atmosphere"],
      rating: 4.9,
      reviews: 127,
      instantBook: true,
      superhost: true,
      bookings: 450
    },
    {
      id: 2,
      title: "Joshua Tree Oasis",
      location: "Joshua Tree, CA",
      rate: 70,
      image: joshuaTreeImage,
      features: ["Desert Views", "Outdoor Space", "Peaceful Setting", "Stunning Landscape"],
      rating: 4.8,
      reviews: 89,
      instantBook: true,
      superhost: false,
      bookings: 320
    },
    {
      id: 3,
      title: "Artsy & Modern Apt with attached Film Studio",
      location: "Los Angeles, CA",
      rate: 85,
      image: artsyModernAptImage,
      features: ["Attached Film Studio", "Modern Interiors", "Natural Light", "Production Ready"],
      rating: 5.0,
      reviews: 203,
      instantBook: true,
      superhost: true,
      bookings: 680
    }
  ];

  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const qActivity = params.get("activity")?.toLowerCase() || "";
  const qWhere = params.get("where")?.toLowerCase() || "";
  const qWhen = params.get("when") || "";
  const qMin = Number(params.get("min")) || 0;
  const qMax = Number(params.get("max")) || 0;
  const qSort = params.get("sort") || "";
  const qFeatures = (params.get("features") || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const qTypes = (params.get("types") || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const qAmenities = (params.get("amenities") || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const qView = (params.get("view") || "grid").toLowerCase();

  // Persist filters to localStorage whenever they change
  useEffect(() => {
    const current = Object.fromEntries(params.entries());
    try {
      localStorage.setItem("locationsFilters", JSON.stringify(current));
    } catch {}
  }, [search]);

  // Restore filters on first load if URL has no filters
  useEffect(() => {
    const hasAny = ["activity","where","when","min","max","features","sort"].some((k) => params.has(k));
    if (hasAny) return;
    try {
      const raw = localStorage.getItem("locationsFilters");
      if (!raw) return;
      const saved = JSON.parse(raw) as Record<string, string>;
      const next = new URLSearchParams();
      ["activity","where","when","min","max","features","sort"].forEach((k) => {
        if (saved[k]) next.set(k, saved[k]);
      });
      if (Array.from(next.keys()).length > 0) {
        navigate(`/locations?${next.toString()}`);
      }
    } catch {}
  // run only on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = locations.filter((loc) => {
    const matchesWhere = qWhere
      ? loc.location.toLowerCase().includes(qWhere) || loc.title.toLowerCase().includes(qWhere)
      : true;
    const matchesActivity = qActivity
      ? (
          (qActivity === "photo" && loc.features.join(" ").toLowerCase().includes("studio")) ||
          (qActivity === "film" && loc.features.join(" ").toLowerCase().includes("production")) ||
          (qActivity === "event" && loc.features.join(" ").toLowerCase().includes("outdoor")) ||
          (qActivity === "meeting" && loc.features.join(" ").toLowerCase().includes("conference"))
        )
      : true;
    const matchesMin = qMin ? loc.rate >= qMin : true;
    const matchesMax = qMax ? loc.rate <= qMax : true;
    const titleLc = loc.title.toLowerCase();
    const locFeaturesLc = loc.features.map((f) => f.toLowerCase()).join(" ");
    const matchesFeatures = qFeatures.length ? qFeatures.every((f) => locFeaturesLc.includes(f)) : true;
    const matchesTypes = qTypes.length ? qTypes.some((t) => titleLc.includes(t) || locFeaturesLc.includes(t)) : true;
    const matchesAmenities = qAmenities.length ? qAmenities.every((a) => locFeaturesLc.includes(a)) : true;
    return matchesWhere && matchesActivity && matchesMin && matchesMax && matchesFeatures && matchesTypes && matchesAmenities;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (qSort === "price_asc") return a.rate - b.rate;
    if (qSort === "price_desc") return b.rate - a.rate;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Search */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form
            className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const activity = (form.elements.namedItem("activity") as HTMLInputElement)?.value || "";
              const where = (form.elements.namedItem("where") as HTMLInputElement)?.value || "";
              const when = (form.elements.namedItem("when") as HTMLInputElement)?.value || "";
              const min = (form.elements.namedItem("min") as HTMLInputElement)?.value || "";
              const max = (form.elements.namedItem("max") as HTMLInputElement)?.value || "";
              const next = new URLSearchParams();
              if (activity) next.set("activity", activity);
              if (where) next.set("where", where);
              if (when) next.set("when", when);
              if (min) next.set("min", String(min));
              if (max) next.set("max", String(max));
              if (qFeatures.length) next.set("features", qFeatures.join(","));
              if (qSort) next.set("sort", qSort);
              navigate(`/locations?${next.toString()}`);
            }}
            defaultValue={undefined}
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">What are you planning?</label>
              <Select name="activity" defaultValue={qActivity || undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photo">Photo Shoot</SelectItem>
                  <SelectItem value="film">Filming</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Where?</label>
              <Input name="where" placeholder="City or neighborhood" defaultValue={qWhere} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">When?</label>
              <Input name="when" type="date" defaultValue={qWhen} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Min Price ($/hr)</label>
              <Input name="min" type="number" min={0} placeholder="0" defaultValue={qMin || undefined} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Max Price ($/hr)</label>
              <Input name="max" type="number" min={0} placeholder="" defaultValue={qMax || undefined} />
            </div>
            <div className="flex">
              <Button type="submit" className="w-full md:w-auto">Search</Button>
            </div>
          </form>

          {/* Quick chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { v: "photo", l: "Photo Shoot" },
              { v: "film", l: "Filming" },
              { v: "event", l: "Event" },
              { v: "meeting", l: "Meeting" },
            ].map((c) => (
              <Button
                key={c.v}
                variant={qActivity === c.v ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const next = new URLSearchParams(params);
                  if (qActivity === c.v) {
                    next.delete("activity");
                  } else {
                    next.set("activity", c.v);
                  }
                  navigate(`/locations?${next.toString()}`);
                }}
              >
                {c.l}
              </Button>
            ))}
            {/* Clear filters */}
            {(qActivity || qWhere || qWhen || qMin || qMax || qFeatures.length || qSort) ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate(`/locations`);
                }}
              >
                Clear filters
              </Button>
            ) : null}
          </div>

          {/* Feature chips with counts */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { v: "natural light", l: "Natural Light" },
              { v: "outdoor", l: "Outdoor" },
              { v: "studio", l: "Studio" },
              { v: "production", l: "Production Ready" },
            ].map((f) => {
              const active = qFeatures.includes(f.v);
              const count = filtered.filter((loc) => loc.features.map((x)=>x.toLowerCase()).join(" ").includes(f.v)).length;
              return (
                <Button
                  key={f.v}
                  variant={active ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    const next = new URLSearchParams(params);
                    const set = new Set(qFeatures);
                    if (active) set.delete(f.v); else set.add(f.v);
                    const arr = Array.from(set);
                    if (arr.length) next.set("features", arr.join(",")); else next.delete("features");
                    navigate(`/locations?${next.toString()}`);
                  }}
                >
                  {f.l}
                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-muted px-2 py-0.5 text-[10px]">
                    {count}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Header Section */}
      <section className="bg-secondary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between flex-wrap gap-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Creative Spaces
            </h1>
            <div className="flex items-center gap-3">
              <div className="text-muted-foreground">
                {filtered.length} result{filtered.length === 1 ? "" : "s"}
              </div>
              {(qActivity || qWhere || qWhen || qMin || qMax || qFeatures.length || qSort) ? (
                <div className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                  {(() => {
                    const count = [
                      qActivity ? 1 : 0,
                      qWhere ? 1 : 0,
                      qWhen ? 1 : 0,
                      qMin ? 1 : 0,
                      qMax ? 1 : 0,
                      qFeatures.length ? 1 : 0,
                      qSort ? 1 : 0,
                    ].reduce((a,b)=>a+b,0);
                    return `${count} filter${count===1?"":"s"}`;
                  })()}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Sort by</span>
            <Select
              defaultValue={qSort || undefined}
              onValueChange={(val) => {
                const next = new URLSearchParams(params);
                if (val) next.set("sort", val); else next.delete("sort");
                navigate(`/locations?${next.toString()}`);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Recommended" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant={qView === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const next = new URLSearchParams(params);
                  next.set("view", "grid");
                  navigate(`/locations?${next.toString()}`);
                }}
              >
                <LayoutGrid className="mr-2" /> Grid
              </Button>
              <Button
                variant={qView === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const next = new URLSearchParams(params);
                  next.set("view", "list");
                  navigate(`/locations?${next.toString()}`);
                }}
              >
                <ListIcon className="mr-2" /> List
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Layout with optional sidebar and view toggle */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 md:hidden flex justify-between">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm"><SlidersHorizontal className="mr-2" /> Filters</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filters</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Types</div>
                    {[
                      { v: "studio", l: "Photo/Film Studio" },
                      { v: "house", l: "House" },
                      { v: "loft", l: "Loft" },
                      { v: "outdoor", l: "Outdoor" },
                    ].map((t) => {
                      const checked = qTypes.includes(t.v);
                      return (
                        <label key={t.v} className="flex items-center gap-2 py-1">
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(val) => {
                              const next = new URLSearchParams(params);
                              const set = new Set(qTypes);
                              if (val) set.add(t.v); else set.delete(t.v);
                              const arr = Array.from(set);
                              if (arr.length) next.set("types", arr.join(",")); else next.delete("types");
                              navigate(`/locations?${next.toString()}`);
                            }}
                          />
                          <span className="text-sm">{t.l}</span>
                        </label>
                      );
                    })}
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Amenities</div>
                    {[
                      { v: "natural light", l: "Natural Light" },
                      { v: "parking", l: "Parking" },
                      { v: "kitchen", l: "Kitchen" },
                      { v: "backdrop", l: "Backdrops" },
                    ].map((a) => {
                      const checked = qAmenities.includes(a.v);
                      return (
                        <label key={a.v} className="flex items-center gap-2 py-1">
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(val) => {
                              const next = new URLSearchParams(params);
                              const set = new Set(qAmenities);
                              if (val) set.add(a.v); else set.delete(a.v);
                              const arr = Array.from(set);
                              if (arr.length) next.set("amenities", arr.join(",")); else next.delete("amenities");
                              navigate(`/locations?${next.toString()}`);
                            }}
                          />
                          <span className="text-sm">{a.l}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="secondary">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          {/* close mobile filters wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] gap-8">
            <aside className="hidden md:block">
              <div className="sticky top-32 space-y-6">
                <div>
                  <div className="text-sm font-medium mb-2">Types</div>
                  {[
                    { v: "studio", l: "Photo/Film Studio" },
                    { v: "house", l: "House" },
                    { v: "loft", l: "Loft" },
                    { v: "outdoor", l: "Outdoor" },
                  ].map((t) => {
                    const checked = qTypes.includes(t.v);
                    return (
                      <label key={t.v} className="flex items-center gap-2 py-1">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(val) => {
                            const next = new URLSearchParams(params);
                            const set = new Set(qTypes);
                            if (val) set.add(t.v); else set.delete(t.v);
                            const arr = Array.from(set);
                            if (arr.length) next.set("types", arr.join(",")); else next.delete("types");
                            navigate(`/locations?${next.toString()}`);
                          }}
                        />
                        <span className="text-sm">{t.l}</span>
                      </label>
                    );
                  })}
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Amenities</div>
                  {[
                    { v: "natural light", l: "Natural Light" },
                    { v: "parking", l: "Parking" },
                    { v: "kitchen", l: "Kitchen" },
                    { v: "backdrop", l: "Backdrops" },
                  ].map((a) => {
                    const checked = qAmenities.includes(a.v);
                    return (
                      <label key={a.v} className="flex items-center gap-2 py-1">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(val) => {
                            const next = new URLSearchParams(params);
                            const set = new Set(qAmenities);
                            if (val) set.add(a.v); else set.delete(a.v);
                            const arr = Array.from(set);
                            if (arr.length) next.set("amenities", arr.join(",")); else next.delete("amenities");
                            navigate(`/locations?${next.toString()}`);
                          }}
                        />
                        <span className="text-sm">{a.l}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </aside>
            <div>
              <div className={qView === "list" ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 gap-8"}>
                {sorted.map((location) => {
                  const isFavorite = favorites.includes(location.id);
                  return (
                    <Card key={location.id} className="card-elevated overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
                      <div className="relative">
                        <Link to={`/booking/${location.id}`} className="block">
                          <div className="aspect-video overflow-hidden cursor-pointer relative">
                            <img 
                              src={location.image} 
                              alt={location.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </Link>
                        
                        {/* Favorite Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full h-10 w-10 shadow-lg z-10"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(location.id);
                          }}
                        >
                          <Heart 
                            className={`h-5 w-5 transition-all ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                          />
                        </Button>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {location.superhost && (
                            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg">
                              <Award className="h-3 w-3 mr-1" />
                              Superhost
                            </Badge>
                          )}
                          {location.instantBook && (
                            <Badge className="bg-gradient-to-r from-green-600 to-teal-600 text-white border-0 shadow-lg">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Instant Book
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <CardHeader className="pb-3">
                        {/* Rating and Reviews */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center bg-primary/10 px-2 py-1 rounded-md">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="font-bold text-sm">{location.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({location.reviews} reviews)
                          </span>
                          <div className="flex items-center text-xs text-muted-foreground ml-auto">
                            <Users className="h-3 w-3 mr-1" />
                            {location.bookings}+ bookings
                          </div>
                        </div>
                        
                        <Link to={`/booking/${location.id}`} className="hover:underline">
                          <h3 className="text-xl font-semibold text-foreground line-clamp-2 leading-tight">
                            {location.title}
                          </h3>
                        </Link>
                        <div className="flex items-center text-muted-foreground text-sm mt-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {location.location}
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-primary font-bold text-xl">
                            <DollarSign className="h-6 w-6 mr-0.5" />
                            {location.rate}
                            <span className="text-sm font-normal text-muted-foreground ml-1">/hr</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {location.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {location.features.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{location.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>

                      <CardFooter className="flex gap-2">
                        <Button 
                          asChild 
                          className="btn-hero flex-1 group-hover:shadow-lg transition-shadow"
                        >
                          <Link to={`/booking/${location.id}`}>
                            Book Now
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Don't See What You're Looking For?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Contact us to discuss your specific needs. We're always adding new locations and can help you find the perfect space.
          </p>
          <Button size="lg" className="btn-accent">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Locations;