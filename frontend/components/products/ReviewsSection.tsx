'use client';

import { Star } from 'lucide-react';

interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    verified: boolean;
}

interface ReviewsSectionProps {
    averageRating: number;
    totalReviews: number;
    reviews?: Review[];
    ratingDistribution?: { [key: number]: number };
}

export default function ReviewsSection({
    averageRating,
    totalReviews,
    reviews = [],
    ratingDistribution = { 5: 85, 4: 10, 3: 5, 2: 0, 1: 0 }
}: ReviewsSectionProps) {
    const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
        const sizeClass = size === 'sm' ? 12 : 16;
        return (
            <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={sizeClass}
                        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                        className={i < Math.floor(rating) ? 'fill-amber-500' : 'text-amber-500/30'}
                    />
                ))}
            </div>
        );
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="mb-20">
            <h2 className="text-3xl font-black text-white mb-8">Community Feedback</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Average Rating Card */}
                <div className="md:col-span-1 bg-primary/10 border border-primary/20 p-6 rounded-2xl flex flex-col justify-center items-center text-center">
                    <span className="text-5xl font-black text-primary mb-2">{averageRating.toFixed(1)}</span>
                    {renderStars(averageRating, 'md')}
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest mt-2">
                        Average Rating
                    </span>
                    <span className="text-xs text-white/60 mt-1">({totalReviews} reviews)</span>
                </div>

                {/* Rating Distribution */}
                <div className="md:col-span-3 bg-surface border border-primary/5 p-6 rounded-2xl flex flex-col justify-center">
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map(rating => (
                            <div key={rating} className="flex items-center gap-4">
                                <span className="text-xs font-bold w-4 text-white">{rating}</span>
                                <div className="flex-1 h-2 bg-background-dark rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all"
                                        style={{ width: `${ratingDistribution[rating] || 0}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-white/50 w-8">
                                    {ratingDistribution[rating] || 0}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Individual Reviews */}
                {reviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="md:col-span-2 bg-surface p-6 rounded-2xl border border-primary/5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                    {getInitials(review.userName)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{review.userName}</p>
                                    {review.verified && (
                                        <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">
                                            Verified Buyer
                                        </p>
                                    )}
                                </div>
                            </div>
                            {renderStars(review.rating)}
                        </div>
                        <p className="text-sm text-white/70 italic">"{review.comment}"</p>
                        <p className="text-xs text-white/40 mt-3">{review.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
