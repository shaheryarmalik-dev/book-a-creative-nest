import laGemImage from "@/assets/space-la-gem.jpg";
import joshuaTreeImage from "@/assets/space-joshua-tree.jpg";
import studio01 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-01.jpg";
import studio02 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-02.jpg";
import studio03 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-03.jpg";
import studio04 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-04.jpg";
import studio05 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-05.jpg";
import studio06 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-06.jpg";
import studio07 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-07.jpg";
import studio08 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-08.jpg";
import studio09 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-09.jpg";
import studio10 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-10.jpg";
import studio11 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-11.jpg";
import studio12 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-12.jpg";
import studio13 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-13.jpg";
import studio14 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-14.jpg";
import studio15 from "@/assets/locations/artsy-modern-apt-film-studio/creative-space-la-film-photography-studio-15.jpg";

// Activity Categories and Sub-activities
export const ACTIVITY_CATEGORIES = {
  production: {
    name: "Production",
    activities: ["Film", "Performance", "Photography", "Pop Up", "Sound Recording"]
  },
  celebrate: {
    name: "Celebrate",
    activities: ["Birthday Party", "Dining", "Engagement", "Event", "Party"]
  },
  meet: {
    name: "Meet",
    activities: ["Corporate Event", "Function", "Meeting", "Retreat", "Workshop"]
  }
} as const;

export type ActivityCategory = keyof typeof ACTIVITY_CATEGORIES;
export type ActivityName = typeof ACTIVITY_CATEGORIES[ActivityCategory]["activities"][number];

export interface LocationActivities {
  production?: ActivityName[];
  celebrate?: ActivityName[];
  meet?: ActivityName[];
}

export interface Location {
  id: number;
  title: string;
  location: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  type: string;
  features: string[];
  amenities: string[];
  instantBook: boolean;
  superhost: boolean;
  bookings: number;
  rate?: number;
  activities: LocationActivities;
}

