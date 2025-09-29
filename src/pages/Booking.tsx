import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, MapPin, DollarSign, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import laGemImage from "@/assets/space-la-gem.jpg";
import joshuaTreeImage from "@/assets/space-joshua-tree.jpg";
// Eagerly import all images for the Artsy & Modern Apt gallery
const artsyImagesGlob = import.meta.glob(
  "/src/assets/locations/artsy-modern-apt-film-studio/*.jpg",
  { eager: true, query: "?url", import: "default" }
);
const artsyImages = Object.keys(artsyImagesGlob)
  .sort()
  .map((key) => (artsyImagesGlob as Record<string, string>)[key]);

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().optional(),
  date: z.string().min(1, "Please select a date"),
  startTime: z.string().min(1, "Please select a start time"),
  hours: z.string().min(1, "Please select number of hours"),
  notes: z.string().max(1000, "Notes must be less than 1000 characters").optional()
});

type BookingFormData = z.infer<typeof bookingSchema>;

const Booking = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Mock location data
  const locations = [
    {
      id: 1,
      title: "Eclectic Creative Space | Crystals, Buddha, Natural Light – L.A. Gem",
      location: "Central LA, Los Ángeles, CA",
      rate: 57,
      image: laGemImage
    },
    {
      id: 2,
      title: "Joshua Tree Oasis",
      location: "Joshua Tree, CA",
      rate: 70,
      image: joshuaTreeImage
    },
    {
      id: 3,
      title: "Artsy & Modern Apt with attached Film Studio",
      location: "Los Angeles, CA",
      rate: 85,
      image: artsyImages[0],
      images: artsyImages
    }
  ];

  const location = locations.find(loc => loc.id === Number(id));
  const galleryImages: string[] = Array.isArray((location as any)?.images) ? (location as any).images : [];
  const mainImage = galleryImages.length > 0 ? galleryImages[selectedImageIndex] : location?.image;

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      startTime: "",
      hours: "",
      notes: ""
    }
  });

  const selectedHours = form.watch("hours");
  const totalCost = location && selectedHours ? location.rate * Number(selectedHours) : 0;

  const onSubmit = async (data: BookingFormData) => {
    try {
      if (!location) return;
      const payload = {
        locationId: String(id),
        locationTitle: location.title,
        hourlyRateUsd: location.rate,
        hours: Number(data.hours),
        date: data.date,
        startTime: data.startTime,
        customer: {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
      };

      const resp = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json?.error || "Failed to create checkout session");

      if (json.url) {
        window.location.href = json.url as string;
        return;
      }

      // Fallback toast if no redirect url
      toast({ title: "Unable to redirect to payment", description: "Please try again." });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!location) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Location Not Found</h1>
          <Button asChild>
            <Link to="/locations">Back to Locations</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="card-elevated max-w-md mx-auto text-center p-8">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-accent mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Thank You!
            </h1>
            <p className="text-muted-foreground mb-6">
              Your booking request has been received. We'll contact you shortly to confirm your reservation.
            </p>
            <div className="space-y-2">
              <Button asChild className="btn-hero w-full">
                <Link to="/locations">Book Another Space</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/locations">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Locations
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Book Your Space</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Location Details */}
          <div>
            <Card className="card-elevated">
              <div className="aspect-video overflow-hidden rounded-t-xl">
                <img 
                  src={mainImage as string} 
                  alt={location.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => {
                    if (galleryImages.length > 1) {
                      setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
                    }
                  }}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{location.title}</CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {location.location}
                </div>
                <div className="flex items-center text-primary font-semibold text-lg">
                  <DollarSign className="h-5 w-5 mr-1" />
                  {location.rate}/hr
                </div>
              </CardHeader>
            </Card>

              {/* Simple Gallery for locations that provide an images array */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                  {galleryImages.map((imgUrl: string, idx: number) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`aspect-video overflow-hidden rounded-md border ${idx === selectedImageIndex ? "border-primary" : "border-transparent"}`}
                    >
                      <img src={imgUrl} alt={`${location.title} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

            {/* Booking Summary */}
            {selectedHours && (
              <Card className="card-elevated mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{selectedHours} hour{Number(selectedHours) > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate per hour:</span>
                      <span className="font-medium">${location.rate}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">${totalCost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Form */}
          <div>
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} min={new Date().toISOString().split('T')[0]} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time *</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="hours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Hours *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[...Array(12)].map((_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                  {i + 1} hour{i > 0 ? 's' : ''}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes / Special Requests</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any special requirements or questions..."
                              rows={3}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="btn-hero w-full text-lg"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? "Processing..." : "Confirm Booking"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;