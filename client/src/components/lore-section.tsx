import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Users, Radio } from "lucide-react";
import SpaceAudioControls from "./space-audio-controls";

export default function LoreSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  const loreTexts = [
    "They came from lightyears away...",
    "Not to invade...",
    "But to find someone who would believe.",
    "50 beings. 50 stories. 50 connections.",
    "You were chosen to receive this message."
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const typeText = (text: string, index: number = 0) => {
      if (index <= text.length) {
        setCurrentText(text.slice(0, index));
        timeoutId = setTimeout(() => typeText(text, index + 1), 100);
      } else {
        timeoutId = setTimeout(() => {
          const nextIndex = (currentTextIndex + 1) % loreTexts.length;
          setCurrentTextIndex(nextIndex);
          setCurrentText("");
        }, 2000);
      }
    };

    typeText(loreTexts[currentTextIndex]);

    return () => clearTimeout(timeoutId);
  }, [currentTextIndex]);



  return (
    <section id="lore" className="py-20 bg-gradient-to-b from-cosmic-purple to-cosmic-blue relative overflow-hidden">
      {/* Background cosmic effect */}
      <div className="absolute inset-0 opacity-30">
        <div 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          className="w-full h-full"
        />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-12 text-glow"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          The Message
        </motion.h2>
        
        <motion.div 
          className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-cosmic-accent/30"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-xl md:text-2xl leading-relaxed text-gray-200 min-h-[200px] flex items-center justify-center">
            <span className="typewriter">
              {currentText}
              <span className="animate-pulse">|</span>
            </span>
          </div>
          
          {/* Audio Controls */}
          <div className="mt-8 flex justify-center">
            <SpaceAudioControls />
          </div>
        </motion.div>
        
        {/* Additional lore content */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-cosmic-accent/20">
            <div className="text-cosmic-glow text-3xl mb-4">
              <Globe size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Origin: Zeydra-9</h3>
            <p className="text-gray-300">A distant planet in the Andromeda Galaxy, 2.5 million light-years from Earth.</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-cosmic-accent/20">
            <div className="text-cosmic-glow text-3xl mb-4">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Population: 50</h3>
            <p className="text-gray-300">The last remaining beings from their civilization, seeking connection across the cosmos.</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-cosmic-accent/20">
            <div className="text-cosmic-glow text-3xl mb-4">
              <Radio size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Signal: Active</h3>
            <p className="text-gray-300">Their message continues to travel through space, waiting for those who believe.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
