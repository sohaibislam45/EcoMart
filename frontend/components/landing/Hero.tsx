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
        <section className="relative pt-6 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative h-[65vh] min-h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
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

                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
                        <motion.div
                            key={`text-${current}`}
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            className="space-y-6 max-w-4xl"
                        >
                            <span className="inline-block py-1.5 px-4 rounded-full bg-primary-500/20 backdrop-blur-md border border-primary-500/30 text-primary-300 text-sm font-semibold tracking-wider uppercase">
                                Eco-Conscious Selection
                            </span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1]">
                                {slides[current].title}
                            </h1>
                            <p className="text-lg md:text-xl text-neutral-100/90 max-w-2xl mx-auto leading-relaxed">
                                {slides[current].subtitle}
                            </p>
                            <div className="pt-6">
                                <Link
                                    href={slides[current].link}
                                    className="inline-flex items-center space-x-3 bg-white text-primary-700 px-10 py-5 rounded-full font-bold text-lg hover:bg-neutral-100 transition-all transform hover:scale-105 shadow-xl"
                                >
                                    <span>{slides[current].cta}</span>
                                    <ArrowRight size={22} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Controls */}
                    <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${current === index ? 'bg-white w-12' : 'bg-white/40 hover:bg-white/70 w-4'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all hidden md:block border border-white/20"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <button
                        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all hidden md:block border border-white/20"
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>
            </div>
        </section>
    );
}
