import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface WalletOption {
  name: string;
  icon: string;
  installUrl: string;
  description: string;
  detected?: boolean;
}

interface WalletSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletSelect: (wallet: WalletOption) => void;
}

const walletOptions: WalletOption[] = [
  {
    name: "Phantom",
    icon: "👻",
    installUrl: "https://phantom.app/",
    description: "The most popular Solana wallet"
  },
  {
    name: "Solflare",
    icon: "🔥",
    installUrl: "https://solflare.com/",
    description: "Advanced Solana wallet with staking"
  },
  {
    name: "Trust Wallet",
    icon: "🛡️",
    installUrl: "https://trustwallet.com/",
    description: "Multi-chain mobile & desktop wallet"
  },
  {
    name: "MetaMask",
    icon: "🦊",
    installUrl: "https://metamask.io/",
    description: "Popular Ethereum wallet with Solana support"
  },
  {
    name: "Coinbase Wallet",
    icon: "🪙",
    installUrl: "https://wallet.coinbase.com/",
    description: "Secure wallet by Coinbase"
  },
  {
    name: "Backpack",
    icon: "🎒",
    installUrl: "https://backpack.app/",
    description: "Next-gen crypto wallet"
  }
];

export default function WalletSelectionModal({ 
  isOpen, 
  onClose, 
  onWalletSelect 
}: WalletSelectionModalProps) {
  
  // Check if wallets are installed
  const walletsWithDetection = walletOptions.map(wallet => ({
    ...wallet,
    detected: checkWalletInstalled(wallet.name)
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-cosmic-dark border border-cosmic-accent/30 rounded-2xl p-4 md:p-6 max-w-md w-full max-h-[80vh] overflow-y-auto mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-glow">Connect Wallet</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-6">
              Choose your preferred wallet to connect to the Zeydra9 collection.
              If you don't have a wallet installed, click on any option to download.
            </p>

            {/* Wallet Options */}
            <div className="space-y-3">
              {walletsWithDetection.map((wallet) => (
                <motion.button
                  key={wallet.name}
                  onClick={() => onWalletSelect(wallet)}
                  className={`w-full p-3 md:p-4 rounded-xl border transition-all flex items-center space-x-3 md:space-x-4 ${
                    wallet.detected 
                      ? 'border-cosmic-glow bg-cosmic-glow/10 hover:bg-cosmic-glow/20' 
                      : 'border-cosmic-accent/30 bg-cosmic-accent/5 hover:bg-cosmic-accent/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-3xl">{wallet.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-white">{wallet.name}</h3>
                      {wallet.detected && (
                        <span className="text-xs bg-green-600 px-2 py-1 rounded-full">
                          Installed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{wallet.description}</p>
                  </div>
                  <div className="text-cosmic-glow">
                    {wallet.detected ? '→' : '↗'}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-cosmic-accent/20">
              <p className="text-xs text-gray-500 text-center">
                New to crypto wallets? We recommend starting with Phantom or Solflare for the best Solana experience.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function checkWalletInstalled(walletName: string): boolean {
  switch (walletName.toLowerCase()) {
    case 'phantom':
      return !!(window as any).solana?.isPhantom;
    case 'solflare':
      return !!(window as any).solflare;
    case 'metamask':
      return !!(window as any).ethereum?.isMetaMask;
    case 'trust wallet':
      return !!(window as any).ethereum?.isTrust;
    case 'coinbase wallet':
      return !!(window as any).ethereum?.isCoinbaseWallet;
    case 'backpack':
      return !!(window as any).backpack;
    default:
      return false;
  }
}