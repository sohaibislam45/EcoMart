import { auth } from '@/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingBag,
    Settings,
    LogOut,
    PlusCircle,
    Package,
    User as UserIcon,
    Leaf
} from 'lucide-react';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    const role = session.user.role || 'user';

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 hidden md:flex flex-col fixed h-full">
                <div className="p-6 flex items-center space-x-2 border-b border-neutral-200 dark:border-neutral-700">
                    <div className="bg-primary-600 p-1.5 rounded-lg text-white">
                        <Leaf size={20} />
                    </div>
                    <span className="font-serif text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-400 dark:to-primary-200">
                        EcoMart
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <div className="mb-6">
                        <p className="px-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                            Menu
                        </p>
                        <NavLink href="/dashboard" icon={<LayoutDashboard size={20} />}>
                            Overview
                        </NavLink>
                        {role === 'user' && (
                            <>
                                <NavLink href="/dashboard/user/orders" icon={<ShoppingBag size={20} />}>
                                    My Orders
                                </NavLink>
                                <NavLink href="/dashboard/user/profile" icon={<UserIcon size={20} />}>
                                    My Profile
                                </NavLink>
                            </>
                        )}
                        {role === 'admin' && (
                            <>
                                <NavLink href="/dashboard/admin/products" icon={<Package size={20} />}>
                                    All Products
                                </NavLink>
                                <NavLink href="/dashboard/admin/products/add" icon={<PlusCircle size={20} />}>
                                    Add Product
                                </NavLink>
                            </>
                        )}
                    </div>

                    <div>
                        <p className="px-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                            Settings
                        </p>
                        <NavLink href="/dashboard/settings" icon={<Settings size={20} />}>
                            Settings
                        </NavLink>
                    </div>
                </nav>

                <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900/50">
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">
                            {session.user.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                                {session.user.name}
                            </p>
                            <p className="text-xs text-neutral-500 truncate capitalize">
                                {role} Account
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
        >
            {icon}
            <span>{children}</span>
        </Link>
    );
}
