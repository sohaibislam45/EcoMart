'use client';

import Link from 'next/link';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    ecoRating: number;
    category: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all duration-300"
        >
            <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Link href={`/products/${product._id}`}>
                    <img
                        src={product.images[0] || '/placeholder.png'}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
                <div className="absolute top-3 right-3 space-y-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                    <button className="p-2 bg-white dark:bg-neutral-800 rounded-full shadow-md text-neutral-600 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-500 transition-colors">
                        <Heart size={18} />
                    </button>
                    <button className="p-2 bg-white dark:bg-neutral-800 rounded-full shadow-md text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors">
                        <ShoppingBag size={18} />
                    </button>
                </div>
                <div className="absolute top-3 left-3 bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                    Eco Choice
                </div>
            </div>

            <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                    <p className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                        {product.category}
                    </p>
                    <div className="flex items-center space-x-1 text-yellow-400">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{product.ecoRating}</span>
                    </div>
                </div>

                <Link href={`/products/${product._id}`} className="block">
                    <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100 truncate group-hover:text-primary-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                    {product.description}
                </p>

                <div className="pt-2 flex justify-between items-center">
                    <span className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
                        ${product.price.toFixed(2)}
                    </span>
                    <button className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-4 decoration-2 decoration-transparent hover:decoration-primary-600 transition-all">
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
