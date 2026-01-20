import { Suspense } from 'react';
import ProductFilter from '@/components/products/ProductFilter';
import ProductCard from '@/components/ui/ProductCard';
import { PackageX, ChevronRight, Expand } from 'lucide-react';
import Link from 'next/link';
import { getApiUrl } from '@/lib/api-url';

async function getProducts(searchParams: any) {
    const params = new URLSearchParams();

    if (searchParams.category) params.set('category', searchParams.category);
    if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice);
    if (searchParams.rating) params.set('rating', searchParams.rating);
    if (searchParams.search) params.set('search', searchParams.search);
    if (searchParams.sort) params.set('sort', searchParams.sort);

    // Add limit for initial load (optional, but good for "Load More" logic if backend supports it)
    // For now, let's fetch all and simulate "Load More" on client or just show all.
    // The design shows "Showing 8 of 24 products", implying pagination.

    try {
        const res = await fetch(getApiUrl(`/products?${params.toString()}`), {
            cache: 'no-store'
        });

        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function ProductsPage(props: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const searchParams = await props.searchParams;
    const products = await getProducts(searchParams);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-white">
            <main className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 py-8">

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <ProductFilter />
                    </aside>

                    {/* Product Grid Section */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold">
                                Sustainable Products
                                <span className="text-white/30 font-normal ml-2 text-lg">({products.length} items)</span>
                            </h1>
                        </div>

                        {products.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {products.map((product: any) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>

                                {/* Load More Section (Simplified for now) */}
                                <div className="mt-16 flex flex-col items-center gap-4">
                                    <p className="text-white/40 text-sm">Showing {products.length} of {products.length} products</p>
                                    <div className="w-48 h-1 bg-forest-muted rounded-full overflow-hidden">
                                        <div className="w-full h-full bg-primary rounded-full"></div>
                                    </div>
                                    <button className="mt-4 flex items-center gap-2 bg-transparent hover:bg-forest-muted border border-forest-muted px-8 py-3 rounded-xl font-bold transition-all text-white">
                                        <span>Load More Products</span>
                                        <ChevronRight className="rotate-90" size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-forest-dark border border-forest-muted rounded-2xl">
                                <PackageX size={48} className="text-white/20 mb-4" />
                                <h3 className="text-xl font-bold text-white">No products found</h3>
                                <p className="text-white/50 max-w-sm text-center mt-2">
                                    Try adjusting your filters or search query to find what you're looking for.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
