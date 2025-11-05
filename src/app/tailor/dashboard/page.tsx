'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  DollarSign,
  Users,
  Calendar,
  ClipboardList,
  CheckCircle,
  RefreshCw,
  Clock,
  Plus,
  Star,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { useTranslation } from '@/context/translation-provider';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

// ✅ Dynamic Recharts imports — absolutely required to prevent SSR
const ResponsiveContainer = dynamic(() => import('recharts').then((m) => m.ResponsiveContainer), { ssr: false });
const AreaChart = dynamic(() => import('recharts').then((m) => m.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then((m) => m.Area), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then((m) => m.CartesianGrid), { ssr: false });
const XAxis = dynamic(() => import('recharts').then((m) => m.XAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then((m) => m.Tooltip), { ssr: false });
const BarChart = dynamic(() => import('recharts').then((m) => m.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then((m) => m.Bar), { ssr: false });

// 🔹 Status helper
const getStatusConfig = (status: string) => {
  switch (status) {
    case 'Ready':
      return { className: 'bg-green-500 text-white', icon: CheckCircle };
    case 'Pending':
      return { className: 'bg-gray-200 text-gray-800', icon: Clock };
    case 'In Progress':
      return { className: 'bg-purple-200 text-purple-800', icon: RefreshCw };
    default:
      return { className: 'bg-muted text-muted-foreground', icon: ClipboardList };
  }
};

export default function TailorDashboard() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [earningsData, setEarningsData] = useState<{ month: string; earnings: number }[]>([]);
  const [serviceData, setServiceData] = useState<{ service: string; orders: number }[]>([]);
  const [earningsGrowth, setEarningsGrowth] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // ✅ Fix: Mark as hydrated once client mounts
  useEffect(() => {
    const handleHydrate = () => setIsHydrated(true);
    handleHydrate();

    // Force a re-render when resized (helps Recharts fit container)
    window.addEventListener('resize', handleHydrate);
    return () => window.removeEventListener('resize', handleHydrate);
  }, []);

  // ✅ Initialize mock data
  useEffect(() => {
    setEarningsData([
      { month: 'Jul', earnings: 19000 },
      { month: 'Aug', earnings: 21000 },
      { month: 'Sep', earnings: 26000 },
      { month: 'Oct', earnings: 31000 },
      { month: 'Nov', earnings: 37000 },
    ]);

    setServiceData([
      { service: 'Custom Suits', orders: 48 },
      { service: 'Alterations', orders: 36 },
      { service: 'Wedding Attire', orders: 25 },
      { service: 'Repairs', orders: 19 },
      { service: 'Casual Shirts', orders: 15 },
    ]);

    setRecentOrders([
      { orderId: 'ORD1023', customer: 'Aman Verma', amount: 2300, status: 'Ready', dueDate: '2025-11-10', isPriority: true },
      { orderId: 'ORD1024', customer: 'Priya Singh', amount: 1500, status: 'In Progress', dueDate: '2025-11-11', isPriority: false },
      { orderId: 'ORD1025', customer: 'Rahul Mehta', amount: 3000, status: 'Pending', dueDate: '2025-11-13', isPriority: true },
    ]);

    setEarningsGrowth(15.4);
  }, []);

  // ✅ Simulate live order updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newOrder = {
        orderId: `ORD${Math.floor(Math.random() * 9000 + 1000)}`,
        customer: ['Kavita', 'Manoj', 'Sneha'][Math.floor(Math.random() * 3)],
        amount: Math.floor(Math.random() * 3000) + 1000,
        status: ['Pending', 'In Progress', 'Ready'][Math.floor(Math.random() * 3)],
        dueDate: new Date(Date.now() + Math.random() * 5 * 86400000).toISOString().split('T')[0],
        isPriority: Math.random() > 0.6,
      };

      setRecentOrders((prev) => [newOrder, ...prev.slice(0, 4)]);
      setEarningsGrowth((prev) => Math.max(0, prev + (Math.random() * 4 - 2)));

      toast({
        title: '🧵 New Order Received!',
        description: `Order ${newOrder.orderId} from ${newOrder.customer} for ₹${newOrder.amount}`,
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
        {t('Tailor Dashboard')}
      </h1>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Today's Earnings" icon={DollarSign} value="₹8,920" growth={earningsGrowth} />
        <SummaryCard title="Active Orders" icon={ClipboardList} value={recentOrders.length.toString()} sub="Active" />
        <SummaryCard title="Total Customers" icon={Users} value="132" sub="+8 this month" />
        <SummaryCard title="Fittings Scheduled" icon={Calendar} value="6" sub="2 completed" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Earnings Chart */}
        <Card className="lg:col-span-2 shadow-glow">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
              {t('Earnings Overview')}
            </CardTitle>
            <CardDescription>{t('Track your monthly income trends')}</CardDescription>
          </CardHeader>
          <CardContent>
            {isHydrated ? (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={earningsData}>
                    <defs>
                      <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                      }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Earnings']}
                    />
                    <Area type="monotone" dataKey="earnings" stroke="#14b8a6" fill="url(#earnGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-sm text-muted-foreground">Loading chart...</p>
            )}
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500 animate-text-rainbow">
              {t('Top Services')}
            </CardTitle>
            <CardDescription>{t('Most requested tailoring categories')}</CardDescription>
          </CardHeader>
          <CardContent>
            {isHydrated ? (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="service" tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                      }}
                      formatter={(v: number) => [`${v} orders`, 'Service']}
                    />
                    <Bar dataKey="orders" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-sm text-muted-foreground">Loading chart...</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Floating Add Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg"
        size="icon"
        onClick={() =>
          toast({
            title: 'Add Order',
            description: 'New order creation feature coming soon!',
          })
        }
      >
        <Plus className="h-8 w-8" />
      </Button>
    </div>
  );
}

// ✅ Summary Card
function SummaryCard({
  title,
  value,
  icon: Icon,
  sub,
  growth,
}: {
  title: string;
  value: string;
  icon: any;
  sub?: string;
  growth?: number;
}) {
  return (
    <Card className="shadow-glow hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {growth !== undefined ? (
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            {growth >= 0 ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            {growth >= 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`} growth
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">{sub}</p>
        )}
      </CardContent>
    </Card>
  );
}
