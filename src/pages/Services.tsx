import { Camera, Video, MapPin, Users, Mic, Lightbulb, Zap, Shield, Award, CheckCircle2, Star, ChevronLeft, ChevronRight, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
// sample thumbnails (we reuse the location imagery to illustrate services like Airbnb cards)
import studio01 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-01.jpg";
import studio02 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-02.jpg";
import studio03 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-03.jpg";
import studio04 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-04.jpg";
import studio05 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-05.jpg";

const Services = () => {
  const services = [
    {
      icon: <Camera className="h-12 w-12" />,
      title: "Production Services",
      description: "Complete production support for your creative projects",
      image: studio01,
      features: [
        "Pre-production planning",
        "Location scouting",
        "Equipment rental",
        "Crew coordination",
        "Post-production support"
      ],
      price: "Contact for pricing"
    },
    {
      icon: <Video className="h-12 w-12" />,
      title: "Filming & Photography",
      description: "Professional filming and photography services",
      image: studio02,
      features: [
        "Professional camera equipment",
        "Lighting setup",
        "Sound recording",
        "Photo editing",
        "Video editing"
      ],
      price: "Contact for pricing"
    },
    {
      icon: <MapPin className="h-12 w-12" />,
      title: "Location Scouting",
      description: "Expert location scouting to find the perfect space",
      image: studio03,
      features: [
        "Location research",
        "Site visits",
        "Permit assistance",
        "Location coordination",
        "Logistics planning"
      ],
      price: "Contact for pricing"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Crewing Services",
      description: "Professional crew and talent for your productions",
      image: studio04,
      features: [
        "Director coordination",
        "Cameraman services",
        "Sound engineers",
        "Lighting technicians",
        "Production assistants"
      ],
      price: "Contact for pricing"
    },
    {
      icon: <Mic className="h-12 w-12" />,
      title: "Audio Services",
      description: "Professional audio recording and sound services",
      image: studio05,
      features: [
        "Sound recording",
        "Audio mixing",
        "Voice over services",
        "Music production",
        "Sound design"
      ],
      price: "Contact for pricing"
    },
    {
      icon: <Lightbulb className="h-12 w-12" />,
      title: "Creative Direction",
      description: "Creative direction and artistic guidance",
      image: studio01,
      features: [
        "Creative consultation",
        "Art direction",
        "Style guidance",
        "Brand alignment",
        "Visual storytelling"
      ],
      price: "Contact for pricing"
    }
  ];

  // Group services into Airbnb-like categories/rows
  const rows: { heading: string; items: typeof services }[] = [
    { heading: "Production", items: services.filter(s => s.title.includes("Production") || s.title.includes("Creative")) },
    { heading: "Filming & Photography", items: services.filter(s => s.title.includes("Filming") || s.title.includes("Audio")) },
    { heading: "Logistics & Crew", items: services.filter(s => s.title.includes("Scouting") || s.title.includes("Crewing")) },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Film Director",
      content: "The production services were exceptional. They handled everything from location scouting to crew coordination seamlessly.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Photographer",
      content: "Professional equipment and expert crew made our shoot a huge success. Highly recommended!",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Event Producer",
      content: "Their location scouting service found us the perfect venue. The team was professional and efficient.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white section-padding-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="heading-xl mb-6">
            Complete Production
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">Services</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
            Everything you need for your creative production - from location scouting to crew coordination
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Production Insurance Banner */}
      <section className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-100">
              Production Insurance Coverage: $2 Million
            </span>
            <Badge variant="secondary" className="bg-blue-600 text-white">
              Protected
            </Badge>
          </div>
        </div>
      </section>

      {/* Airbnb-like filter bar */}
      <section className="sticky top-16 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input placeholder="Where?" className="pl-12 h-12 rounded-xl" />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input type="date" className="pl-12 h-12 rounded-xl" />
              </div>
            </div>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Type of service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="filming">Filming & Photography</SelectItem>
                  <SelectItem value="scouting">Location Scouting</SelectItem>
                  <SelectItem value="crew">Crewing</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="h-12 px-6 rounded-xl bg-black hover:bg-gray-800 text-white">Search</Button>
          </div>
        </div>
      </section>

      {/* Airbnb-like rows */}
      <section className="py-10 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {rows.map((row, rIndex) => (
            <div key={rIndex}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-100">{row.heading}</h3>
                <div className="flex gap-2">
                  <button
                    aria-label="scroll left"
                    onClick={() => {
                      const el = document.getElementById(`row-${rIndex}`);
                      if (el) el.scrollBy({ left: -400, behavior: 'smooth' });
                    }}
                    className="p-2 rounded-full border hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    aria-label="scroll right"
                    onClick={() => {
                      const el = document.getElementById(`row-${rIndex}`);
                      if (el) el.scrollBy({ left: 400, behavior: 'smooth' });
                    }}
                    className="p-2 rounded-full border hover:bg-gray-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div id={`row-${rIndex}`} className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
                {row.items.map((service, index) => (
                  <div key={index} className="min-w-[200px] max-w-[200px] snap-start">
                    <div className="relative h-36 w-full overflow-hidden rounded-xl shadow group">
                      <img src={service.image} alt={service.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900">Service</Badge>
                    </div>
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold text-gray-100 line-clamp-1">{service.title}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-gray-300">5.0</span>
                      </div>
                      <p className="text-xs text-gray-300 line-clamp-2 mt-1">{service.description}</p>
                      <div className="mt-1 text-xs text-gray-100 font-medium">{service.price}</div>
                      <Button asChild variant="outline" className="mt-2 h-8 text-xs w-full"> 
                        <Link to="/contact">Contact</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-gray-300">
              Professional production services with industry expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry Expertise</h3>
              <p className="text-gray-300">Years of experience in production and creative services</p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
              <p className="text-gray-300">$2 million production insurance coverage</p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Response</h3>
              <p className="text-gray-300">Quick turnaround and efficient project management</p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-300">High-quality results for every project</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-300">
              Trusted by creative professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-100">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
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

export default Services;
