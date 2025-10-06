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
import { locations } from "@/data/locations";
import LocationActivities from "@/components/LocationActivities";

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

  const onSubmit = async (data: BookingFormData) => {
    // Simply show success message - no payment processing
    setIsSubmitted(true);
    
    toast({
      title: "Booking Request Submitted",
      description: "We'll contact you shortly to confirm your reservation.",
    });
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
              </CardHeader>
            </Card>

            {/* Activities Section */}
            <div className="mt-6">
              <LocationActivities activities={location.activities} showTitle={true} compact={false} />
            </div>

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