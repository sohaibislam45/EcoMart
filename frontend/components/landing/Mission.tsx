import { TreeDeciduous, Recycle, Droplets } from 'lucide-react';

export default function Mission() {
    const values = [
        {
            icon: <TreeDeciduous size={32} />,
            title: 'Planting Trees',
            description: 'For every purchase, we plant a tree to combat deforestation.'
        },
        {
            icon: <Recycle size={32} />,
            title: 'Zero Waste',
            description: 'All our packaging is 100% plastic-free and biodegradable.'
        },
        {
            icon: <Droplets size={32} />,
            title: 'Clean Water',
            description: 'We donate 1% of profits to clean water initiatives globally.'
        }
    ];

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-primary-900 text-white p-10 md:p-20 rounded-[2.5rem] overflow-hidden relative">
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-800/20 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-800/20 rounded-full blur-3xl -ml-32 -mb-32" />

                    <div className="relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-primary-300 font-semibold tracking-wider uppercase text-sm">
                                Our Mission
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2">
                                Making Sustainability the New Standard
                            </h2>
                            <p className="mt-4 text-primary-100/80 text-lg">
                                We believe that small choices lead to big changes. Our mission is to make eco-friendly living accessible, affordable, and beautiful for everyone.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="bg-primary-800/40 p-8 rounded-3xl border border-primary-700/30 hover:bg-primary-800/60 transition-all duration-300 text-center group">
                                    <div className="inline-flex p-4 rounded-2xl bg-primary-700/50 text-primary-300 mb-6 group-hover:scale-110 transition-transform">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                    <p className="text-primary-100/70">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
