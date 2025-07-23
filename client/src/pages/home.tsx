import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import CollectionShowcase from "@/components/collection-showcase";
import LoreSection from "@/components/lore-section";
import Footer from "@/components/footer";
import FloatingAudioToggle from "@/components/floating-audio-toggle";
import MintInterface from "@/components/mint-interface";

export default function Home() {
  useEffect(() => {
    // Add dark class to html element for cosmic theme
    document.documentElement.classList.add("dark");
    document.body.className = "bg-cosmic-dark text-white font-space overflow-x-hidden";
  }, []);

  return (
    <div className="min-h-screen bg-cosmic-dark text-white">
      <Navigation />
      <HeroSection />
      <CollectionShowcase />
      <LoreSection />
      <Footer />
      
      {/* Floating Audio Toggle */}
      <FloatingAudioToggle />
      
      {/* Mobile Sticky CTAs */}
      <div className="fixed bottom-0 left-0 right-0 bg-cosmic-dark/90 backdrop-blur-md border-t border-cosmic-accent/20 p-4 md:hidden z-50">
        <div className="flex space-x-4">
          <div className="flex-1">
            <MintInterface 
              size="small" 
              className="w-full justify-center"
              showLabel={false}
            />
          </div>
          <button 
            onClick={() => document.getElementById('collection')?.scrollIntoView({behavior: 'smooth'})}
            className="flex-1 bg-transparent border border-cosmic-glow hover:bg-cosmic-glow hover:text-black py-3 rounded-lg font-semibold transition-all text-center"
          >
            View Collection
          </button>
        </div>
      </div>
    </div>
  );
}
