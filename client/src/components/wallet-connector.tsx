import { motion } from "framer-motion";
import { Wallet, Check } from "lucide-react";
import WalletSelectionModal from "./wallet-selection-modal";
import { useWallet } from "@/hooks/use-wallet";

export default function WalletConnector() {
  const { 
    isConnected, 
    walletAddress, 
    connectedWallet,
    showWalletModal,
    setShowWalletModal,
    handleWalletSelect,
    disconnect 
  } = useWallet();

  return (
    <>
      <motion.button
        onClick={isConnected ? disconnect : () => setShowWalletModal(true)}
        className={`px-4 py-2 rounded-lg font-semibold transition-all glow-border flex items-center ${
          isConnected 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-cosmic-accent hover:bg-purple-600'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isConnected ? (
          <>
            <Check className="mr-2" size={16} />
            <div className="flex flex-col items-start">
              <span className="text-xs opacity-75">{connectedWallet}</span>
              <span>{walletAddress}</span>
            </div>
          </>
        ) : (
          <>
            <Wallet className="mr-2" size={16} />
            Connect Wallet
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