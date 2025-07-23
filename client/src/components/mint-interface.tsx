import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Wallet as WalletIcon, ExternalLink } from "lucide-react";
import WalletSelectionModal from "./wallet-selection-modal";
import { useWallet } from "@/hooks/use-wallet";
import { useToast } from "@/hooks/use-toast";

interface MintInterfaceProps {
  className?: string;
  showLabel?: boolean;
  size?: "small" | "medium" | "large";
}

export default function MintInterface({ 
  className = "", 
  showLabel = true, 
  size = "medium" 
}: MintInterfaceProps) {
  const { 
    isConnected, 
    connectedWallet,
    showWalletModal,
    setShowWalletModal,
    handleWalletSelect 
  } = useWallet();
  const { toast } = useToast();
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    if (!isConnected) {
      setShowWalletModal(true);
      return;
    }

    setIsMinting(true);
    
    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "NFT Minted Successfully! 🚀",
        description: `Your Zeydra9 NFT has been minted to your ${connectedWallet} wallet`,
        duration: 5000,
      });

      // Open Magic Eden in a new tab (placeholder for actual minting)
      setTimeout(() => {
        window.open('https://magiceden.io', '_blank', 'noopener,noreferrer');
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: "There was an error minting your NFT. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsMinting(false);
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case "small":
        return "px-4 py-2 text-sm";
      case "large":
        return "px-8 py-4 text-lg";
      default:
        return "px-6 py-3";
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 24;
      default:
        return 20;
    }
  };

  return (
    <>
      <motion.button
        onClick={handleMint}
        disabled={isMinting}
        className={`${getButtonSize()} rounded-lg font-semibold transition-all glow-border flex items-center justify-center ${
          isConnected 
            ? 'bg-cosmic-glow hover:bg-cyan-400 text-black' 
            : 'bg-cosmic-accent hover:bg-purple-600 text-white'
        } ${isMinting ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        whileHover={!isMinting ? { scale: 1.02 } : {}}
        whileTap={!isMinting ? { scale: 0.98 } : {}}
      >
        {isMinting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
            Minting...
          </>
        ) : isConnected ? (
          <>
            <Rocket className="mr-2" size={getIconSize()} />
            {showLabel && "Mint Now"}
          </>
        ) : (
          <>
            <WalletIcon className="mr-2" size={getIconSize()} />
            {showLabel && "Connect & Mint"}
          </>
        )}
      </motion.button>

      <WalletSelectionModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onWalletSelect={handleWalletSelect}
      />
    </>
  );
}