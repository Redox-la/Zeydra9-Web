import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface NFT {
  id: number;
  name: string;
  description: string;
  price: string;
  status: 'available' | 'minted' | 'coming-soon';
  image: string;
}

interface NFTCardProps {
  nft: NFT;
}

export default function NFTCard({ nft }: NFTCardProps) {
  if (nft.status === 'coming-soon') {
    return (
      <div className="nft-card bg-gray-800/30 rounded-xl p-4 border border-dashed border-cosmic-accent/30">
        <div className="w-full h-48 bg-gray-700/50 rounded-lg mb-3 flex items-center justify-center">
          <Lock className="text-3xl text-gray-500" size={32} />
        </div>
        <h3 className="font-semibold text-lg mb-2 text-gray-500">{nft.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{nft.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-bold">{nft.price}</span>
          <span className="text-xs px-2 py-1 bg-gray-700 rounded-full">Locked</span>
        </div>
      </div>
    );
  }

  const getStatusColor = () => {
    switch (nft.status) {
      case 'available':
        return 'bg-green-600';
      case 'minted':
        return 'bg-red-600';
      default:
        return 'bg-gray-700';
    }
  };

  const getStatusText = () => {
    switch (nft.status) {
      case 'available':
        return 'Available';
      case 'minted':
        return 'Minted';
      default:
        return 'Locked';
    }
  };

  return (
    <motion.div 
      className="nft-card bg-gray-800/50 rounded-xl p-4 border border-cosmic-accent/30 hover:border-cosmic-glow transition-all cursor-pointer"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      <img 
        src={nft.image} 
        alt={nft.name} 
        className="w-full h-48 object-cover rounded-lg mb-3"
        loading="lazy"
      />
      <h3 className="font-semibold text-lg mb-2">{nft.name}</h3>
      <p className="text-sm text-gray-400 mb-3">{nft.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-cosmic-glow font-bold">{nft.price}</span>
        <span className={`text-xs px-2 py-1 ${getStatusColor()} rounded-full`}>
          {getStatusText()}
        </span>
      </div>
    </motion.div>
  );
}
