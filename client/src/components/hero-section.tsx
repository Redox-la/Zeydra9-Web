import { motion } from "framer-motion";
import { Rocket, ExternalLink } from "lucide-react";
import MintInterface from "./mint-interface";

export default function HeroSection() {
  const scrollToLore = () => {
    document.getElementById('lore')?.scrollIntoView({behavior: 'smooth'});
  };

  const openMagicEden = () => {
    window.open('https://magiceden.io', '_blank');
  };

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-space stars">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Spaceship */}
        <motion.div 
          className="absolute top-1/4 left-0 w-16 h-8 opacity-60"
          animate={{ 
            x: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
            y: [0, -20, 0, -30, 0, -10, 0, -25, 0, -15, 0]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="text-4xl text-cosmic-glow transform rotate-45">🛸</div>
        </motion.div>
        
        {/* Orbiting Planet */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div 
            className="w-6 h-6 bg-purple-500 rounded-full opacity-40"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ 
              transformOrigin: "300px 0px",
              transform: "rotate(0deg) translateX(300px) rotate(0deg)"
            }}
          />
        </div>
        
        {/* Shooting Stars */}
        <motion.div 
          className="absolute top-20 right-20"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ⭐
        </motion.div>
        <motion.div 
          className="absolute top-40 left-1/4"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          ⭐
        </motion.div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main Title */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-glow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-cosmic-glow to-cosmic-accent bg-clip-text text-transparent">
              Zeydra9
            </span>
            <br />
            <span className="text-3xl md:text-4xl font-light">Not From Earth</span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            "An NFT signal from another galaxy. 50 extraterrestrial lifeforms known only as Zeydra9. You were never meant to find this..."
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <motion.button 
              onClick={scrollToLore}
              className="group bg-transparent border-2 border-cosmic-accent hover:bg-cosmic-accent px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket className="mr-3 group-hover:animate-bounce" size={20} />
              🔮 Enter Galaxy
            </motion.button>
            
            <MintInterface size="large" className="px-8 py-4 rounded-full" />
            
            <motion.button 
              onClick={openMagicEden}
              className="bg-transparent border border-cosmic-glow hover:bg-cosmic-glow hover:text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="mr-3" size={20} />
              🌐 View on Magic Eden
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
