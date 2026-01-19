import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const categories = [
    {
        name: 'Reusable Household',
        image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=800',
        count: 24
    },
    {
        name: 'Zero-Waste Personal Care',
        image: 'https://images.unsplash.com/photo-1608248598972-7a544c01d4b9?auto=format&fit=crop&q=80&w=800',
        count: 18
    },
    {
        name: 'Sustainable Kitchen',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800',
        count: 32
    },
    {
        name: 'Eco Lifestyle',
        image: 'https://images.unsplash.com/photo-1544367563-12123d8d5e0a?auto=format&fit=crop&q=80&w=800',
        count: 15
    },
    {
        name: 'Solar & Energy-Saving',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800',
        count: 10
    }
];

export default function Categories() {
    return (
        <section className="py-20 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider uppercase text-sm">
                            Shop by Category
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                            Browse Collections
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={`/products?category=${encodeURIComponent(category.name)}`}
                            className={`group relative overflow-hidden rounded-2xl aspect-[4/3] ${index === 0 ? 'md:col-span-2 md:aspect-[2/1]' : ''}`}
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="text-sm font-medium text-primary-300 mb-1">{category.count} Products</p>
                                <h3 className="text-2xl font-bold font-serif">{category.name}</h3>
                            </div>

                            <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <ArrowUpRight size={20} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
