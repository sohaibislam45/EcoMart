import Link from 'next/link';
import { getApiUrl } from '@/lib/api-url';
import { ChevronRight, Star, ShoppingBag, Heart, Minus, Plus } from 'lucide-react';
import ImageGallery from '@/components/products/ImageGallery';
import ProductTabs from '@/components/products/ProductTabs';
import ReviewsSection from '@/components/products/ReviewsSection';
import RelatedProducts from '@/components/products/RelatedProducts';

async function getProduct(id: string) {
    try {
        const res = await fetch(getApiUrl(`/products/${id}`), {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        return null;
    }
}

async function getRelatedProducts(category: string, currentId: string) {
    try {
        const res = await fetch(getApiUrl(`/products?category=${category}`), {
            cache: 'no-store'
        });
        if (!res.ok) return [];
        const products = await res.json();
        return products.filter((p: any) => p._id !== currentId).slice(0, 8);
    } catch (error) {
        return [];
    }
}

export default async function ProductDetailsPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const product = await getProduct(params.id);

    if (!product) {
        return (
            <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center space-y-4">
                <h2 className="text-2xl font-bold text-white">Product not found</h2>
                <Link href="/products" className="text-primary hover:underline">
                    Back to Products
                </Link>
            </div>
        );
    }

    const relatedProducts = await getRelatedProducts(product.category, product._id);

    // Mock reviews data (in production, this would come from the backend)
    const mockReviews = [
        {
            id: '1',
            userName: 'Marcus S.',
            rating: 5,
            comment: 'Surprisingly sturdy! I was worried they would feel flimsy, but they\'re quite solid. The carrying pouch is a nice touch for travel.',
            date: '2 weeks ago',
            verified: true
        },
        {
            id: '2',
            userName: 'Elena L.',
            rating: 4,
            comment: 'Beautiful aesthetic and weight. I\'ve been using them for a month and they hold up well in the dishwasher. Love the mission.',
            date: '1 month ago',
            verified: true
        }
    ];

    const specifications = {
        'Material': product.materials?.join(', ') || '100% Organic Materials',
        'Weight': '115 grams',
        'Dimensions': '20cm x 5cm x 2cm',
        'Care': 'Hand wash recommended',
        'Origin': 'Ethically sourced',
        'Certifications': 'BPA Free, FDA Approved'
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-white">
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight size={12} className="text-white/30" />
                    <Link href="/products" className="hover:text-primary transition-colors">
                        {product.category}
                    </Link>
                    <ChevronRight size={12} className="text-white/30" />
                    <span className="text-white font-medium">{product.name}</span>
                </nav>

                {/* Product Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                    {/* Left: Image Gallery */}
                    <div className="lg:col-span-7">
                        <ImageGallery images={product.images} productName={product.name} />
                    </div>

                    {/* Right: Product Details */}
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                                Premium Eco-Line
                            </span>
                            <div className="flex items-center gap-1 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        fill={i < Math.floor(product.ecoRating) ? 'currentColor' : 'none'}
                                        className={i < Math.floor(product.ecoRating) ? 'fill-amber-500' : 'text-amber-500/30'}
                                    />
                                ))}
                                <span className="text-xs text-white/40 ml-1 font-medium">
                                    ({product.reviewsCount || 128} Reviews)
                                </span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-lg text-white/40 line-through font-medium">
                                        ${product.originalPrice.toFixed(2)}
                                    </span>
                                    <span className="text-xs font-bold bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded">
                                        SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="text-white/70 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Stock Status */}
                        {product.stock <= 5 && product.stock > 0 && (
                            <div className="flex items-center gap-2 mb-8 p-3 bg-orange-500/5 border border-orange-500/20 rounded-lg">
                                <span className="text-orange-500">⚠️</span>
                                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wide">
                                    Low Stock - Only {product.stock} left in our warehouse!
                                </span>
                            </div>
                        )}

                        {product.stock > 5 && (
                            <div className="flex items-center gap-2 mb-8 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                                <span className="text-green-500">✓</span>
                                <span className="text-sm font-semibold text-green-500 uppercase tracking-wide">
                                    In Stock - Ready to ship
                                </span>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="space-y-6 mb-10">
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-widest text-white/40 mb-3">
                                    Quantity
                                </label>
                                <div className="flex items-center w-32 border border-primary/20 rounded-lg overflow-hidden">
                                    <button className="w-10 h-10 flex items-center justify-center hover:bg-primary/10 transition-colors">
                                        <Minus size={16} />
                                    </button>
                                    <div className="flex-1 text-center font-bold">1</div>
                                    <button className="w-10 h-10 flex items-center justify-center hover:bg-primary/10 transition-colors">
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Actions */}
                        <div className="flex gap-4 mb-8">
                            <button className="flex-1 bg-primary hover:bg-primary/90 text-white h-14 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-transform active:scale-95 shadow-lg shadow-primary/20">
                                <ShoppingBag size={22} />
                                Add to Cart
                            </button>
                            <button className="w-14 h-14 border border-primary/20 rounded-xl flex items-center justify-center hover:bg-primary/10 transition-all text-white/40 hover:text-red-500 group">
                                <Heart size={22} className="transition-transform group-hover:scale-110" />
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-primary/10">
                                <span className="text-primary text-xl">♻️</span>
                                <span className="text-xs font-bold uppercase tracking-tighter">100% Recyclable</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-primary/10">
                                <span className="text-primary text-xl">🛡️</span>
                                <span className="text-xs font-bold uppercase tracking-tighter">BPA Free</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Information Tabs Section */}
                <ProductTabs
                    description={product.description}
                    materials={product.materials}
                    specifications={specifications}
                    sustainabilityImpact={product.sustainabilityImpact}
                />

                {/* Reviews Section */}
                <ReviewsSection
                    averageRating={product.ecoRating}
                    totalReviews={product.reviewsCount || 128}
                    reviews={mockReviews}
                />

                {/* Related Products */}
                <RelatedProducts products={relatedProducts} />
            </main>
        </div>
    );
}
