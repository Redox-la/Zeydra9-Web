import { motion } from "framer-motion";
import { Volume2, VolumeX, VolumeOff } from "lucide-react";
import { useAudio } from "@/hooks/use-audio";

export default function SpaceAudioControls() {
  const { isPlaying, volume, toggleAudio, setVolume } = useAudio();

  const getVolumeIcon = () => {
    if (!isPlaying) return VolumeOff;
    if (volume === 0) return VolumeX;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();

  return (
    <motion.div 
      className="bg-cosmic-accent/10 backdrop-blur-sm rounded-xl p-6 border border-cosmic-accent/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center space-y-4">
        <h3 className="text-lg font-semibold text-cosmic-glow">Space Ambience</h3>
        
        {/* Play/Pause Button */}
        <motion.button 
          onClick={toggleAudio}
          className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all ${
            isPlaying 
              ? 'bg-cosmic-accent hover:bg-purple-600' 
              : 'bg-gray-700 hover:bg-cosmic-accent/60 border border-cosmic-accent'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <VolumeIcon className="mr-3" size={20} />
          <span>
            {isPlaying ? 'Disable Space Ambience' : 'Enable Space Ambience'}
          </span>
        </motion.button>

        {/* Volume Slider */}
        {isPlaying && (
          <motion.div 
            className="w-full flex items-center space-x-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <VolumeX size={16} className="text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, var(--cosmic-accent) 0%, var(--cosmic-accent) ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
              }}
            />
            <Volume2 size={16} className="text-cosmic-glow" />
          </motion.div>
        )}

        {/* Status Indicator */}
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
          <span>{isPlaying ? `Playing at ${Math.round(volume * 100)}%` : 'Audio Disabled'}</span>
        </div>
      </div>
    </motion.div>
  );
}