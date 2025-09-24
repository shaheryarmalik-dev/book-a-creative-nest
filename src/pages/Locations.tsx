import { Link } from "react-router-dom";
import { MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import laGemImage from "@/assets/space-la-gem.jpg";
import joshuaTreeImage from "@/assets/space-joshua-tree.jpg";
import artsyModernAptImage from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-01.jpg";

const Locations = () => {
  const locations = [
    {
      id: 1,
      title: "Eclectic Creative Space | Crystals, Buddha, Natural Light – L.A. Gem",
      location: "Central LA, Los Ángeles, CA",
      rate: 57,
      image: laGemImage,
      features: ["Natural Light", "Crystals", "Buddha Statue", "Creative Atmosphere"]
    },
    {
      id: 2,
      title: "Joshua Tree Oasis",
      location: "Joshua Tree, CA",
      rate: 70,
      image: joshuaTreeImage,
      features: ["Desert Views", "Outdoor Space", "Peaceful Setting", "Stunning Landscape"]
    },
    {
      id: 3,
      title: "Artsy & Modern Apt with attached Film Studio",
      location: "Los Angeles, CA",
      rate: 85,
      image: artsyModernAptImage,
      features: ["Attached Film Studio", "Modern Interiors", "Natural Light", "Production Ready"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Creative Spaces
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover unique locations perfect for your creative projects. 
              Each space offers something special for photographers, filmmakers, and artists.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {locations.map((location) => (
              <Card key={location.id} className="card-elevated overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/booking/${location.id}`} className="block">
                  <div className="aspect-video overflow-hidden cursor-pointer">
                    <img 
                      src={location.image} 
                      alt={location.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                
                <CardHeader className="pb-3">
                  <Link to={`/booking/${location.id}`} className="hover:underline">
                    <h3 className="text-xl font-semibold text-foreground line-clamp-2">
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
                    <div className="flex items-center text-primary font-semibold text-lg">
                      <DollarSign className="h-5 w-5 mr-1" />
                      {location.rate}/hr
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {location.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button 
                    asChild 
                    className="btn-hero w-full"
                  >
                    <Link to={`/booking/${location.id}`}>
                      Book Now
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
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