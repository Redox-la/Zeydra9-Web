import { motion } from "framer-motion";
import { Twitter, Gem } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cosmic-dark border-t border-cosmic-accent/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-glow mb-2">Zeydra9</h3>
            <p className="text-gray-400">Not From Earth</p>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <motion.a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-cosmic-glow transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter size={24} />
            </motion.a>
            <motion.a 
              href="https://magiceden.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-cosmic-glow transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Gem size={24} />
            </motion.a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">Created on Magic Eden</p>
            <p className="text-gray-400 text-sm">Powered by Solana</p>
          </div>
        </motion.div>
        
        <div className="border-t border-cosmic-accent/20 mt-8 pt-8 text-center">
          <p className="text-gray-500">&copy; 2024 Zeydra9. All rights reserved. | A message from beyond the stars.</p>
        </div>
      </div>
    </footer>
  );
}
