'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Leaf, Mail, Lock, User, Loader2 } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Passwords do not match',
                confirmButtonColor: '#16a34a',
            });
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Account Created',
                text: 'Please login with your new account.',
                confirmButtonColor: '#16a34a',
            }).then(() => {
                router.push('/login');
            });
        }, 1500);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Right Side - Image order-2 md:order-1 */}
            <div className="hidden md:block relative bg-neutral-100 order-2 md:order-1">
                <div className="absolute inset-0">
                    <img
                        className="h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1471193945509-9adadd0974ce?auto=format&fit=crop&q=80"
                        alt="Nature pattern"
                    />
                    <div className="absolute inset-0 bg-primary-900/40 mix-blend-multiply" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                    <blockquote className="space-y-2">
                        <p className="text-lg font-serif italic">
                            "We don't need a handful of people doing zero waste perfectly. We need millions of people doing it imperfectly."
                        </p>
                        <footer className="text-sm font-medium text-primary-100">— Anne-Marie Bonneau</footer>
                    </blockquote>
                </div>
            </div>

            {/* Left Side - Form order-1 md:order-2 */}
            <div className="flex items-center justify-center p-8 bg-white dark:bg-neutral-900 order-1 md:order-2">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <Link href="/" className="inline-block p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 mb-4 hover:scale-105 transition-transform">
                            <Leaf size={32} />
                        </Link>
                        <h1 className="text-3xl font-bold font-serif text-neutral-900 dark:text-white">
                            Create Account
                        </h1>
                        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                            Join the EcoMart community today
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-neutral-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-shadow"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-neutral-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-shadow"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-neutral-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-shadow"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-neutral-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-shadow"
                                    placeholder="Confirm Password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors shadow-lg shadow-primary-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <span>Create Account</span>}
                        </button>
                    </form>

                    <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
