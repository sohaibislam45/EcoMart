import { Suspense } from 'react';
import ProductFilter from '@/components/products/ProductFilter';
import ProductCard from '@/components/ui/ProductCard';
import { PackageX } from 'lucide-react';

async function getProducts(searchParams: any) {
    const params = new URLSearchParams();

    if (searchParams.category) params.set('category', searchParams.category);
    if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice);
    if (searchParams.rating) params.set('rating', searchParams.rating);
    if (searchParams.search) params.set('search', searchParams.search);
    if (searchParams.sort) params.set('sort', searchParams.sort);

    try {
        const res = await fetch(`http://localhost:5000/api/products?${params.toString()}`, {
            cache: 'no-store' // Dynamic data
        });

        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const products = await getProducts(searchParams);

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900/50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <h1 className="text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                        All Products
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-2 md:mt-0">
                        Showing {products.length} sustainable items
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar / Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <ProductFilter />
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product: any) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                                <PackageX size={48} className="text-neutral-400 mb-4" />
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                                    No products found
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 max-w-sm text-center mt-2">
                                    Try adjusting your filters or search query to find what you're looking for.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
