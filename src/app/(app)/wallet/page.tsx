'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Wallet as WalletIcon,
  Sparkles,
  Coins,
  ShieldCheck,
  LineChart,
  Plus,
  Minus,
  CreditCard,
  Banknote,
  FileDown,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function WalletPage() {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Array<{ id: string; date: string; type: 'Add' | 'Withdraw' | 'Cashback'; amount: number; method: string; note?: string }>>([
    { id: 'TXN-1012', date: '2025-12-01', type: 'Add', amount: 1500, method: 'UPI •••• 2481' },
    { id: 'TXN-1013', date: '2025-12-04', type: 'Cashback', amount: 120, method: 'PerfectPay', note: 'Pro Plan activation' },
    { id: 'TXN-1014', date: '2025-12-10', type: 'Withdraw', amount: -600, method: 'Bank A/c •••• 1199' },
  ]);
  const balance = useMemo(() => transactions.reduce((s, t) => s + t.amount, 0), [transactions]);

  const addFunds = (amt: number) => {
    setTransactions((prev) => [{ id: `TXN-${1000 + prev.length + 1}`, date: new Date().toISOString().slice(0, 10), type: 'Add', amount: amt, method: 'UPI •••• 2481' }, ...prev]);
    toast({ title: 'Funds added', description: `₹${amt.toLocaleString('en-IN')} added to your wallet.` });
  };
  const withdrawFunds = (amt: number) => {
    if (balance < amt) {
      toast({ variant: 'destructive', title: 'Insufficient balance', description: 'Top up your wallet to withdraw.' });
      return;
    }
    setTransactions((prev) => [{ id: `TXN-${1000 + prev.length + 1}`, date: new Date().toISOString().slice(0, 10), type: 'Withdraw', amount: -amt, method: 'Bank A/c •••• 1199' }, ...prev]);
    toast({ title: 'Withdrawal requested', description: `₹${amt.toLocaleString('en-IN')} to your bank account.` });
  };
  const exportStatement = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('PerfectPay Wallet Statement', 14, 18);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 26);
    (doc as any).autoTable({
      startY: 34,
      head: [['ID', 'Date', 'Type', 'Method', 'Amount']],
      body: transactions.map((t) => [t.id, t.date, t.type, t.method, `₹${t.amount.toLocaleString('en-IN')}`]),
      headStyles: { fillColor: [143, 88, 240] },
    });
    doc.save('PerfectPay-Statement.pdf');
  };

  return (
    <motion.div
      className="space-y-8 animate-fade-in-up"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero */}
      <Card className="shadow-2xl border border-muted/40 bg-background/60 backdrop-blur-md">
        <CardHeader className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div className="text-left">
              <div className="flex items-center gap-3">
                <motion.div className="bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 p-[3px] rounded-full" initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}>
                  <div className="bg-background rounded-full p-3">
                    <WalletIcon className="h-8 w-8 text-primary drop-shadow-md" />
                  </div>
                </motion.div>
                <CardTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
                  PerfectPay Wallet
                </CardTitle>
              </div>
              <CardDescription>Your intelligent, secure, and rewarding way to pay.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1 bg-primary/10 border-primary/30 text-primary"><ShieldCheck className="h-4 w-4" /> Tokenized payments</Badge>
              <Badge variant="outline" className="gap-1 bg-primary/10 border-primary/30 text-primary"><LineChart className="h-4 w-4" /> Insights enabled</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[{ label: 'Balance', value: `₹${balance.toLocaleString('en-IN')}`, icon: Coins }, { label: 'Cashback (30d)', value: '₹120', icon: Banknote }, { label: 'Methods', value: '2 on file', icon: CreditCard }, { label: 'Security', value: 'MFA on', icon: ShieldCheck }].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-muted/30 bg-background/70 px-4 py-3 shadow-sm">
                <span className="p-2 rounded-full bg-primary/10"><Icon className="h-4 w-4 text-primary" /></span>
                <div className="leading-tight">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-semibold text-foreground text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-3">
          {/* Balance card */}
          <Card className="lg:col-span-2 border border-muted/30 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-sky-500/10">
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground">Wallet balance</p>
              <motion.h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500" animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                ₹{balance.toLocaleString('en-IN')}
              </motion.h3>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button onClick={() => addFunds(1000)} className="gap-2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 text-white">
                  <Plus className="h-4 w-4" /> Add ₹1,000
                </Button>
                <Button onClick={() => withdrawFunds(500)} variant="outline" className="gap-2">
                  <Minus className="h-4 w-4" /> Withdraw ₹500
                </Button>
                <Button onClick={exportStatement} variant="outline" className="gap-2">
                  <FileDown className="h-4 w-4" /> Export statement
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment methods */}
          <Card className="border border-muted/30">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Payment methods</p>
                <Button variant="outline" size="sm" className="gap-1"><CreditCard className="h-4 w-4" /> Manage</Button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between"><span>Visa •••• 2481</span><Badge variant="outline" className="bg-primary/5 border-primary/30">Default</Badge></div>
                <div className="flex items-center justify-between"><span>Bank A/c •••• 1199</span><span className="text-muted-foreground">Withdrawals</span></div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card className="border border-muted/30 shadow-xl">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-xl">Recent transactions</CardTitle>
            <CardDescription>History of wallet activity including cashback.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportStatement} className="gap-1"><FileDown className="h-4 w-4" /> Export</Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {transactions.map((t) => (
              <Card key={t.id} className="border border-muted/30">
                <CardContent className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{t.type}</p>
                    <p className={t.amount >= 0 ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                      {t.amount >= 0 ? '+' : ''}₹{t.amount.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.date} • {t.method}</p>
                  {t.note && <p className="text-xs text-muted-foreground">{t.note}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Desktop table */}
          <div className="hidden md:block border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.id}</TableCell>
                    <TableCell>{t.date}</TableCell>
                    <TableCell>{t.type}</TableCell>
                    <TableCell>{t.method}</TableCell>
                    <TableCell className="text-right">
                      <span className={t.amount >= 0 ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                        {t.amount >= 0 ? '+' : ''}₹{t.amount.toLocaleString('en-IN')}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Coins, title: 'Cashback Rewards', desc: 'Earn instant cashback on every transaction.' },
          { icon: LineChart, title: 'Smart Analytics', desc: 'AI-powered insights into your spending patterns.' },
          { icon: ShieldCheck, title: 'Secure Payments', desc: 'Protected by advanced encryption and tokenization.' },
        ].map((feature, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="bg-muted/30 border border-muted/30 hover:border-primary/40 transition-all text-center shadow-md hover:shadow-xl backdrop-blur-sm rounded-xl p-4 space-y-2">
              <feature.icon className="h-8 w-8 text-primary mx-auto" />
              <p className="font-semibold">{feature.title}</p>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
