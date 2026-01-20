'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square bg-surface rounded-xl flex items-center justify-center">
                <span className="text-white/20">No image available</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Strip */}
            <div className="flex md:flex-col gap-4 overflow-x-auto no-scrollbar">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`size-20 rounded-lg flex-shrink-0 bg-surface bg-cover bg-center cursor-pointer transition-all ${selectedImage === index
                                ? 'border-2 border-primary opacity-100'
                                : 'border border-primary/10 opacity-60 hover:opacity-100'
                            }`}
                        style={{ backgroundImage: `url('${image}')` }}
                        aria-label={`View image ${index + 1}`}
                    />
                ))}
            </div>

            {/* Main Image */}
            <div
                className="flex-1 aspect-[4/5] rounded-xl bg-surface bg-cover bg-center border border-primary/10 overflow-hidden"
                style={{ backgroundImage: `url('${images[selectedImage]}')` }}
            >
                <img
                    src={images[selectedImage]}
                    alt={productName}
                    className="w-full h-full object-cover opacity-0"
                />
            </div>
        </div>
    );
}
