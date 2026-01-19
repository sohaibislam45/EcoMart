'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Leaf, Mail, Lock, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password
            });

            if (result?.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.',
                    confirmButtonColor: '#16a34a',
                    background: '#fff',
                    customClass: {
                        popup: 'dark:bg-neutral-900 dark:text-white',
                    }
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: 'Successfully logged in.',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#fff',
                    customClass: {
                        popup: 'dark:bg-neutral-900 dark:text-white',
                    }
                });
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
                confirmButtonColor: '#16a34a',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = (role: 'user' | 'admin') => {
        setFormData({
            email: role === 'admin' ? 'admin@ecomart.com' : 'user@ecomart.com',
            password: role === 'admin' ? 'admin123' : 'password123'
        });
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8 bg-white dark:bg-neutral-900">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <Link href="/" className="inline-block p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 mb-4 hover:scale-105 transition-transform">
                            <Leaf size={32} />
                        </Link>
                        <h1 className="text-3xl font-bold font-serif text-neutral-900 dark:text-white">
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                            Sign in to continue your sustainable journey
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
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
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors shadow-lg shadow-primary-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <span>Sign In</span>}
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200 dark:border-neutral-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-neutral-900 text-neutral-500">Or continue with demo</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => handleDemoLogin('user')}
                            className="flex items-center justify-center px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-sm font-medium dark:text-neutral-300"
                        >
                            Demo User
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDemoLogin('admin')}
                            className="flex items-center justify-center px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-sm font-medium dark:text-neutral-300"
                        >
                            Demo Admin
                        </button>
                    </div>

                    <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden md:block relative bg-neutral-100">
                <div className="absolute inset-0">
                    <img
                        className="h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80"
                        alt="Sustainable lifestyle"
                    />
                    <div className="absolute inset-0 bg-primary-900/40 mix-blend-multiply" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                    <blockquote className="space-y-2">
                        <p className="text-lg font-serif italic">
                            "The greatest threat to our planet is the belief that someone else will save it."
                        </p>
                        <footer className="text-sm font-medium text-primary-100">— Robert Swan</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}
