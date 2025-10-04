import { Users, Target, Heart, Shield, Award, Camera, Video, MapPin, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide complete production services and unique creative spaces for filmmakers, photographers, and content creators."
    },
    {
      icon: Users,
      title: "Who We Serve",
      description: "Filmmakers, photographers, artists, production companies, and creative professionals looking for professional services and unique spaces."
    },
    {
      icon: Heart,
      title: "What We Believe",
      description: "Every creative project deserves professional support, inspiring spaces, and comprehensive production services."
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

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "15+", label: "Creative Spaces" },
    { number: "100+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white section-padding-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-xl mb-8">
            About FrameScout Locations
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto font-light">
            Your complete production partner offering professional services, unique creative spaces, 
            and comprehensive support for all your creative projects.
          </p>
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

      {/* Our Story */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
            <h2 className="text-3xl font-bold text-gray-100 mb-6">Our Story</h2>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                <strong className="text-white">FrameScout Locations</strong> is your complete production partner, 
                offering professional services and unique creative spaces for filmmakers, photographers, 
                and content creators.
              </p>
              <p className="text-lg leading-relaxed">
                We provide everything you need for your creative projects - from location scouting and 
                crew coordination to professional filming services and post-production support. Our 
                team of experienced professionals ensures your project is executed flawlessly.
              </p>
              <p className="text-lg leading-relaxed">
                With <strong className="text-gray-100">$2 million in production insurance coverage</strong>, 
                you can focus on your creative vision while we handle all the logistics and technical details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding-sm bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gray-100 mb-6">
              Our Production Services
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Complete production support for all your creative needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-300">
              Trusted by creative professionals worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-300">
              What drives us to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-100 rounded-full">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Why Choose FrameScout Locations?
            </h2>
            <p className="text-xl text-gray-300">
              Professional production services with industry expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg"
            >
              <Link to="/locations">Browse Locations</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;