import { Users, Target, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To make flexible, affordable, and stress-free space booking accessible to all creators and professionals."
    },
    {
      icon: Users,
      title: "Who We Serve",
      description: "Filmmakers, photographers, artists, and professionals looking for unique spaces for their projects."
    },
    {
      icon: Heart,
      title: "What We Believe",
      description: "Every creative project deserves an inspiring space that matches its vision and budget."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            About Book-A-Space
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We make it easy for creators, artists, and professionals to book unique spaces by the hour. 
            From cozy apartments to breathtaking desert views, our spaces are designed to inspire your projects.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-card rounded-xl p-8 card-elevated">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Our mission is simple: <strong className="text-foreground">flexible, affordable, and stress-free space booking</strong>. 
                  Whether you're shooting a film, hosting a photoshoot, or working on your next big idea, 
                  Book-A-Space connects you with the perfect location.
                </p>
                
                <p className="text-lg leading-relaxed">
                  We understand that creative projects come in all shapes and sizes, and so do budgets. 
                  That's why we've curated a collection of unique spaces available by the hour, 
                  making professional-quality locations accessible to everyone from independent artists to established production companies.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Every space in our network is carefully selected for its character, functionality, and inspiring atmosphere. 
                  We believe that the right environment can transform a good project into something extraordinary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Drives Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values guide everything we do, from selecting spaces to serving our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-elevated text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Find Your Perfect Space?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of creators who trust Book-A-Space for their projects. 
            Let's bring your vision to life in the perfect setting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/locations" 
              className="btn-hero inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-lg no-underline"
            >
              Browse Locations
            </a>
            <a 
              href="mailto:admin@book-a-space.com" 
              className="btn-accent inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-lg no-underline"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;