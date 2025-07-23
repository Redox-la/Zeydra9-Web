import { useState } from "react";
import WalletConnector from "./wallet-connector";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth'});
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-cosmic-dark/80 backdrop-blur-md border-b border-cosmic-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-glow cursor-pointer" onClick={() => scrollToSection('hero')}>
            Zeydra9
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="hover:text-cosmic-glow transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('collection')}
              className="hover:text-cosmic-glow transition-colors"
            >
              Collection
            </button>
            <button 
              onClick={() => scrollToSection('lore')}
              className="hover:text-cosmic-glow transition-colors"
            >
              Lore
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-cosmic-glow transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Wallet Connector */}
          <div className="hidden md:block">
            <WalletConnector />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-cosmic-dark/95 backdrop-blur-md border-t border-cosmic-accent/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block px-3 py-2 text-white hover:text-cosmic-glow transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('collection')}
                className="block px-3 py-2 text-white hover:text-cosmic-glow transition-colors"
              >
                Collection
              </button>
              <button 
                onClick={() => scrollToSection('lore')}
                className="block px-3 py-2 text-white hover:text-cosmic-glow transition-colors"
              >
                Lore
              </button>
              <div className="px-3 py-2">
                <WalletConnector />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
