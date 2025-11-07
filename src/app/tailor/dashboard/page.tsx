
'use client';

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
  Star
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { AreaChart, Area, CartesianGrid, XAxis, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/translation-provider';
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

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

const earningsData = [
    { month: 'Jan', earnings: 18000 },
    { month: 'Feb', earnings: 22000 },
    { month: 'Mar', earnings: 19000 },
    { month: 'Apr', earnings: 25000 },
    { month: 'May', earnings: 23000 },
    { month: 'Jun', earnings: 28000 },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'Ready':
      return { variant: 'default' as const, icon: CheckCircle, className: 'bg-green-500 text-white' };
    case 'Pending':
      return { variant: 'secondary' as const, icon: Clock, className: 'bg-gray-200 text-gray-800' };
    case 'In Progress':
      return { variant: 'secondary' as const, icon: RefreshCw, className: 'bg-purple-200 text-purple-800' };
    default:
      return { variant: 'outline' as const, icon: ClipboardList };
  }
};

export default function TailorDashboard() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [recentOrders, setRecentOrders] = useState(initialRecentOrders);

  useEffect(() => {
    // Simulate receiving a new order every 15 seconds
    const intervalId = setInterval(() => {
      const newOrderId = `ORD0${Math.floor(Math.random() * 90) + 10}`;
      const newCustomer = ['Alice Johnson', 'Bob Williams', 'Charlie Brown'][Math.floor(Math.random() * 3)];
      const newAmount = Math.floor(Math.random() * 2000) + 1000;
      
      const newOrder = {
        orderId: newOrderId,
        customer: newCustomer,
        amount: newAmount,
        status: 'Pending',
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isPriority: Math.random() > 0.7,
      };

      setRecentOrders(prevOrders => [newOrder, ...prevOrders.slice(0, 4)]);
      
      toast({
        title: t('New Order Received!'),
        description: `${t('Order')} ${newOrderId} ${t('from')} ${newCustomer} ${t('for')} ₹${newAmount}.`,
      });

    }, 15000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [t, toast]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">{t('Dashboard')}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Today's Earnings")}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹8,520</div>
            <p className="text-xs text-muted-foreground">
              {t('+20.1% from last month')}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('Orders this Week')}</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">
              {t('5 pending, 7 in progress')}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('New Customers')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+3</div>
            <p className="text-xs text-muted-foreground">
              {t('Added this month')}
            </p>
          </CardContent>
        </Card>
         <Card className="shadow-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('Upcoming Fittings')}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              {t('Scheduled for today')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 shadow-glow">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">{t('Earnings Overview')}</CardTitle>
            <CardDescription>
              {t('Your earnings over the last 6 months.')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={{
                earnings: {
                    label: t("Earnings"),
                    color: "hsl(var(--primary))",
                },
             }} className="h-[250px] w-full">
              <AreaChart data={earningsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <Tooltip
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-glow">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">{t('Recent Orders')}</CardTitle>
            <CardDescription>
              {t('An overview of your most recent orders.')}
            </CardDescription>
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
                  const { className: statusClassName } = getStatusConfig(order.status);
                  return (
                    <TableRow key={order.orderId} className="transition-opacity duration-500">
                      <TableCell>
                        <div className="font-medium flex items-center">
                            {order.customer} 
                            {order.isPriority && <Star className="h-4 w-4 ml-1 text-yellow-500 fill-yellow-500" />}
                        </div>
                        <div className="text-xs text-muted-foreground">{order.orderId}</div>
                      </TableCell>
                      <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusClassName}>
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
      <Button className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg">
        <Plus className="h-8 w-8" />
      </Button>
    </div>
  );
}
