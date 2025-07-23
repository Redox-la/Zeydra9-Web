import { db } from "../server/db";
import { nfts } from "../shared/schema";

const zeydra9Collection = [
  {
    tokenId: "ZEYDRA9_001",
    name: "Zeydra9 #001",
    description: "Cosmic Wanderer - The first of the Zeydra9 beings to make contact across the galaxy",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    price: "2.5",
    status: "available",
    attributes: JSON.stringify({
      background: "Deep Space",
      type: "Explorer",
      power_level: "High",
      origin: "Zeydra-9 Core"
    })
  },
  {
    tokenId: "ZEYDRA9_002",
    name: "Zeydra9 #002",
    description: "Star Keeper - Guardian of ancient cosmic knowledge and stellar pathways",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    price: "3.1",
    status: "minted",
    attributes: JSON.stringify({
      background: "Nebula Fields",
      type: "Guardian",
      power_level: "Epic",
      origin: "Stellar Observatory"
    }),
    owner: "7xKX...Mv8Q"
  },
  {
    tokenId: "ZEYDRA9_003",
    name: "Zeydra9 #003",
    description: "Void Walker - Master of interdimensional travel and dark matter manipulation",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    price: "1.8",
    status: "available",
    attributes: JSON.stringify({
      background: "Void Dimension",
      type: "Mystic",
      power_level: "Legendary",
      origin: "Dark Matter Realm"
    })
  },
  {
    tokenId: "ZEYDRA9_004",
    name: "Zeydra9 #004",
    description: "Quantum Sage - Ancient being with mastery over quantum mechanics and time streams",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    price: "4.2",
    status: "available",
    attributes: JSON.stringify({
      background: "Quantum Field",
      type: "Sage",
      power_level: "Mythic",
      origin: "Time Temple"
    })
  },
  {
    tokenId: "ZEYDRA9_005",
    name: "Zeydra9 #005",
    description: "Nebula Guardian - Protector of cosmic nurseries where new stars are born",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    price: "5.7",
    status: "minted",
    attributes: JSON.stringify({
      background: "Star Nursery",
      type: "Guardian",
      power_level: "Epic",
      origin: "Nebula Heart"
    }),
    owner: "9xAB...Cd7E"
  },
  {
    tokenId: "ZEYDRA9_006",
    name: "Zeydra9 #006",
    description: "Light Weaver - Artisan of cosmic energy patterns and stellar illumination",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    price: "2.9",
    status: "available",
    attributes: JSON.stringify({
      background: "Aurora Fields",
      type: "Artisan",
      power_level: "Rare",
      origin: "Light Forge"
    })
  },
  {
    tokenId: "ZEYDRA9_007",
    name: "Zeydra9 #007",
    description: "Plasma Shaper - Master craftsman of stellar plasma and solar wind currents",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    price: "3.3",
    status: "available",
    attributes: JSON.stringify({
      background: "Solar Winds",
      type: "Craftsman",
      power_level: "High",
      origin: "Plasma Foundry"
    })
  },
  {
    tokenId: "ZEYDRA9_008",
    name: "Zeydra9 #008",
    description: "Echo Caller - Communicator across the vast emptiness between worlds",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    price: "2.1",
    status: "available",
    attributes: JSON.stringify({
      background: "Signal Void",
      type: "Communicator",
      power_level: "Rare",
      origin: "Echo Chambers"
    })
  },
  {
    tokenId: "ZEYDRA9_009",
    name: "Zeydra9 #009",
    description: "Crystal Mind - Keeper of crystallized thoughts and memory matrices",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    price: "4.8",
    status: "minted",
    attributes: JSON.stringify({
      background: "Crystal Caverns",
      type: "Keeper",
      power_level: "Legendary",
      origin: "Memory Vault"
    }),
    owner: "5xTY...Nj3K"
  },
  {
    tokenId: "ZEYDRA9_010",
    name: "Zeydra9 #010",
    description: "Gravity Bender - Manipulator of gravitational fields and space-time curvature",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    price: "6.2",
    status: "available",
    attributes: JSON.stringify({
      background: "Gravitational Lens",
      type: "Manipulator",
      power_level: "Mythic",
      origin: "Gravity Wells"
    })
  }
];

async function seedDatabase() {
  console.log("🌌 Seeding Zeydra9 NFT Collection...");
  
  try {
    // Clear existing NFTs
    await db.delete(nfts);
    
    // Insert the collection
    await db.insert(nfts).values(zeydra9Collection);
    
    console.log("✅ Successfully seeded database with 10 Zeydra9 NFTs");
    console.log("📊 Collection Stats:");
    console.log(`   • Total NFTs: ${zeydra9Collection.length}`);
    console.log(`   • Available: ${zeydra9Collection.filter(n => n.status === 'available').length}`);
    console.log(`   • Minted: ${zeydra9Collection.filter(n => n.status === 'minted').length}`);
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run the seeding function
seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

export { seedDatabase };