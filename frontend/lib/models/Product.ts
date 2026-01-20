import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  ecoRating: number;
  materials: string[];
  features: string[];
  certifications: string[];
  stock: number;
  isFeatured: boolean;
  createdAt: Date;
}

const productSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Reusable Household', 
      'Zero-Waste Personal Care', 
      'Sustainable Kitchen', 
      'Eco Lifestyle', 
      'Solar & Energy-Saving', 
      'Sustainable Fashion',
      'Other'
    ]
  },
  images: [{
    type: String,
    required: true
  }],
  ecoRating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.5
  },
  materials: [String],
  features: [String],
  certifications: [String],
  stock: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Check if the model exists before defining it to avoid OverwriteModelError in Next.js hot reloading
const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;