export const locations: Location[] = [
  {
    id: 1,
    title: "Vintage Cuban Elegance - Luxurious Latin Kitchen",
    location: "Los Angeles, CA",
    image: studio01,
    rating: 4.9,
    reviews: 127,
    type: "Kitchen & Dining",
    features: ["Vintage Cuban Design", "Latin Kitchen", "Elegant Decor", "Authentic Style"],
    amenities: ["Full Kitchen", "Dining Area", "Vintage Decor", "Latin Style"],
    instantBook: true,
    superhost: true,
    bookings: 89,
    rate: 75,
    activities: {
      production: ["Film", "Photography", "Pop Up"],
      celebrate: ["Birthday Party", "Dining", "Engagement", "Event", "Party"],
      meet: ["Corporate Event", "Function", "Meeting"]
    }
  },
  {
    id: 2,
    title: "Artsy Beautiful Home",
    location: "Los Angeles, CA",
    image: studio02,
    rating: 4.8,
    reviews: 89,
    type: "Residential",
    features: ["Artistic Design", "Beautiful Interiors", "Creative Space", "Modern Art"],
    amenities: ["Multiple Rooms", "Art Gallery", "Creative Atmosphere", "Natural Light"],
    instantBook: false,
    superhost: true,
    bookings: 67,
    rate: 95,
    activities: {
      production: ["Film", "Photography", "Performance"],
      celebrate: ["Birthday Party", "Engagement", "Event", "Party"],
      meet: ["Corporate Event", "Function", "Meeting", "Retreat", "Workshop"]
    }
  },
  {
    id: 3,
    title: "Creative Space LA - Film Photography Studio",
    location: "Los Angeles, CA",
    image: studio03,
    rating: 4.9,
    reviews: 156,
    type: "Studio",
    features: ["Professional Equipment", "Cyc Wall", "Lighting Setup", "Soundproof"],
    amenities: ["Professional Lighting", "Cyc Wall", "Equipment", "Soundproof"],
    instantBook: true,
    superhost: true,
    bookings: 134,
    rate: 120,
    activities: {
      production: ["Film", "Performance", "Photography", "Sound Recording"],
      celebrate: ["Event"],
      meet: ["Corporate Event", "Workshop"]
    }
  },
  {
    id: 4,
    title: "Peerspace Board - Creative Workspace",
    location: "Los Angeles, CA",
    image: studio04,
    rating: 4.7,
    reviews: 73,
    type: "Creative Workspace",
    features: ["Flexible Layout", "Creative Environment", "Professional Setup", "Modern Design"],
    amenities: ["Flexible Space", "Creative Tools", "Professional Setup", "Modern Amenities"],
    instantBook: false,
    superhost: true,
    bookings: 45,
    rate: 65,
    activities: {
      production: ["Photography", "Pop Up"],
      celebrate: ["Birthday Party", "Event", "Party"],
      meet: ["Corporate Event", "Function", "Meeting", "Retreat", "Workshop"]
    }
  },
  {
    id: 5,
    title: "Peerspace Listing - Modern Studio",
    location: "Los Angeles, CA",
    image: studio05,
    rating: 4.8,
    reviews: 94,
    type: "Studio",
    features: ["Modern Design", "Professional Setup", "High-End Equipment", "Flexible Space"],
    amenities: ["Modern Equipment", "Professional Setup", "Flexible Layout", "High-End Tools"],
    instantBook: true,
    superhost: true,
    bookings: 78,
    rate: 110,
    activities: {
      production: ["Film", "Photography", "Performance"],
      celebrate: ["Event"],
      meet: ["Corporate Event", "Meeting", "Workshop"]
    }
  },
  {
    id: 6,
    title: "Peerspace Listing - Event Space",
    location: "Los Angeles, CA",
    image: studio06,
    rating: 4.9,
    reviews: 112,
    type: "Event Space",
    features: ["Event Ready", "Professional Setup", "Flexible Layout", "Modern Amenities"],
    amenities: ["Event Setup", "Professional Equipment", "Flexible Space", "Modern Design"],
    instantBook: false,
    superhost: true,
    bookings: 96,
    rate: 85,
    activities: {
      production: ["Performance", "Pop Up"],
      celebrate: ["Birthday Party", "Dining", "Engagement", "Event", "Party"],
      meet: ["Corporate Event", "Function", "Meeting", "Retreat", "Workshop"]
    }
  },
  {
    id: 7,
    title: "Blue Cloud Studios",
    location: "Los Angeles, CA",
    image: studio07,
    rating: 4.6,
    reviews: 58,
    type: "Production Studio",
    features: ["Professional Studio", "Cloud Services", "Modern Technology", "Flexible Setup"],
    amenities: ["Professional Equipment", "Cloud Technology", "Modern Setup", "Flexible Layout"],
    instantBook: false,
    superhost: false,
    bookings: 34,
    rate: 150,
    activities: {
      production: ["Film", "Photography", "Sound Recording"],
      celebrate: ["Event"],
      meet: ["Corporate Event", "Workshop"]
    }
  },
  {
    id: 8,
    title: "Imperial Art Studios",
    location: "Los Angeles, CA",
    image: studio08,
    rating: 4.9,
    reviews: 89,
    type: "Art Studio",
    features: ["Art Focused", "Creative Environment", "Professional Setup", "Inspiring Space"],
    amenities: ["Art Equipment", "Creative Tools", "Professional Setup", "Inspiring Atmosphere"],
    instantBook: true,
    superhost: true,
    bookings: 67,
    rate: 90,
    activities: {
      production: ["Photography", "Pop Up", "Performance"],
      celebrate: ["Birthday Party", "Event", "Party"],
      meet: ["Corporate Event", "Function", "Meeting", "Workshop"]
    }
  },
  {
    id: 9,
    title: "Riverfront Stages - Bar Stage",
    location: "Los Angeles, CA",
    image: studio09,
    rating: 4.8,
    reviews: 76,
    type: "Stage & Performance",
    features: ["Stage Setup", "Performance Ready", "Professional Lighting", "Sound System"],
    amenities: ["Stage Equipment", "Lighting System", "Sound Setup", "Performance Ready"],
    instantBook: false,
    superhost: true,
    bookings: 52,
    rate: 130,
    activities: {
      production: ["Performance", "Sound Recording", "Film"],
      celebrate: ["Birthday Party", "Event", "Party"],
      meet: ["Corporate Event", "Function"]
    }
  },
  {
    id: 10,
    title: "Peerspace Listing - Creative Space",
    location: "Los Angeles, CA",
    image: studio10,
    rating: 4.7,
    reviews: 63,
    type: "Creative Space",
    features: ["Creative Environment", "Flexible Layout", "Modern Design", "Professional Setup"],
    amenities: ["Creative Tools", "Flexible Space", "Modern Equipment", "Professional Setup"],
    instantBook: true,
    superhost: false,
    bookings: 41,
    rate: 70,
    activities: {
      production: ["Photography", "Pop Up"],
      celebrate: ["Birthday Party", "Event", "Party"],
      meet: ["Corporate Event", "Meeting", "Workshop"]
    }
  },
  {
    id: 11,
    title: "Peerspace Listing - Professional Studio",
    location: "Los Angeles, CA",
    image: studio11,
    rating: 4.8,
    reviews: 98,
    type: "Professional Studio",
    features: ["Professional Grade", "High-End Equipment", "Modern Setup", "Flexible Layout"],
    amenities: ["Professional Equipment", "High-End Tools", "Modern Technology", "Flexible Space"],
    instantBook: true,
    superhost: true,
    bookings: 82,
    rate: 125,
    activities: {
      production: ["Film", "Photography", "Sound Recording"],
      celebrate: ["Event"],
      meet: ["Corporate Event", "Meeting", "Workshop"]
    }
  },
  {
    id: 12,
    title: "Peerspace Listing - Event Venue",
    location: "Los Angeles, CA",
    image: studio12,
    rating: 4.9,
    reviews: 105,
    type: "Event Venue",
    features: ["Event Ready", "Professional Setup", "Flexible Layout", "Modern Amenities"],
    amenities: ["Event Equipment", "Professional Setup", "Flexible Space", "Modern Design"],
    instantBook: false,
    superhost: true,
    bookings: 89,
    rate: 100,
    activities: {
      production: ["Performance", "Pop Up"],
      celebrate: ["Birthday Party", "Dining", "Engagement", "Event", "Party"],
      meet: ["Corporate Event", "Function", "Meeting", "Retreat"]
    }
  },
  {
    id: 13,
    title: "Peerspace Listing - Creative Workspace",
    location: "Los Angeles, CA",
    image: studio13,
    rating: 4.7,
    reviews: 87,
    type: "Creative Workspace",
    features: ["Creative Environment", "Flexible Layout", "Modern Design", "Professional Setup"],
    amenities: ["Creative Tools", "Flexible Space", "Modern Equipment", "Professional Setup"],
    instantBook: true,
    superhost: true,
    bookings: 73,
    rate: 80,
    activities: {
      production: ["Photography", "Pop Up"],
      celebrate: ["Birthday Party", "Event", "Party"],
      meet: ["Corporate Event", "Function", "Meeting", "Retreat", "Workshop"]
    }
  },
  {
    id: 14,
    title: "Peerspace Listing - Modern Studio",
    location: "Los Angeles, CA",
    image: studio14,
    rating: 4.8,
    reviews: 95,
    type: "Modern Studio",
    features: ["Modern Design", "Professional Equipment", "Flexible Layout", "High-End Setup"],
    amenities: ["Modern Equipment", "Professional Tools", "Flexible Space", "High-End Technology"],
    instantBook: false,
    superhost: true,
    bookings: 68,
    rate: 115,
    activities: {
      production: ["Film", "Photography", "Performance"],
      celebrate: ["Event"],
      meet: ["Corporate Event", "Meeting", "Workshop"]
    }
  },
  {
    id: 15,
    title: "Peerspace Listing - Creative Space",
    location: "Los Angeles, CA",
    image: studio15,
    rating: 4.9,
    reviews: 118,
    type: "Creative Space",
    features: ["Creative Environment", "Professional Setup", "Modern Design", "Flexible Layout"],
    amenities: ["Creative Equipment", "Professional Setup", "Modern Tools", "Flexible Space"],
    instantBook: true,
    superhost: true,
    bookings: 94,
    rate: 95,
    activities: {
      production: ["Film", "Photography", "Pop Up"],
      celebrate: ["Birthday Party", "Event", "Party"],
      meet: ["Corporate Event", "Function", "Meeting", "Workshop"]
    }
  }
];

