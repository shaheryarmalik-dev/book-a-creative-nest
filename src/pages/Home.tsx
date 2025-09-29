import { Link, useNavigate } from "react-router-dom";
import { Clock, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroBackground from "@/assets/hero-background.jpg";

const Home = () => {
  const navigate = useNavigate();
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

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 gradient-hero"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Book Inspiring Creative Spaces{" "}
            <span className="text-primary">by the Hour</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
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

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Book-A-Space?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make it easy to find and book the perfect creative space for your project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-elevated text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="h-8 w-8 text-primary" />
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
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Book Your Perfect Space?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Browse our curated collection of creative spaces and book your next project location today.
          </p>
          <Button asChild size="lg" className="btn-accent text-lg px-8 py-4">
            <Link to="/locations">Explore Locations</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;