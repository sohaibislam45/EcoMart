import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getApiUrl } from '@/lib/api-url';

async function getFeaturedProducts() {
    try {
        // In production, use utility for internal URL
        const res = await fetch(getApiUrl('/products?limit=8'), {
            next: { revalidate: 60 } // Revalidate every minute
        });

        if (!res.ok) {
            // Fallback or empty if API fails
            console.error('Failed to fetch products');
            return [];
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }
}

export default async function FeaturedProducts() {
    const products = await getFeaturedProducts();

    return (
        <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider uppercase text-sm">
                            Curated for you
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                            Featured Products
                        </h2>
                    </div>
                    <Link
                        href="/products"
                        className="hidden md:flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                        <span>View All</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.slice(0, 8).map((product: any) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-neutral-500">Loading products...</p>
                    </div>
                )}

                <div className="mt-12 text-center md:hidden">
                    <Link
                        href="/products"
                        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                        <span>View All Products</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
