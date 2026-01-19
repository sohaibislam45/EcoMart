'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

const categories = [
    'All',
    'Reusable Household',
    'Zero-Waste Personal Care',
    'Sustainable Kitchen',
    'Eco Lifestyle',
    'Solar & Energy-Saving',
    'Sustainable Fashion',
    'Other'
];

export default function ProductFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    // Initialize state from URL params
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || 'All',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        rating: searchParams.get('rating') || '',
        sort: searchParams.get('sort') || 'newest',
        search: searchParams.get('search') || ''
    });

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            applyFilters();
        }, 500);
        return () => clearTimeout(handler);
    }, [filters.search]);

    const updateFilter = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (filters.category && filters.category !== 'All') params.set('category', filters.category);
        if (filters.minPrice) params.set('minPrice', filters.minPrice);
        if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
        if (filters.rating) params.set('rating', filters.rating);
        if (filters.sort) params.set('sort', filters.sort);
        if (filters.search) params.set('search', filters.search);

        router.push(`/products?${params.toString()}`);
    };

    // Apply filters when they change (except search which is debounced)
    useEffect(() => {
        // Only apply if search didn't change (handled by debounce)
        if (filters.search === (searchParams.get('search') || '')) {
            // We need a way to trigger apply only on explicit user action for select/inputs if we want instant update
            // For now, let's use a "Apply" button for price or just onBlur/Enter?
            // Actually instant update for category/sort/rating is good.
        }
    }, [filters]);

    const handleApply = () => {
        applyFilters();
        setIsOpen(false);
    };

    return (
        <>
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 w-full"
                >
                    <SlidersHorizontal size={20} />
                    <span>Filters & Sort</span>
                </button>
            </div>

            <div className={`
        lg:block space-y-8
        ${isOpen ? 'fixed inset-0 z-50 bg-white dark:bg-neutral-900 p-6 overflow-y-auto' : 'hidden'}
      `}>
                {isOpen && (
                    <div className="flex justify-between items-center mb-6 lg:hidden">
                        <h2 className="text-xl font-bold">Filters</h2>
                        <button onClick={() => setIsOpen(false)}><X size={24} /></button>
                    </div>
                )}

                {/* Search */}
                <div>
                    <h3 className="font-bold mb-3">Search</h3>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                    />
                </div>

                {/* Categories */}
                <div>
                    <h3 className="font-bold mb-3">Category</h3>
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={filters.category === cat}
                                    onChange={() => {
                                        updateFilter('category', cat);
                                        // Instant update
                                        const params = new URLSearchParams(searchParams.toString());
                                        if (cat !== 'All') params.set('category', cat);
                                        else params.delete('category');
                                        router.push(`/products?${params.toString()}`);
                                    }}
                                    className="text-primary-600 focus:ring-primary-500"
                                />
                                <span>{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <h3 className="font-bold mb-3">Price Range</h3>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice}
                            onChange={(e) => updateFilter('minPrice', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice}
                            onChange={(e) => updateFilter('maxPrice', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                        />
                    </div>
                    <button
                        onClick={handleApply}
                        className="mt-2 w-full bg-primary-600 text-white py-1 rounded-md text-sm hover:bg-primary-700"
                    >
                        Apply Price
                    </button>
                </div>

                {/* Rating */}
                <div>
                    <h3 className="font-bold mb-3">Eco Rating</h3>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.5"
                        value={filters.rating || 1}
                        onChange={(e) => updateFilter('rating', e.target.value)}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-neutral-500">
                        <span>1</span>
                        <span>{filters.rating || 'Any'}+ Stars</span>
                        <span>5</span>
                    </div>
                    <button
                        onClick={handleApply}
                        className="mt-2 w-full bg-neutral-200 dark:bg-neutral-800 py-1 rounded-md text-sm hover:bg-neutral-300 dark:hover:bg-neutral-700"
                    >
                        Apply Rating
                    </button>
                </div>

                {/* Sort */}
                <div>
                    <h3 className="font-bold mb-3">Sort By</h3>
                    <select
                        value={filters.sort}
                        onChange={(e) => {
                            updateFilter('sort', e.target.value);
                            const params = new URLSearchParams(searchParams.toString());
                            params.set('sort', e.target.value);
                            router.push(`/products?${params.toString()}`);
                        }}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                    >
                        <option value="newest">Newest Arrivals</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="rating_desc">Highest Rated</option>
                    </select>
                </div>

                <button
                    onClick={() => {
                        setFilters({
                            category: 'All', minPrice: '', maxPrice: '', rating: '', sort: 'newest', search: ''
                        });
                        router.push('/products');
                    }}
                    className="w-full py-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20"
                >
                    Reset Filters
                </button>
            </div>
        </>
    );
}
