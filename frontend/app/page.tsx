import { Suspense } from 'react';
import Hero from '@/components/landing/Hero';
import FeaturedProducts from '@/components/landing/FeaturedProducts';
import Mission from '@/components/landing/Mission';
import Categories from '@/components/landing/Categories';
import { Star, ShieldCheck, Truck, ArrowRight, Leaf, HelpCircle } from 'lucide-react';
import Link from 'next/link';

// Placeholder for FeaturedProducts Skeleton
function FeaturedProductsSkeleton() {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4">
      <div className="h-10 w-48 bg-neutral-200 dark:bg-neutral-800 rounded mb-8 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-[4/5] bg-neutral-200 dark:bg-neutral-800 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <Mission />

      <Categories />

      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      {/* Impact Section */}
      <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-green-400 font-semibold tracking-wider uppercase text-sm">
                Our Guarantee
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2 mb-6 leading-tight">
                Authentically Eco-Friendly, No Greenwashing
              </h2>
              <p className="text-neutral-300 text-lg mb-8">
                We verify every product against strict sustainability criteria. From materials sourcing to end-of-life disposal, we ensure transparency at every step.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Certified Organic', desc: 'Materials sourced from certified organic farms.' },
                  { title: 'Plastic-Free Shipping', desc: 'Orders shipped in compostable or recycled packaging.' },
                  { title: 'Fair Labor Practices', desc: 'Ethical working conditions for all artisans.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="bg-green-500/20 p-2 rounded-lg text-green-400 mt-1">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-neutral-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1591191853878-838622b3967d?auto=format&fit=crop&q=80&w=800"
                  alt="Sustainable lifestyle"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-center space-x-2 text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-neutral-900 dark:text-neutral-100 font-serif italic text-lg">
                  "I love knowing that my purchases are actually helping the planet. EcoMart makes it so easy!"
                </p>
                <div className="mt-4 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-neutral-200 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" alt="Sarah J." />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">Sarah Jenkins</p>
                    <p className="text-xs text-neutral-500">Verified Buyer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20 bg-primary-50 dark:bg-primary-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider uppercase text-sm">
            Nature's Best
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-2 mb-12">
            Materials We Love
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Organic Cotton', img: 'https://images.unsplash.com/photo-1594892437618-971c26f0490f?auto=format&fit=crop&q=80&w=300' },
              { name: 'Bamboo', img: 'https://images.unsplash.com/photo-1621876077302-3caff4b2484f?auto=format&fit=crop&q=80&w=300' },
              { name: 'Recycled Glass', img: 'https://images.unsplash.com/photo-1516968022630-36a461b4db1b?auto=format&fit=crop&q=80&w=300' },
              { name: 'Cork', img: 'https://images.unsplash.com/photo-1624637233634-118e6e890c42?auto=format&fit=crop&q=80&w=300' }
            ].map((mat, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 mx-auto max-w-[200px] group-hover:scale-105 transition-transform">
                  <img src={mat.img} alt={mat.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">{mat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: 'Is packaging plastic-free?', a: 'Yes! We use 100% compostable mailers and recycled paper boxes.' },
              { q: 'Do you ship internationally?', a: 'Currently we ship to US, Canada, and UK with carbon-neutral shipping partners.' },
              { q: 'What is your return policy?', a: 'We offer a 30-day happiness guarantee. If you are not satisfied, return it for free.' }
            ].map((faq, i) => (
              <details key={i} className="group bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-medium text-neutral-900 dark:text-neutral-100">
                  <h3 className="text-lg">{faq.q}</h3>
                  <span className="shrink-0 rounded-full bg-white dark:bg-neutral-800 p-1.5 text-neutral-900 dark:text-white sm:p-3 group-open:-rotate-180 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-600 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary-600/20">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-700/50 rounded-full blur-3xl -ml-48 -mb-48" />

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                Ready to Start Your <br /> Eco Journey?
              </h2>
              <p className="text-xl text-primary-50/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of others who are making a difference, one sustainable swap at a time.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center space-x-3 bg-white text-primary-700 px-12 py-5 rounded-full font-bold text-xl hover:bg-neutral-50 transition-all transform hover:scale-105 shadow-xl"
              >
                <span>Browse Products</span>
                <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
