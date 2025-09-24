import { Star, ExternalLink, Calendar, Award } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import clientOrelImage from "@/assets/client-orel.jpg";

const Clients = () => {
  const listings = [
    "Artsy & Modern Apt with attached Film Studio",
    "West LA Film & Photography Studio", 
    "Joshua Tree Paradise",
    "Vintage Cuban Elegance: Luxurious Latin Kitchen Bar"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Client Testimonials
          </h1>
          <p className="text-xl text-muted-foreground">
            See what our clients say about their Book-A-Space experience
          </p>
        </div>
      </section>

      {/* Featured Client */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="card-elevated p-8">
            <CardHeader className="text-center pb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Featured Client
              </h2>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img 
                      src={clientOrelImage} 
                      alt="Orel - Client Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Client Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Orel</h3>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Member Since 2022</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>Verified Client</span>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                        ))}
                      </div>
                      <Badge variant="secondary" className="bg-accent/10 text-accent font-semibold">
                        Excellent
                      </Badge>
                    </div>
                  </div>

                  {/* Reviews Summary */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Client Feedback</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div className="bg-secondary rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary">6</div>
                        <div className="text-sm text-muted-foreground">Positive Reviews</div>
                      </div>
                      <div className="bg-secondary rounded-lg p-4">
                        <div className="text-2xl font-bold text-accent">100%</div>
                        <div className="text-sm text-muted-foreground">Professional</div>
                      </div>
                      <div className="bg-secondary rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary">5.0</div>
                        <div className="text-sm text-muted-foreground">Average Rating</div>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <blockquote className="bg-secondary/50 rounded-lg p-6 mb-6">
                    <p className="text-muted-foreground italic mb-4">
                      "Book-A-Space has been incredible to work with. The spaces are high-quality, 
                      the booking process is seamless, and the team is always professional and friendly. 
                      As a filmmaker, having access to these unique locations has elevated my projects significantly."
                    </p>
                    <footer className="text-sm font-medium text-foreground">
                      — Orel, Independent Filmmaker
                    </footer>
                  </blockquote>

                  {/* Highlighted Listings */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Frequently Booked Spaces</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {listings.map((listing, index) => (
                        <Badge key={index} variant="outline" className="justify-start p-2 text-xs">
                          {listing}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button className="btn-hero w-full md:w-auto">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Giggster Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Client Stats */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted by Creators Worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              Join our community of satisfied clients who've found their perfect spaces
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">1,200+</div>
              <div className="text-muted-foreground">Bookings Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4.9</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;