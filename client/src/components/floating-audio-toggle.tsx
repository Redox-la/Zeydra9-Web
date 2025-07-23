import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/hooks/use-audio";

export default function FloatingAudioToggle() {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <motion.div
      className="fixed bottom-24 right-6 md:bottom-6 z-40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, duration: 0.5, type: "spring" }}
    >
      <motion.button
        onClick={toggleAudio}
        className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
          isPlaying 
            ? 'bg-cosmic-accent/80 border-cosmic-glow shadow-lg shadow-cosmic-glow/30' 
            : 'bg-gray-800/80 border-gray-600 hover:bg-cosmic-accent/60 hover:border-cosmic-accent'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isPlaying ? "Disable Space Ambience" : "Enable Space Ambience"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="volume-on"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 size={20} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="volume-off"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX size={20} className="text-gray-300" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulse animation when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cosmic-glow"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </motion.div>
  );
}