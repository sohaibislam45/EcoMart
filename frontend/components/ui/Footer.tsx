'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 pt-16 pb-8 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
               <div className="bg-primary-600 p-1.5 rounded-lg text-white">
                <Leaf size={24} />
              </div>
              <span className="font-serif text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                EcoMart
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Your one-stop destination for sustainable, eco-friendly, and ethical products. 
              Join us in making the world a greener place, one purchase at a time.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook size={20} />} />
              <SocialLink href="#" icon={<Twitter size={20} />} />
              <SocialLink href="#" icon={<Instagram size={20} />} />
              <SocialLink href="#" icon={<Linkedin size={20} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/products">Shop All</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/blog">Sustainability Blog</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-neutral-600 dark:text-neutral-400">
                <MapPin size={20} className="mt-1 flex-shrink-0 text-primary-600" />
                <span>123 Green Way, Eco City,<br />Sustainable State 10101</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-600 dark:text-neutral-400">
                <Phone size={20} className="flex-shrink-0 text-primary-600" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-600 dark:text-neutral-400">
                <Mail size={20} className="flex-shrink-0 text-primary-600" />
                <span>hello@ecomart.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Newsletter
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Subscribe to get updates on new products and special offers.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
              />
              <button 
                type="submit"
                className="w-full px-4 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-neutral-500 dark:text-neutral-400">
          <p>&copy; {currentYear} EcoMart. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
