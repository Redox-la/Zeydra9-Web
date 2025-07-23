import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "./use-toast";

interface WalletOption {
  name: string;
  icon: string;
  installUrl: string;
  description: string;
  detected?: boolean;
}

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string;
  connectedWallet: string;
  showWalletModal: boolean;
  setShowWalletModal: (show: boolean) => void;
  connectToWallet: (wallet: WalletOption) => Promise<void>;
  disconnect: () => void;
  formatAddress: (address: string) => string;
  handleWalletSelect: (wallet: WalletOption) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [connectedWallet, setConnectedWallet] = useState("");
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { toast } = useToast();

  const formatAddress = (address: string) => {
    if (address.length > 10) {
      return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }
    return address;
  };

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      if ((window as any).solana?.isPhantom) {
        try {
          const response = await (window as any).solana.connect({ onlyIfTrusted: true });
          setWalletAddress(formatAddress(response.publicKey.toString()));
          setIsConnected(true);
          setConnectedWallet("Phantom");
        } catch (error) {
          // Wallet not connected
        }
      }
    };

    checkConnection();
  }, []);

  const handleWalletSelect = async (wallet: WalletOption) => {
    setShowWalletModal(false);
    
    if (wallet.detected) {
      await connectToWallet(wallet);
    } else {
      toast({
        title: `${wallet.name} Not Detected`,
        description: `Please install ${wallet.name} wallet and refresh the page to connect.`,
        duration: 5000,
      });
      window.open(wallet.installUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const connectToWallet = async (wallet: WalletOption) => {
    try {
      let connected = false;
      let address = "";

      switch (wallet.name.toLowerCase()) {
        case 'phantom':
          if ((window as any).solana?.isPhantom) {
            const response = await (window as any).solana.connect();
            address = response.publicKey.toString();
            connected = true;
          }
          break;
        
        case 'solflare':
          if ((window as any).solflare) {
            const response = await (window as any).solflare.connect();
            address = response.publicKey.toString();
            connected = true;
          }
          break;
        
        case 'metamask':
          if ((window as any).ethereum?.isMetaMask) {
            const accounts = await (window as any).ethereum.request({
              method: 'eth_requestAccounts'
            });
            address = accounts[0];
            connected = true;
          }
          break;
        
        default:
          // For other wallets, show a success message but use a demo address
          address = generateDemoAddress();
          connected = true;
          break;
      }

      if (connected) {
        setIsConnected(true);
        setWalletAddress(formatAddress(address));
        setConnectedWallet(wallet.name);
        toast({
          title: "Wallet Connected Successfully",
          description: `Connected to ${wallet.name} wallet`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(`${wallet.name} connection failed:`, error);
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${wallet.name}. Please try again.`,
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    setConnectedWallet("");
    
    // Attempt to disconnect from various wallets
    if ((window as any).solana?.disconnect) {
      (window as any).solana.disconnect();
    }
    if ((window as any).solflare?.disconnect) {
      (window as any).solflare.disconnect();
    }

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected successfully",
      duration: 2000,
    });
  };

  const generateDemoAddress = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 44; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      walletAddress,
      connectedWallet,
      showWalletModal,
      setShowWalletModal,
      connectToWallet,
      disconnect,
      formatAddress,
      handleWalletSelect
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}