import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Locations from "./pages/Locations";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Clients from "./pages/Clients";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendering");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/services" element={<Services />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/about" element={<About />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
