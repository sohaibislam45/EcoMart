'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SlidersHorizontal, X, Search, ChevronRight } from 'lucide-react';

const categories = [
    'Home & Living',
    'Kitchen',
    'Personal Care',
    'Electronics',
    'Fashion',
    'Sustainable Fashion',
    'Sustainable Kitchen'
];

export default function ProductFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    // Initialize state from URL params
    const [filters, setFilters] = useState({
        categories: searchParams.get('category')?.split(',') || [],
        minPrice: searchParams.get('minPrice') || '0',
        maxPrice: searchParams.get('maxPrice') || '500',
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

    const updateFilter = (key: string, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleCategory = (cat: string) => {
        setFilters(prev => {
            const newCats = prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat];
            return { ...prev, categories: newCats };
        });
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (filters.categories.length > 0) params.set('category', filters.categories.join(','));
        if (filters.minPrice && filters.minPrice !== '0') params.set('minPrice', filters.minPrice);
        if (filters.maxPrice && filters.maxPrice !== '500') params.set('maxPrice', filters.maxPrice);
        if (filters.rating) params.set('rating', filters.rating);
        if (filters.sort) params.set('sort', filters.sort);
        if (filters.search) params.set('search', filters.search);

        router.push(`/products?${params.toString()}`);
    };

    const handleApply = () => {
        applyFilters();
        setIsOpen(false);
    };

    return (
        <>
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 bg-forest-dark px-4 py-3 rounded-xl border border-forest-muted w-full text-white"
                >
                    <SlidersHorizontal size={20} />
                    <span>Filters & Sort</span>
                </button>
            </div>

            <div className={`
                lg:block space-y-8
                ${isOpen ? 'fixed inset-0 z-50 bg-background-dark p-6 overflow-y-auto' : 'hidden'}
            `}>
                {isOpen && (
                    <div className="flex justify-between items-center mb-6 lg:hidden">
                        <h2 className="text-xl font-bold text-white">Filters</h2>
                        <button onClick={() => setIsOpen(false)} className="text-white"><X size={24} /></button>
                    </div>
                )}

                {/* Search */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">Search</h3>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search eco-products..."
                            value={filters.search}
                            onChange={(e) => updateFilter('search', e.target.value)}
                            className="w-full bg-forest-dark border-forest-muted focus:border-primary focus:ring-1 focus:ring-primary rounded-xl pl-10 pr-4 py-3 text-sm placeholder:text-white/30 text-white transition-all"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">Categories</h3>
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.categories.includes(cat)}
                                    onChange={() => toggleCategory(cat)}
                                    className="h-5 w-5 rounded border-forest-muted border-2 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0"
                                />
                                <span className="text-white/80 group-hover:text-white transition-colors">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">Price Range</h3>
                        <span className="text-xs text-primary font-bold">${filters.minPrice} - ${filters.maxPrice}</span>
                    </div>
                    <div className="relative h-2 bg-forest-muted rounded-full mt-6">
                        <input
                            type="range"
                            min="0"
                            max="500"
                            value={filters.maxPrice}
                            onChange={(e) => updateFilter('maxPrice', e.target.value)}
                            className="absolute w-full appearance-none bg-transparent pointer-events-auto -top-2"
                        />
                    </div>
                </div>

                {/* Ratings */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">Rating</h3>
                    <div className="space-y-2">
                        {[5, 4, 3].map((r) => (
                            <button
                                key={r}
                                onClick={() => updateFilter('rating', r.toString())}
                                className={`flex items-center gap-2 text-sm transition-all ${filters.rating === r.toString() ? 'text-primary' : 'text-white/70 hover:text-primary'}`}
                            >
                                <div className="flex text-primary">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`material-symbols-outlined text-base ${i < r ? 'filled-star' : ''}`}>star</span>
                                    ))}
                                </div>
                                <span>{r === 5 ? '5.0' : `${r}.0 & up`}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">Sort By</h3>
                    <select
                        value={filters.sort}
                        onChange={(e) => updateFilter('sort', e.target.value)}
                        className="w-full bg-forest-dark border-forest-muted focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm text-white transition-all"
                    >
                        <option value="newest">Newest Arrivals</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="rating_desc">Highest Rated</option>
                    </select>
                </div>

                <div className="space-y-3 pt-4">
                    <button
                        onClick={handleApply}
                        className="w-full bg-primary hover:bg-primary/90 text-background-dark py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/10"
                    >
                        Apply Filters
                    </button>
                    <button
                        onClick={() => {
                            setFilters({
                                categories: [], minPrice: '0', maxPrice: '500', rating: '', sort: 'newest', search: ''
                            });
                            router.push('/products');
                            if (isOpen) setIsOpen(false);
                        }}
                        className="w-full py-3 border border-forest-muted text-white/50 rounded-xl hover:bg-forest-muted transition-all text-sm font-bold"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </>
    );
}
