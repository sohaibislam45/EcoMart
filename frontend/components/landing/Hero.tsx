'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920',
        title: 'Sustainable Living Made Simple',
        subtitle: 'Discover eco-friendly products that reduce your carbon footprint without compromising on quality.',
        cta: 'Shop Now',
        link: '/products'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1621451959842-a6369dc183d2?auto=format&fit=crop&q=80&w=1920',
        title: 'Zero Waste, Max Impact',
        subtitle: 'Join the movement towards a plastic-free future with our curated collection of reusable essentials.',
        cta: 'Explore Collection',
        link: '/products?category=Zero-Waste%20Personal%20Care'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=1920',
        title: 'Nature-Inspired Design',
        subtitle: 'Beautiful, functional, and ethical. Bring the serenity of nature into your home.',
        cta: 'view catalog',
        link: '/products?category=Eco%20Lifestyle'
    }
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const slideVariants = {
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0 }
    };

    const textVariants = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } },
    };

    return (
        <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={current}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    />
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    key={`text-${current}`}
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    className="space-y-6"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/30 text-green-300 text-sm font-semibold tracking-wider uppercase">
                        Sustainability First
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight">
                        {slides[current].title}
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto">
                        {slides[current].subtitle}
                    </p>
                    <div className="pt-4">
                        <Link
                            href={slides[current].link}
                            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-primary-600/30"
                        >
                            <span>{slides[current].cta}</span>
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all ${current === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>

            <button
                onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition-colors hidden md:block"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition-colors hidden md:block"
            >
                <ChevronRight size={32} />
            </button>
        </section>
    );
}
