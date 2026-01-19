const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.error('Seeding Connection Error:', err));

const products = [
  // 1. Reusable Household Products
  {
    name: 'Premium Stainless Steel Water Bottle',
    description: 'Double-walled vacuum insulated water bottle. Keeps drinks cold for 24 hours or hot for 12. Durable, leak-proof, and plastic-free hydration.',
    price: 24.99,
    category: 'Reusable Household',
    images: ['https://images.unsplash.com/photo-1602143407151-01114192003f?auto=format&fit=crop&q=80&w=800'],
    ecoRating: 5,
    materials: ['Stainless Steel', 'Bamboo Cap'],
    features: ['Insulated', 'Leak-proof', 'BPA-free'],
    stock: 50
  },
  {
    name: 'Organic Cotton Mesh Produce Bags',
    description: 'Set of 5 reusable produce bags. Perfect for grocery shopping and storing fruits and vegetables. Breathable mesh keeps produce fresh longer.',
    price: 15.99,
    category: 'Reusable Household',
    images: ['https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800'],
    ecoRating: 5,
    materials: ['Organic Cotton'],
    features: ['Washable', 'Lightweight', 'Drawstring closure'],
    stock: 100
  },
  {
    name: 'Glass Spray Bottle with Silicone Sleeve',
    description: 'Refillable glass spray bottle for DIY cleaning solutions or watering plants. Comes with a protective silicone sleeve for durability.',
    price: 12.50,
    category: 'Reusable Household',
    images: ['https://images.unsplash.com/photo-1585837575652-2c9066b4a3a3?auto=format&fit=crop&q=80&w=800'],
    ecoRating: 4.5,
    materials: ['Glass', 'Silicone', 'Recycled Plastic Spray Head'],
    features: ['Refillable', 'Durable', 'Multi-purpose'],
    stock: 45
  },

  // 2. Zero-Waste Personal Care
  {
    name: 'Bamboo Toothbrush Set (4-Pack)',
    description: 'Biodegradable bamboo toothbrushes with charcoal-infused bristles. An eco-friendly alternative to plastic toothbrushes.',
    price: 10.99,
    category: 'Zero-Waste Personal Care',
    images: ['https://images.unsplash.com/photo-1607613009820-a29f7bb6dc2d?auto=format&fit=crop&q=80&w=800'],
    ecoRating: 5,
    materials: ['Bamboo', 'Nylon-4 Bristles'],
    features: ['Biodegradable Handle', 'Antimicrobial', 'Recyclable packaging'],
    stock: 200
  },
  {
    name: 'Solid Shampoo Bar - Lavender & Mint',
    description: 'Concentrated shampoo bar that replaces up to 3 plastic bottles. Handcrafted with natural ingredients for healthy, shiny hair.',
    price: 11.95,
    category: 'Zero-Waste Personal Care',
    images: ['https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=800'],
    ecoRating: 5,
    materials: ['Natural Oils', 'Essential Oils'],
    features: ['Plastic-free', 'Vegan', 'Cruelty-free'],
    stock: 80
  },
  {
    name: 'Natural Deodorant Stick',
    description: 'Aluminum-free natural deodorant in a biodegradable additives-free paper tube. Long-lasting protection without harsh chemicals.',
    price: 14.00,
    category: 'Zero-Waste Personal Care',
    images: ['https://images.unsplash.com/photo-1629198728263-125032685934?auto=format&fit=crop&q=80&w=800'],
    ecoRating: 4.8,
    materials: ['Coconut Oil', 'Shea Butter', 'Cardboard Tube'],
    features: ['Aluminum-free', 'Compostable packaging'],
    stock: 60
  },

  // 3. Sustainable Kitchen Essentials
  {
    name: 'Beeswax Food Wraps (Variety Pack)',
    description: 'Natural alternative to plastic wrap. Washable, reusable, and compostable. Set of 3 sizes (Small, Medium, Large).',
    price: 18.99,
    category: 'Sustainable Kitchen',
    images: ['https://images.unsplash.com/photo-1622396342674-517812eb1e56?auto=format&fit=crop&q=80&w=800'],
    ecoRating: 5,
    materials: ['Organic Cotton', 'Beeswax', 'Jojoba Oil'],
    features: ['Reusable', 'Plastic-free', 'Biodegradable'],
    stock: 75
  },
  {
    name: 'Bamboo Cutlery Travel Set',
    description: 'Portable bamboo utensil set with a carrying pouch. Includes fork, spoon, knife, straw, and cleaner. Ideal for lunch on the go.',
    price: 9.99,
    category: 'Sustainable Kitchen',
    images: ['https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&q=80&w=800'],
    ecoRating: 5,
    materials: ['Bamboo', 'Cotton Pouch'],
    features: ['Lightweight', 'Durable', 'Travel-friendly'],
    stock: 120
  },
  {
    name: 'Countertop Compost Bin',
    description: 'Stylish stainless steel compost bin with charcoal filter to absorb odors. Makes collecting kitchen scraps easy and odor-free.',
    price: 34.50,
    category: 'Sustainable Kitchen',
    images: ['https://images.unsplash.com/photo-1611566497745-0d3a771c5685?auto=format&fit=crop&q=80&w=800'],
    ecoRating: 4.5,
    materials: ['Stainless Steel', 'Charcoal Filter'],
    features: ['Odor-blocking', 'Dishwasher safe', '1.3 Gallon'],
    stock: 30
  },

  // 4. Eco Lifestyle
  {
    name: 'Cork Yoga Mat',
    description: 'Non-slip natural cork yoga mat. Antimicrobial, eco-friendly, and provides excellent grip even when sweaty.',
    price: 45.00,
    category: 'Eco Lifestyle',
    images: ['https://images.unsplash.com/photo-1593164842264-85460449a6a0?auto=format&fit=crop&q=80&w=800'],
    ecoRating: 5,
    materials: ['Natural Cork', 'Rubber Base'],
    features: ['Non-slip', 'Antimicrobial', 'Sustainable'],
    stock: 25
  },
  {
    name: 'Recycled Paper Notebook',
    description: 'Hardcover notebook made from 100% recycled paper. Lay-flat design, perfect for journaling or taking notes at work.',
    price: 16.00,
    category: 'Eco Lifestyle',
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'],
    ecoRating: 5,
    materials: ['Recycled Paper', 'Soy Ink'],
    features: ['Acid-free', 'Dot grid', 'FSC Certified'],
    stock: 150
  },

  // 5. Solar & Energy-Saving
  {
    name: 'Portable Solar Power Bank',
    description: '20000mAh solar charger for smartphones and tablets. Waterproof and durable, perfect for camping and outdoor adventures.',
    price: 49.99,
    category: 'Solar & Energy-Saving',
    images: ['https://images.unsplash.com/photo-1623949576395-5cb5f7b0292b?auto=format&fit=crop&q=80&w=800'],
    ecoRating: 4.2,
    materials: ['Recycled Plastic', 'Solar Cells', 'Lithium Battery'],
    features: ['Solar Charging', 'Waterproof', 'Dual USB'],
    stock: 40
  },
  {
    name: 'Solar Garden Lights (4-Pack)',
    description: 'Decorative solar-powered LED garden lights. Auto on/off sensor. Adds a warm glow to your walkway or patio without electricity.',
    price: 28.00,
    category: 'Solar & Energy-Saving',
    images: ['https://images.unsplash.com/photo-1563820258079-052202613ce5?auto=format&fit=crop&q=80&w=800'],
    ecoRating: 5,
    materials: ['Stainless Steel', 'Glass', 'Solar Panel'],
    features: ['Weather-resistant', 'Auto sensor', 'Wire-free'],
    stock: 60
  }
];

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(products);
    console.log('Added initial products');
    
    mongoose.connection.close();
    console.log('Seeding completed!');
  } catch (err) {
    console.error('Seeding Error:', err);
    process.exit(1);
  }
};

seedDB();
