import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";

interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  toggleAudio: () => void;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for space ambience
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    // Use a free space ambient sound URL or base64 encoded sound
    // For now, we'll use a generated audio tone that simulates space ambience
    audioRef.current.src = createSpaceAmbienceDataURL();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)));
  };

  return (
    <AudioContext.Provider value={{
      isPlaying,
      volume,
      toggleAudio,
      setVolume
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

// Generate a simple space ambience sound using Web Audio API
function createSpaceAmbienceDataURL(): string {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const sampleRate = 44100;
  const duration = 30; // 30 seconds loop
  const buffer = audioContext.createBuffer(2, sampleRate * duration, sampleRate);

  // Generate ambient space-like sound
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    
    for (let i = 0; i < channelData.length; i++) {
      const time = i / sampleRate;
      
      // Create layered ambient tones
      let sample = 0;
      
      // Deep bass hum (simulating engine/space station)
      sample += Math.sin(2 * Math.PI * 40 * time) * 0.1;
      sample += Math.sin(2 * Math.PI * 60 * time) * 0.05;
      
      // Mid-frequency ambient wash
      sample += Math.sin(2 * Math.PI * 150 * time) * 0.03 * Math.sin(time * 0.5);
      sample += Math.sin(2 * Math.PI * 200 * time) * 0.02 * Math.sin(time * 0.3);
      
      // High-frequency sparkle (simulating distant stars/electronics)
      sample += Math.sin(2 * Math.PI * 800 * time) * 0.01 * Math.sin(time * 2);
      sample += Math.random() * 0.005; // Subtle static
      
      // Apply envelope for smooth looping
      const fadeTime = 2; // 2 seconds fade
      if (time < fadeTime) {
        sample *= time / fadeTime;
      } else if (time > duration - fadeTime) {
        sample *= (duration - time) / fadeTime;
      }
      
      channelData[i] = sample * 0.5; // Overall volume reduction
    }
  }

  // Convert buffer to WAV data URL
  return bufferToWaveDataURL(buffer);
}

function bufferToWaveDataURL(buffer: AudioBuffer): string {
  const length = buffer.length;
  const numberOfChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const bytesPerSample = 2;
  
  const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * bytesPerSample);
  const view = new DataView(arrayBuffer);
  
  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + length * numberOfChannels * bytesPerSample, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numberOfChannels * bytesPerSample, true);
  view.setUint16(32, numberOfChannels * bytesPerSample, true);
  view.setUint16(34, 8 * bytesPerSample, true);
  writeString(36, 'data');
  view.setUint32(40, length * numberOfChannels * bytesPerSample, true);
  
  // Convert float samples to 16-bit PCM
  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }
  }
  
  const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}