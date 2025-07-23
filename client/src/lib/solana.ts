// Solana wallet utilities and types

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: (options?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => void;
    };
  }
}

export interface SolanaWallet {
  publicKey: string;
  isConnected: boolean;
}

export class SolanaService {
  static async connectPhantom(): Promise<SolanaWallet> {
    if (!window.solana?.isPhantom) {
      throw new Error("Phantom wallet not installed");
    }

    try {
      const response = await window.solana.connect();
      return {
        publicKey: response.publicKey.toString(),
        isConnected: true
      };
    } catch (error) {
      throw new Error("Failed to connect wallet");
    }
  }

  static async checkConnection(): Promise<SolanaWallet | null> {
    if (!window.solana?.isPhantom) {
      return null;
    }

    try {
      const response = await window.solana.connect({ onlyIfTrusted: true });
      return {
        publicKey: response.publicKey.toString(),
        isConnected: true
      };
    } catch (error) {
      return null;
    }
  }

  static disconnect(): void {
    if (window.solana?.disconnect) {
      window.solana.disconnect();
    }
  }
}

export const MAGIC_EDEN_URL = "https://magiceden.io";
