'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { AreaChart, Area, CartesianGrid, XAxis, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/translation-provider';
import { useToast } from '@/hooks/use-toast';

// 🌟 Improved Initial Data
const initialRecentOrders = [
  {
    orderId: 'ORD002',
    customer: 'Priya Patel',
    amount: 2500,
    status: 'Ready',
    dueDate: '2024-08-12',
    isPriority: true,
  },
  {
    orderId: 'ORD004',
    customer: 'Sneha Reddy',
    amount: 3200,
    status: 'Pending',
    dueDate: '2024-08-20',
    isPriority: true,
  },
  {
    orderId: 'ORD007',
    customer: 'Rohan Sharma',
    amount: 1500,
    status: 'In Progress',
    dueDate: '2024-08-15',
    isPriority: false,
  },
];

// 📈 Mock Earnings Data (dynamic trend simulation)
const baseEarnings = [
  { month: 'Jun', earnings: 28000 },
  { month: 'Jul', earnings: 31000 },
  { month: 'Aug', earnings: 34000 },
  { month: 'Sep', earnings: 37000 },
  { month: 'Oct', earnings: 42000 },
  { month: 'Nov', earnings: 48000 },
];

// 🎨 Status Badge Styling
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
  const [recentOrders, setRecentOrders] = useState(initialRecentOrders);
  const [earningsData, setEarningsData] = useState(baseEarnings);
  const [earningsGrowth, setEarningsGrowth] = useState(0);

  // 🔹 Simulate Live Earnings Growth
  useEffect(() => {
    const interval = setInterval(() => {
      setEarningsData((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        const randomGrowth = (Math.random() * 0.08 - 0.02) * last.earnings; // -2% to +6%
        const newEarning = Math.round(last.earnings + randomGrowth);
        updated.shift();
        updated.push({
          month: new Date().toLocaleString('default', { month: 'short' }),
          earnings: newEarning,
        });
        setEarningsGrowth(((newEarning - last.earnings) / last.earnings) * 100);
        return updated;
      });
    }, 10000); // update every 10s
    return () => clearInterval(interval);
  }, []);

  // 🔹 Simulate New Orders (every 15 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const id = `ORD${Math.floor(Math.random() * 900) + 100}`;
      const names = ['Kavita Rao', 'Rohit Mehta', 'Ananya Kapoor', 'Sahil Gupta'];
      const newOrder = {
        orderId: id,
        customer: names[Math.floor(Math.random() * names.length)],
        amount: Math.floor(Math.random() * 2500) + 1000,
        status: ['Pending', 'In Progress', 'Ready'][Math.floor(Math.random() * 3)],
        dueDate: new Date(Date.now() + Math.random() * 7 * 86400000)
          .toISOString()
          .split('T')[0],
        isPriority: Math.random() > 0.7,
      };
      setRecentOrders((prev) => [newOrder, ...prev.slice(0, 4)]);
      toast({
        title: '🧵 ' + t('New Order Received!'),
        description: `${t('Order')} ${id} ${t('from')} ${newOrder.customer} ${t('for')} ₹${newOrder.amount}`,
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [t, toast]);

  const totalEarnings = useMemo(
    () => earningsData.reduce((sum, d) => sum + d.earnings, 0),
    [earningsData]
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* 🔹 Header */}
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
        {t('Tailor Dashboard')}
      </h1>

      {/* 🔹 Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title={t("Total Earnings")}
          icon={DollarSign}
          value={`₹${totalEarnings.toLocaleString()}`}
          growth={earningsGrowth}
        />
        <SummaryCard title={t('Active Orders')} icon={ClipboardList} value={recentOrders.length.toString()} sub={t('Active')} />
        <SummaryCard title={t('New Customers')} icon={Users} value="34" sub={t('Added this month')} />
        <SummaryCard title={t('Upcoming Fittings')} icon={Calendar} value="6" sub={t('2 completed')} />
      </div>

      {/* 🔹 Charts + Orders */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Earnings Chart */}
        <Card className="lg:col-span-3 shadow-glow">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
              {t('Earnings Overview')}
            </CardTitle>
            <CardDescription>{t('Your earnings over the last few months.')}</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer
              config={{
                earnings: {
                  label: t('Earnings'),
                  color: 'hsl(var(--primary))',
                },
              }}
              className="h-[250px] w-full"
            >
              <AreaChart
                data={earningsData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <Tooltip
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      labelFormatter={(v) => `${v}`}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorEarnings)"
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="lg:col-span-2 shadow-glow">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
              {t('Recent Orders')}
            </CardTitle>
            <CardDescription>{t('Your latest tailoring requests')}</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
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
                {recentOrders.map((order) => {
                  const { className } = getStatusConfig(order.status);
                  return (
                    <TableRow
                      key={order.orderId}
                      className="hover:bg-muted/40 transition"
                    >
                      <TableCell>
                        <div className="font-medium flex items-center">
                          {order.customer}
                          {order.isPriority && (
                            <Star className="h-4 w-4 ml-1 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {order.orderId}
                        </div>
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
          </CardContent>
        </Card>
      </div>

      {/* Floating Action */}
      <Button
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg"
        size="icon"
        onClick={() =>
          toast({
            title: t('✨ Add Order'),
            description: t('New order creation feature coming soon!'),
          })
        }
      >
        <Plus className="h-8 w-8" />
      </Button>
    </div>
  );
}

// 🧩 Summary Card Component
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
            {growth >= 0
              ? `+${growth.toFixed(1)}%`
              : `${growth.toFixed(1)}%`} growth
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">{sub}</p>
        )}
      </CardContent>
    </Card>
  );
}
