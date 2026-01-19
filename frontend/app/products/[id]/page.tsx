import Link from 'next/link';
import { ArrowLeft, Star, ShoppingBag, Heart, ShieldCheck, Leaf, Truck } from 'lucide-react';

async function getProduct(id: string) {
    try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        return null;
    }
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <Link href="/products" className="text-primary-600 hover:underline">
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link href="/products" className="inline-flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors">
                        <ArrowLeft size={20} />
                        <span>Back to Products</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                            <img
                                src={product.images[0] || '/placeholder.png'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* If more images exist, show thumbnails here */}
                    </div>

                    {/* Details */}
                    <div>
                        <div className="mb-6">
                            <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider uppercase text-sm">
                                {product.category}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-2 mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center space-x-4 mb-6">
                                <div className="flex items-center text-yellow-400">
                                    <Star size={20} fill="currentColor" />
                                    <span className="ml-1 font-bold text-neutral-900 dark:text-neutral-100">{product.ecoRating}</span>
                                </div>
                                <span className="text-neutral-400">|</span>
                                <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
                            </div>

                            <div className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
                                ${product.price.toFixed(2)}
                            </div>

                            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-8">
                                {product.description}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <button className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-xl shadow-primary-600/20">
                                    <ShoppingBag size={22} />
                                    <span>Add to Cart</span>
                                </button>
                                <button className="flex items-center justify-center w-14 h-14 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400">
                                    <Heart size={22} />
                                </button>
                            </div>

                            {/* Eco Info */}
                            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Leaf className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <h3 className="font-bold text-neutral-900 dark:text-neutral-100">Sustainable Materials</h3>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            {product.materials?.join(', ') || '100% Eco-friendly materials'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <ShieldCheck className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <h3 className="font-bold text-neutral-900 dark:text-neutral-100">Certified Quality</h3>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Tested for durability and environmental impact.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Truck className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <h3 className="font-bold text-neutral-900 dark:text-neutral-100">Carbon Neutral Shipping</h3>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            We offset all carbon emissions from delivery.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
