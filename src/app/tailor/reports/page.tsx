
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
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  BarChart,
  PieChart,
  Pie,
  Cell,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DollarSign, ClipboardList, TrendingUp, Download } from 'lucide-react';
import { useTranslation } from '@/context/translation-provider';
import { salesData, topDesigns, categoryData, COLORS } from '@/lib/reports-data';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'hsl(var(--primary))',
  },
};

export default function TailorReportsPage() {
  const { t } = useTranslation();
  
  const handleExportPdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFontSize(20);
    doc.text('Business Performance Report', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 28, { align: 'center' });
    
    // Key Metrics
    doc.setFontSize(16);
    doc.text('Key Metrics Summary', 14, 45);
    doc.setFontSize(10);
    (doc as any).autoTable({
        startY: 50,
        head: [['Metric', 'Value', 'Comparison']],
        body: [
            [t('Total Revenue'), '₹1,25,430', t('+15.2% from last month')],
            [t('Total Orders'), '+210', t('+12.1% from last month')],
            [t('Average Order Value'), '₹597.28', t('+3.1% from last month')],
        ],
        theme: 'grid',
    });
    
    let lastY = (doc as any).lastAutoTable.finalY + 15;
    
    // Top Designs
    doc.setFontSize(16);
    doc.text(t('Top Performing Designs'), 14, lastY);
    (doc as any).autoTable({
        startY: lastY + 5,
        head: [[t('Design Name'), t('Category'), t('Units Sold'), t('Total Revenue')]],
        body: topDesigns.map(d => [t(d.name as any), t(d.category as any), d.unitsSold, `₹${d.totalRevenue.toLocaleString()}`]),
        theme: 'striped',
    });
    
     lastY = (doc as any).lastAutoTable.finalY + 15;
    
    // Monthly Sales
    doc.setFontSize(16);
    doc.text(t('Monthly Sales'), 14, lastY);
    (doc as any).autoTable({
        startY: lastY + 5,
        head: [['Month', 'Sales (₹)']],
        body: salesData.map(d => [d.month, `₹${d.sales.toLocaleString()}`]),
        theme: 'striped'
    });
    
    doc.save('PerfectFit-Business-Report.pdf');
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
            {t('Reports')}
          </h1>
          <p className="text-muted-foreground">{t('Analyze your business performance.')}</p>
        </div>
        <Button onClick={handleExportPdf}>
          <Download className="mr-2 h-4 w-4" />
          {t('Export PDF')}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('Total Revenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,25,430</div>
            <p className="text-xs text-muted-foreground">{t('+15.2% from last month')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('Total Orders')}</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+210</div>
            <p className="text-xs text-muted-foreground">{t('+12.1% from last month')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('Average Order Value')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹597.28</div>
            <p className="text-xs text-muted-foreground">{t('+3.1% from last month')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Sales Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
              {t('Monthly Sales')}
            </CardTitle>
            <CardDescription>{t('Sales performance over the last 6 months.')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${value / 1000}k`}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend content={<ChartLegendContent nameKey="month" />} />
                  <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
              {t('Order by Category')}
            </CardTitle>
            <CardDescription>{t('Breakdown of your most popular garment types.')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent nameKey="name" hideIndicator />} />
                  <Legend content={<ChartLegendContent nameKey="name" />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Designs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
            {t('Top Performing Designs')}
          </CardTitle>
          <CardDescription>{t('Your most popular designs by sales volume.')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Design Name')}</TableHead>
                <TableHead>{t('Category')}</TableHead>
                <TableHead className="text-right">{t('Units Sold')}</TableHead>
                <TableHead className="text-right">{t('Total Revenue')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topDesigns.map((design) => (
                <TableRow key={design.name}>
                  <TableCell className="font-medium">{t(design.name as any)}</TableCell>
                  <TableCell>{t(design.category as any)}</TableCell>
                  <TableCell className="text-right">{design.unitsSold}</TableCell>
                  <TableCell className="text-right">
                    ₹{design.totalRevenue.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
