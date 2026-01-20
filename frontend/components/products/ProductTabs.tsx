'use client';

import { useState } from 'react';

interface ProductTabsProps {
    description: string;
    materials?: string[];
    specifications?: { [key: string]: string };
    sustainabilityImpact?: string;
}

export default function ProductTabs({
    description,
    materials,
    specifications,
    sustainabilityImpact
}: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'sustainability'>('description');

    return (
        <div className="mb-16">
            {/* Tab Navigation */}
            <div className="flex border-b border-primary/10 mb-8 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setActiveTab('description')}
                    className={`px-8 py-4 font-bold whitespace-nowrap transition-colors ${activeTab === 'description'
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-white/40 hover:text-white/70'
                        }`}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab('specifications')}
                    className={`px-8 py-4 font-bold whitespace-nowrap transition-colors ${activeTab === 'specifications'
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-white/40 hover:text-white/70'
                        }`}
                >
                    Specifications
                </button>
                <button
                    onClick={() => setActiveTab('sustainability')}
                    className={`px-8 py-4 font-bold whitespace-nowrap transition-colors ${activeTab === 'sustainability'
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-white/40 hover:text-white/70'
                        }`}
                >
                    Sustainability Impact
                </button>
            </div>

            {/* Tab Content */}
            <div className="grid lg:grid-cols-2 gap-12">
                {activeTab === 'description' && (
                    <>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white">Product Details</h3>
                            <p className="text-white/70 leading-relaxed">{description}</p>
                            {materials && materials.length > 0 && (
                                <ul className="space-y-4">
                                    {materials.map((material, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-primary text-sm mt-1">✓</span>
                                            <span className="text-sm text-white/70">{material}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="bg-surface p-8 rounded-2xl border border-primary/10">
                            <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-6">
                                What's Included
                            </h4>
                            <div className="space-y-4 text-sm text-white/70">
                                <p>• Product as described</p>
                                <p>• Eco-friendly packaging</p>
                                <p>• Care instructions</p>
                                <p>• 30-day satisfaction guarantee</p>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'specifications' && (
                    <div className="lg:col-span-2">
                        <div className="bg-surface p-8 rounded-2xl border border-primary/10 max-w-3xl">
                            <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-6">
                                Technical Specifications
                            </h4>
                            <div className="space-y-4">
                                {specifications && Object.entries(specifications).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center py-2 border-b border-primary/5">
                                        <span className="text-white/40 text-sm">{key}</span>
                                        <span className="text-white font-medium text-sm">{value}</span>
                                    </div>
                                ))}
                                {(!specifications || Object.keys(specifications).length === 0) && (
                                    <p className="text-white/40 text-sm">No specifications available</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'sustainability' && (
                    <div className="lg:col-span-2">
                        <div className="space-y-6 max-w-3xl">
                            <h3 className="text-2xl font-bold text-white">Environmental Impact</h3>
                            <p className="text-white/70 leading-relaxed">
                                {sustainabilityImpact ||
                                    'This product is designed with sustainability in mind, using eco-friendly materials and ethical manufacturing processes to minimize environmental impact.'}
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 mt-8">
                                <div className="bg-surface p-6 rounded-xl border border-primary/10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-primary text-2xl">♻️</span>
                                        <h4 className="font-bold text-white">Recyclable</h4>
                                    </div>
                                    <p className="text-sm text-white/60">100% recyclable materials used</p>
                                </div>
                                <div className="bg-surface p-6 rounded-xl border border-primary/10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-primary text-2xl">🌱</span>
                                        <h4 className="font-bold text-white">Sustainable</h4>
                                    </div>
                                    <p className="text-sm text-white/60">Ethically sourced materials</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
