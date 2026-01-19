export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                <p className="text-neutral-500 font-medium animate-pulse">Loading EcoMart...</p>
            </div>
        </div>
    );
}
