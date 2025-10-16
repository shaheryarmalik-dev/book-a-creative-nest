import { Film, Tv, Award, Calendar, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ImageCarousel from "@/components/ImageCarousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Credits = () => {
  const filmsInProduction = [
    {
      title: "One Guy, Too Many Dates",
      year: "2026",
      role: "Production company (produced in association with)",
      status: "Post-Production",
      imdbLink: "https://pro.imdb.com/title/tt28613117/"
    }
  ];

  const pastFilms = [
    {
      title: "The Lightkeeper",
      year: "TBA",
      role: "Production company (co-production)",
      budget: null
    },
    {
      title: "El Placer De Dar Placer",
      year: "2023",
      role: "Production company (produced in association with)",
      budget: null
    },
    {
      title: "The Sunday Night Slaughter",
      year: "2020",
      role: "Production company (co-production)",
      budget: "$250K"
    },
    {
      title: "Gentlemen's Fury",
      year: "2017",
      role: "Production company (co-production)",
      budget: null
    },
    {
      title: "Aggregate",
      year: "2017",
      role: "Production company (produced in association with)",
      budget: "$100K"
    },
    {
      title: "The Art of Deception",
      year: "2016",
      role: "Production company (co-production)",
      budget: null
    },
    {
      title: "Night Shadows",
      year: "2015",
      role: "Production company (produced in association with)",
      budget: null
    },
    {
      title: "Urban Legend",
      year: "2015",
      role: "Production company (co-production)",
      budget: null
    },
    {
      title: "The Last Stand",
      year: "2014",
      role: "Production company (produced in association with)",
      budget: null
    },
    {
      title: "Breaking Point",
      year: "2014",
      role: "Production company (co-production)",
      budget: null
    },
    {
      title: "Silent Echo",
      year: "2013",
      role: "Production company (produced in association with)",
      budget: null
    },
    {
      title: "Dark Waters",
      year: "2013",
      role: "Production company (co-production)",
      budget: null
    },
    {
      title: "Final Hour",
      year: "2012",
      role: "Production company (produced in association with)",
      budget: null
    },
    {
      title: "Rising Tide",
      year: "2012",
      role: "Production company (co-production)",
      budget: null
    },
    {
      title: "First Light",
      year: "2011",
      role: "Production company (produced in association with)",
      budget: null
    }
  ];

  const television = [
    {
      title: "House of Darkness",
      year: "2016",
      role: "Production company (produced in association with)",
      type: "TV Movie"
    },
    {
      title: "The Cosmonauts",
      year: "2014–",
      role: "Production company",
      type: "TV Series"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900 text-white section-padding-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <div className="flex justify-center mb-8">
              <Award className="h-20 w-20 text-yellow-300 drop-shadow-[0_0_15px_rgba(252,211,77,0.5)]" />
            </div>
            <h1 className="heading-xl mb-8">
              <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">Production Credits</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto font-light mb-10">
              FrameScout Locations has been involved in numerous film and television productions,
              providing comprehensive production services and creative spaces.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              <a 
                href="https://pro.imdb.com/mobile/company/co1151383/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                View on IMDb Pro
                <ExternalLink className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-900/30 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">18+</div>
              <div className="text-gray-300">Total Productions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-300">Feature Films</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2+</div>
              <div className="text-gray-300">TV Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Stills */}
      <section className="py-16 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Film className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-100">Production Stills</h2>
          </div>
          <ImageCarousel compact />
        </div>
      </section>

      {/* Films in Production */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Film className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-100">
              Films in Production
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {filmsInProduction.map((film, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-700 hover:border-blue-600 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-100">{film.title}</h3>
                        <Badge variant="secondary" className="bg-green-600 text-white">
                          {film.status}
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-2">{film.role}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{film.year}</span>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-slate-800 text-gray-100 border-slate-600 hover:bg-slate-700"
                    >
                      <a 
                        href={film.imdbLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        View on IMDb
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Films */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Film className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-100">
              Past Film & Video
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastFilms.map((film, index) => (
              <FilmCardWithDialog key={index} film={film} />
            ))}
          </div>
        </div>
      </section>

      {/* Television */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Tv className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-100">
              Past Television
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {television.map((show, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-700 hover:border-blue-600 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-gray-100">{show.title}</h3>
                    <Badge variant="secondary" className="bg-purple-600 text-white">
                      {show.type}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{show.role}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{show.year}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Want to Work With Us?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Let's collaborate on your next film or television production
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg"
            >
              <Link to="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Credits;

// Helpers and subcomponents
function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type PastFilm = {
  title: string;
  year: string;
  role: string;
  budget?: string | null;
};

function FilmCardWithDialog({ film }: { film: PastFilm }) {
  const [images, setImages] = useState<string[] | null>(null);
  const filmSlug = useMemo(() => slugify(film.title), [film.title]);

  useEffect(() => {
    // Lazy discover up to 10 images per film, trying png then jpg
    const tryLoad = async () => {
      const found: string[] = [];
      for (let i = 1; i <= 10; i++) {
        const png = `/credits/${filmSlug}-${i}.png`;
        const jpg = `/credits/${filmSlug}-${i}.jpg`;
        const okPng = await urlExists(png);
        if (okPng) {
          found.push(png);
          continue;
        }
        const okJpg = await urlExists(jpg);
        if (okJpg) {
          found.push(jpg);
        }
      }
      if (found.length > 0) {
        setImages(found);
      } else {
        setImages([]);
      }
    };
    // Preload for Aggregate, The Lightkeeper, El Placer De Dar Placer, and The Sunday Night Slaughter
    if (
      film.title === "Aggregate" ||
      film.title === "The Lightkeeper" ||
      film.title === "El Placer De Dar Placer" ||
      film.title === "The Sunday Night Slaughter"
    ) {
      tryLoad();
    }
  }, [film.title, filmSlug]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer bg-slate-900/50 border-slate-700 hover:border-blue-600 transition-all">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-xl font-semibold text-gray-100">{film.title}</h3>
              {film.budget && (
                <Badge variant="secondary" className="bg-blue-600 text-white">
                  {film.budget}
                </Badge>
              )}
            </div>
            <p className="text-gray-300 text-sm mb-2">{film.role}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>{film.year}</span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{film.title}</DialogTitle>
          <DialogDescription>
            {film.role} · {film.year}
          </DialogDescription>
        </DialogHeader>
        <FilmImages filmSlug={filmSlug} initialImages={images} />
      </DialogContent>
    </Dialog>
  );
}

function FilmImages({ filmSlug, initialImages }: { filmSlug: string; initialImages: string[] | null }) {
  const [imgs, setImgs] = useState<string[] | null>(initialImages);

  useEffect(() => {
    if (imgs !== null) return; // already loaded
    const load = async () => {
      const found: string[] = [];
      for (let i = 1; i <= 20; i++) {
        const png = `/credits/${filmSlug}-${i}.png`;
        const jpg = `/credits/${filmSlug}-${i}.jpg`;
        if (await urlExists(png)) found.push(png);
        else if (await urlExists(jpg)) found.push(jpg);
      }
      setImgs(found);
    };
    load();
  }, [filmSlug, imgs]);

  if (imgs === null) {
    return <div className="text-sm text-gray-400">Loading images…</div>;
  }

  if (imgs.length === 0) {
    return <div className="text-sm text-gray-400">No images found for this title.</div>;
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {imgs.map((src, i) => (
          <CarouselItem key={i} className="basis-full">
            <div className="rounded-lg overflow-hidden border border-slate-700">
              <img src={src} alt={`${filmSlug} image ${i + 1}`} className="w-full h-[60vh] object-contain bg-black" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4" />
      <CarouselNext className="-right-4" />
    </Carousel>
  );
}

async function urlExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

