'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900 px-4">
            <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-6">
                    <AlertCircle size={32} />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Something went wrong!
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                    We apologize for the inconvenience. Please try again.
                </p>
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className="bg-primary-600 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors shadow-lg"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
