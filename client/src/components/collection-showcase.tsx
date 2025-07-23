import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import NFTCard from "./nft-card";

interface NFT {
  id: number;
  name: string;
  description: string;
  price: string;
  status: 'available' | 'minted' | 'coming-soon';
  image: string;
  tokenId?: string;
  attributes?: string;
  owner?: string;
}

export default function CollectionShowcase() {
  const [filter, setFilter] = useState<'all' | 'available' | 'minted'>('all');

  // Fetch NFTs from the database
  const { data: nfts = [], isLoading, error } = useQuery({
    queryKey: ['/api/nfts'],
    queryFn: async () => {
      const response = await fetch('/api/nfts');
      if (!response.ok) throw new Error('Failed to fetch NFTs');
      return response.json();
    },
  });

  // Transform database NFTs to match our interface and add SOL suffix
  const transformedNFTs: NFT[] = nfts.map((nft: any) => ({
    ...nft,
    price: `${nft.price} SOL`
  }));

  // Generate placeholder cards for the remaining NFTs (up to 50 total)
  const remainingCount = Math.max(0, 50 - transformedNFTs.length);
  const placeholderCards = Array.from({ length: remainingCount }, (_, index) => ({
    id: transformedNFTs.length + index + 1,
    name: "Coming Soon",
    description: "??? ??????",
    price: "??? SOL",
    status: "coming-soon" as const,
    image: ""
  }));

  const allNFTs = [...transformedNFTs, ...placeholderCards];

  const filteredNFTs = filter === 'all' 
    ? allNFTs.filter(nft => nft.status !== 'coming-soon')
    : allNFTs.filter(nft => nft.status === filter);

  if (error) {
    return (
      <section id="collection" className="py-20 bg-gradient-to-b from-cosmic-dark to-cosmic-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">The Collection</h2>
          <p className="text-xl text-red-400">Failed to load NFT collection. Please try again.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="collection" className="py-20 bg-gradient-to-b from-cosmic-dark to-cosmic-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">The Collection</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            50 unique extraterrestrial beings, each with their own cosmic signature and otherworldly characteristics.
          </p>
          
          {/* Collection Stats */}
          {!isLoading && transformedNFTs.length > 0 && (
            <div className="flex justify-center mt-8 space-x-8 text-sm text-gray-400">
              <div>Total: <span className="text-cosmic-glow font-bold">{transformedNFTs.length}/50</span></div>
              <div>Available: <span className="text-green-400 font-bold">{transformedNFTs.filter(n => n.status === 'available').length}</span></div>
              <div>Minted: <span className="text-red-400 font-bold">{transformedNFTs.filter(n => n.status === 'minted').length}</span></div>
            </div>
          )}
          
          {/* Filter Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full transition-colors ${
                filter === 'all' 
                  ? 'bg-cosmic-accent text-white' 
                  : 'bg-gray-700 hover:bg-cosmic-accent text-gray-300 hover:text-white'
              }`}
            >
              Show All
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-6 py-2 rounded-full transition-colors ${
                filter === 'available' 
                  ? 'bg-cosmic-accent text-white' 
                  : 'bg-gray-700 hover:bg-cosmic-accent text-gray-300 hover:text-white'
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setFilter('minted')}
              className={`px-6 py-2 rounded-full transition-colors ${
                filter === 'minted' 
                  ? 'bg-cosmic-accent text-white' 
                  : 'bg-gray-700 hover:bg-cosmic-accent text-gray-300 hover:text-white'
              }`}
            >
              Minted
            </button>
          </div>
        </motion.div>

        {/* NFT Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-cosmic-accent/30 animate-pulse">
                <div className="w-full h-48 bg-gray-700 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded mb-3 w-2/3"></div>
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                  <div className="h-5 bg-gray-700 rounded-full w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {filteredNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <NFTCard nft={nft} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
