import { Camera, Video, MapPin, Users, Mic, Lightbulb, Zap, Shield, Award, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: <Camera className="h-12 w-12" />,
      title: "Production Services",
      description: "Complete production support for your creative projects",
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Complete Production
            <span className="block text-blue-400">Services</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
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

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Production Services
            </h2>
            <p className="text-xl text-gray-600">
              Professional services for all your creative production needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-200 transition-colors">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    {service.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900 mb-4">
                      {service.price}
                    </p>
                    <Button 
                      asChild 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-gray-600">
              Professional production services with industry expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry Expertise</h3>
              <p className="text-gray-600">Years of experience in production and creative services</p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
              <p className="text-gray-600">$2 million production insurance coverage</p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Response</h3>
              <p className="text-gray-600">Quick turnaround and efficient project management</p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">High-quality results for every project</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
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
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
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
