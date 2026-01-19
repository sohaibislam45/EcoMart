'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Upload, Plus, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function AddProductPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Reusable Household',
        image: '',
        ecoRating: 5,
        stock: 10
    });

    if (session?.user?.role !== 'admin') {
        // Optional: redirect non-admins
        // But middleware handles this usually, or we show Access Denied
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    images: [formData.image || 'https://images.unsplash.com/photo-1602143407151-01114192003f'], // Use placeholder if empty
                }),
            });

            if (!res.ok) throw new Error('Failed to create product');

            Swal.fire({
                icon: 'success',
                title: 'Product Added',
                text: 'New product has been successfully created.',
                confirmButtonColor: '#16a34a',
            }).then(() => {
                router.push('/dashboard/admin/products');
                router.refresh();
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add product. Please try again.',
                confirmButtonColor: '#16a34a',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-8">
                Add New Product
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-neutral-800 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Product Name</label>
                        <input
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
                            placeholder="e.g. Bamboo T-Shirt"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            required
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
                            placeholder="Detailed description..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Price ($)</label>
                            <input
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Stock</label>
                            <input
                                name="stock"
                                type="number"
                                min="0"
                                required
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
                                placeholder="10"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
                        >
                            <option>Reusable Household</option>
                            <option>Zero-Waste Personal Care</option>
                            <option>Sustainable Kitchen</option>
                            <option>Eco Lifestyle</option>
                            <option>Solar & Energy-Saving</option>
                            <option>Sustainable Fashion</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <div className="flex space-x-2">
                            <input
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
                                placeholder="https://..."
                            />
                            <button
                                type="button"
                                className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg whitespace-nowrap"
                                onClick={() => setFormData(prev => ({ ...prev, image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80' }))}
                            >
                                Use Demo
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Eco Rating (1-5)</label>
                        <input
                            name="ecoRating"
                            type="number"
                            min="1"
                            max="5"
                            step="0.1"
                            value={formData.ecoRating}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
                            placeholder="4.5"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <> <Plus size={20} /> <span>Add Product</span> </>}
                </button>
            </form>
        </div>
    );
}
