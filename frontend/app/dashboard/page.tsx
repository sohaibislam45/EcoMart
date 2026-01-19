import { auth } from '@/auth';
import { Package, TrendingUp, ShoppingCart, DollarSign } from 'lucide-react';

export default async function DashboardPage() {
    const session = await auth();
    const role = session?.user?.role || 'user';

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                    Dashboard
                </h1>
                <p className="text-neutral-500 mt-2">
                    Welcome back, {session?.user?.name}! Here's what's happening today.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Orders"
                    value={role === 'admin' ? "1,234" : "12"}
                    icon={<ShoppingCart size={24} />}
                    trend="+12%"
                />
                <StatCard
                    title="Total Spent"
                    value={role === 'admin' ? "$45,678" : "$320.50"}
                    icon={<DollarSign size={24} />}
                    trend="+5%"
                />
                <StatCard
                    title="Active Orders"
                    value={role === 'admin' ? "56" : "2"}
                    icon={<Package size={24} />}
                    color="blue"
                />
                <StatCard
                    title="Eco Impact"
                    value={role === 'admin' ? "500 Trees" : "3 Trees"}
                    icon={<TrendingUp size={24} />}
                    color="green"
                />
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <div className="text-neutral-500 text-sm">
                    No recent activity to show.
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, trend, color = 'primary' }: any) {
    return (
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</p>
                    <h3 className="text-2xl font-bold mt-2 text-neutral-900 dark:text-neutral-100">{value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${color === 'primary' ? 'bg-primary-100 text-primary-600' :
                        color === 'blue' ? 'bg-blue-100 text-blue-600' :
                            'bg-green-100 text-green-600'
                    }`}>
                    {icon}
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 font-medium">{trend}</span>
                    <span className="text-neutral-400 ml-2">from last month</span>
                </div>
            )}
        </div>
    );
}
