'use client';

import React, { useEffect, useMemo, useState } from 'react';
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

// ✅ Lazy-load Recharts (prevents SSR hydration errors)
const ResponsiveContainer = dynamic(() => import('recharts').then(m => m.ResponsiveContainer), { ssr: false });
const AreaChart = dynamic(() => import('recharts').then(m => m.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(m => m.Area), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(m => m.CartesianGrid), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(m => m.XAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(m => m.Tooltip), { ssr: false });
const BarChart = dynamic(() => import('recharts').then(m => m.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(m => m.Bar), { ssr: false });

// 🔹 Status helper (kept concise)
const getStatusConfig = (status: string) => {
  const configs: Record<string, { className: string; icon: any }> = {
    Ready: { className: 'bg-green-500 text-white', icon: CheckCircle },
    Pending: { className: 'bg-gray-200 text-gray-800', icon: Clock },
    'In Progress': { className: 'bg-purple-200 text-purple-800', icon: RefreshCw },
  };
  return configs[status] || { className: 'bg-muted text-muted-foreground', icon: ClipboardList };
};

export default function TailorDashboard() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [earningsData, setEarningsData] = useState<{ month: string; earnings: number }[]>([]);
  const [serviceData, setServiceData] = useState<{ service: string; orders: number }[]>([]);
  const [earningsGrowth, setEarningsGrowth] = useState(0);
  const [isChartReady, setIsChartReady] = useState(false);

  // ✅ Initialize once
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
    const chartDelay = setTimeout(() => setIsChartReady(true), 300);
    return () => clearTimeout(chartDelay);
  }, []);

  // ✅ Simulate live order feed
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

      setRecentOrders(prev => [newOrder, ...prev.slice(0, 4)]);
      setEarningsGrowth(prev => Math.max(0, Number((prev + (Math.random() * 4 - 2)).toFixed(1))));

      toast({
        title: '🧵 New Order Received!',
        description: `Order ${newOrder.orderId} from ${newOrder.customer} for ₹${newOrder.amount}`,
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [toast]);

  // ✅ Compute summary stats
  const totalEarnings = useMemo(() => {
    return earningsData.reduce((acc, curr) => acc + curr.earnings, 0);
  }, [earningsData]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
        {t('Tailor Dashboard')}
      </h1>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title={t("Total Earnings")}
          icon={DollarSign}
          value={`₹${totalEarnings.toLocaleString()}`}
          growth={earningsGrowth}
        />
        <SummaryCard
          title={t("Active Orders")}
          icon={ClipboardList}
          value={recentOrders.length.toString()}
          sub={t("Active")}
        />
        <SummaryCard
          title={t("Total Customers")}
          icon={Users}
          value="132"
          sub={t("+8 this month")}
        />
        <SummaryCard
          title={t("Fittings Scheduled")}
          icon={Calendar}
          value="6"
          sub={t("2 completed")}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Earnings Overview */}
        <Card className="lg:col-span-2 shadow-glow">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
              {t('Earnings Overview')}
            </CardTitle>
            <CardDescription>{t('Track your monthly income trends')}</CardDescription>
          </CardHeader>
          <CardContent>
            {isChartReady ? (
              <div className="h-[300px]">
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
                      formatter={(v: number) => [`₹${v.toLocaleString()}`, 'Earnings']}
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

        {/* Service Analytics */}
        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500 animate-text-rainbow">
              {t('Top Services')}
            </CardTitle>
            <CardDescription>{t('Most requested tailoring categories')}</CardDescription>
          </CardHeader>
          <CardContent>
            {isChartReady ? (
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

      {/* Recent Orders + Feedback */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-glow">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
              {t('Recent Orders')}
            </CardTitle>
            <CardDescription>{t('Latest tailoring orders')}</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {recentOrders.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('Customer')}</TableHead>
                    <TableHead>{t('Amount')}</TableHead>
                    <TableHead>{t('Status')}</TableHead>
                    <TableHead>{t('Due Date')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map(order => {
                    const { className } = getStatusConfig(order.status);
                    return (
                      <TableRow key={order.orderId}>
                        <TableCell>
                          <div className="font-medium flex items-center">
                            {order.customer}
                            {order.isPriority && <Star className="h-4 w-4 ml-1 text-yellow-500 fill-yellow-500" />}
                          </div>
                          <div className="text-xs text-muted-foreground">{order.orderId}</div>
                        </TableCell>
                        <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={className}>
                            {t(order.status as any)}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.dueDate}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-sm text-muted-foreground">No orders yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Customer Satisfaction */}
        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-500 animate-text-rainbow">
              {t('Customer Satisfaction')}
            </CardTitle>
            <CardDescription>{t('Based on recent feedback')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium">Average Rating</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Positive Reviews</p>
                <Progress value={93} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-1">93% happy customers</p>
              </div>
              <div>
                <p className="text-sm font-medium">On-Time Delivery</p>
                <Progress value={88} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-1">88% orders on time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-xl"
        size="icon"
        onClick={() =>
          toast({
            title: '✨ Add Order',
            description: 'The order creation form is coming soon!',
          })
        }
      >
        <Plus className="h-8 w-8" />
      </Button>
    </div>
  );
}

// ✅ Summary Card Component
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
    <Card className="shadow-glow hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {typeof growth === 'number' ? (
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
