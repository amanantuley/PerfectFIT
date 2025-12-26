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
  ShieldCheck,
  Target,
  Activity,
  Sparkles,
  Download,
  Printer,
  ArrowUpRight,
  AlertTriangle,
  CalendarClock,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { AreaChart, Area, CartesianGrid, XAxis, Tooltip } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/context/translation-provider';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

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

const controlSignals = [
  { label: 'SLA on-time', value: '94%', delta: '+3.2%', tone: 'positive' as const },
  { label: 'Avg. turnaround', value: '2.9 days', delta: '−0.4d', tone: 'positive' as const },
  { label: 'Quality passes', value: '98.1%', delta: '+1.1%', tone: 'neutral' as const },
  { label: 'Revision rate', value: '3.2%', delta: '−0.6%', tone: 'positive' as const },
];

const quickActions = [
  { label: 'Create order', icon: Plus },
  { label: 'Print work orders', icon: Printer },
  { label: 'Export payouts', icon: Download },
  { label: 'Schedule fitting', icon: CalendarClock },
];

const backlog = [
  { title: '3 blazer alterations', eta: 'Due today', risk: 'High' },
  { title: '5 wedding outfits', eta: 'Due in 2d', risk: 'Medium' },
  { title: '2 bespoke suits', eta: 'Due in 4d', risk: 'Low' },
];

const clients = [
  { name: 'Kavya Studio', spend: '₹92k', trend: '+12%' },
  { name: 'Arav Men', spend: '₹74k', trend: '+6%' },
  { name: 'Mira Weddings', spend: '₹68k', trend: '+9%' },
];

const alerts = [
  { title: 'Fabric low: Navy twill', detail: 'Only 8m left, reorder to avoid delays.', severity: 'High' },
  { title: 'Pickup reschedule', detail: 'Client moved fitting to Friday 4pm.', severity: 'Medium' },
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
      <Card className="border border-white/10 shadow-glow bg-gradient-to-r from-background via-background/80 to-background/60">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Operator cockpit</p>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
              {t('Tailor Command Center')}
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">Track earnings, SLAs, and priority work with enterprise-grade guardrails.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> {t('Export summary')}
            </Button>
            <Button>
              <Sparkles className="mr-2 h-4 w-4" /> {t('New order')}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title={t("Total Earnings")}
          icon={DollarSign}
          value={`₹${totalEarnings.toLocaleString()}`}
          growth={earningsGrowth}
        />
        <SummaryCard title={t('Active Orders')} icon={ClipboardList} value={recentOrders.length.toString()} sub={t('Active')} />
        <SummaryCard title={t('On-time SLA')} icon={ShieldCheck} value="94%" sub={t('Last 30 days')} />
        <SummaryCard title={t('Upcoming Fittings')} icon={Calendar} value="6" sub={t('2 completed')} />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 shadow-glow">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
                {t('Control board')}
              </CardTitle>
              <CardDescription>{t('SLA, throughput, and revision signals')}</CardDescription>
            </div>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" />{t('Healthy')}</div>
              <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" />{t('Watch')}</div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {controlSignals.map((signal) => (
              <div key={signal.label} className="rounded-xl border bg-muted/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{signal.label}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${signal.tone === 'positive' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-sky-500/10 text-sky-500'}`}>{signal.delta}</span>
                </div>
                <p className="text-2xl font-bold">{signal.value}</p>
                <Progress value={signal.label === 'SLA on-time' ? 94 : signal.label === 'Quality passes' ? 98 : 82} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> {t('Pipeline snapshot')}</CardTitle>
            <CardDescription>{t('Today’s work and risk bands')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-3">
              <div>
                <p className="text-sm text-muted-foreground">{t('Priority backlog')}</p>
                <p className="font-semibold">{t('11 orders')}</p>
              </div>
              <Badge variant="secondary" className="gap-1 bg-amber-500/10 text-amber-600"><AlertTriangle className="h-3 w-3" /> {t('2 high')}</Badge>
            </div>
            <div className="grid gap-2">
              {backlog.map(item => (
                <div key={item.title} className="flex items-center justify-between rounded-lg border bg-muted/10 p-3">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.eta}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${item.risk === 'High' ? 'bg-amber-500/10 text-amber-600' : item.risk === 'Medium' ? 'bg-sky-500/10 text-sky-600' : 'bg-emerald-500/10 text-emerald-600'}`}>{item.risk}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 shadow-glow">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
                {t('Earnings Overview')}
              </CardTitle>
              <CardDescription>{t('Your earnings over the last few months.')}</CardDescription>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <ArrowUpRight className="h-3 w-3" />
              {t('Live refresh every 10s')}
            </div>
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

        <Card className="lg:col-span-2 shadow-glow">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
              {t('Recent Orders')}
            </CardTitle>
            <CardDescription>{t('Your latest tailoring requests')}</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map(action => (
                <Button key={action.label} variant="outline" size="sm" className="justify-start">
                  <action.icon className="mr-2 h-4 w-4" /> {t(action.label)}
                </Button>
              ))}
            </div>
            <Separator />
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

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> {t('Top clients')}</CardTitle>
            <CardDescription>{t('Who is driving revenue this month')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {clients.map((client) => (
              <div key={client.name} className="flex items-center justify-between rounded-lg border bg-muted/20 p-3">
                <div>
                  <p className="font-semibold">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{t('Monthly spend')}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{client.spend}</p>
                  <p className="text-xs text-emerald-500 flex items-center justify-end gap-1"><TrendingUp className="h-3 w-3" />{client.trend}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> {t('Operational alerts')}</CardTitle>
            <CardDescription>{t('Risks to resolve before handoff')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.title} className="rounded-lg border bg-muted/20 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{alert.title}</p>
                  <Badge variant="secondary" className={alert.severity === 'High' ? 'bg-amber-500/10 text-amber-700' : 'bg-sky-500/10 text-sky-700'}>{alert.severity}</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{alert.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> {t('Next fittings')}</CardTitle>
            <CardDescription>{t('Keep the calendar honest')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-3">
              <div>
                <p className="font-semibold">{t('Today')}</p>
                <p className="text-xs text-muted-foreground">{t('2 slots booked')}</p>
              </div>
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">{t('On track')}</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-3">
              <div>
                <p className="font-semibold">{t('Tomorrow')}</p>
                <p className="text-xs text-muted-foreground">{t('3 priority clients')}</p>
              </div>
              <Badge variant="secondary" className="bg-sky-500/10 text-sky-600">{t('Prep fabrics')}</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-3">
              <div>
                <p className="font-semibold">{t('This week')}</p>
                <p className="text-xs text-muted-foreground">{t('8 fittings scheduled')}</p>
              </div>
              <Badge variant="secondary" className="bg-amber-500/10 text-amber-700">{t('Tight turnaround')}</Badge>
            </div>
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
    <Card className="shadow-glow hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 border border-white/10">
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
