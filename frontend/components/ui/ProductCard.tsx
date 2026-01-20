'use client';

import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    ecoRating: number;
    category: string;
    reviewsCount?: number;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="product-card-hover group bg-forest-dark border border-forest-muted hover:border-primary/50 rounded-xl overflow-hidden shadow-lg transition-all duration-300"
        >
            <div className="relative aspect-square overflow-hidden">
                <Link href={`/products/${product._id}`}>
                    <img
                        src={product.images[0] || '/placeholder.png'}
                        alt={product.name}
                        className="zoom-img w-full h-full object-cover transition-transform duration-500"
                    />
                </Link>
                <div className="absolute top-3 left-3 bg-background-dark/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20">
                    {product.category}
                </div>
                <button className="absolute top-3 right-3 p-2 bg-background-dark/40 backdrop-blur-md rounded-full text-white hover:text-red-400 transition-colors">
                    <Heart size={18} />
                </button>
            </div>

            <div className="p-5 space-y-3">
                <div>
                    <Link href={`/products/${product._id}`}>
                        <h3 className="font-bold text-white group-hover:text-primary transition-colors truncate">
                            {product.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-1 mt-1">
                        <div className="flex text-primary">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    fill={i < Math.floor(product.ecoRating) ? "currentColor" : "none"}
                                    className={i < Math.floor(product.ecoRating) ? "text-primary fill-primary" : "text-primary/30"}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] text-white/40">({product.reviewsCount || 0} reviews)</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pointer-events-auto">
                    <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    <Link
                        href={`/products/${product._id}`}
                        className="text-sm font-bold bg-forest-muted hover:bg-primary hover:text-background-dark px-4 py-2 rounded-lg transition-all"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
