'use client';

import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface RelatedProduct {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
}

interface RelatedProductsProps {
    products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    const [startIndex, setStartIndex] = useState(0);
    const itemsToShow = 4;

    const handlePrev = () => {
        setStartIndex(Math.max(0, startIndex - 1));
    };

    const handleNext = () => {
        setStartIndex(Math.min(products.length - itemsToShow, startIndex + 1));
    };

    const visibleProducts = products.slice(startIndex, startIndex + itemsToShow);

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-white">Pairs well with</h2>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                        className="size-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={startIndex >= products.length - itemsToShow}
                        className="size-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleProducts.map((product) => (
                    <div
                        key={product._id}
                        className="group bg-surface rounded-2xl overflow-hidden border border-primary/5 hover:border-primary/20 transition-all duration-300"
                    >
                        <Link href={`/products/${product._id}`}>
                            <div
                                className="aspect-[4/3] bg-cover bg-center"
                                style={{ backgroundImage: `url('${product.images[0]}')` }}
                            >
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover opacity-0"
                                />
                            </div>
                        </Link>
                        <div className="p-5">
                            <Link href={`/products/${product._id}`}>
                                <h3 className="font-bold text-white mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                    {product.name}
                                </h3>
                            </Link>
                            <p className="text-xs text-white/50 mb-4">{product.category}</p>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                                <button className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                    <ShoppingCart size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
