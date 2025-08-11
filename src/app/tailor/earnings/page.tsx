
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Download, Banknote, Calendar, Loader2 } from 'lucide-react';
import { useTranslation } from '@/context/translation-provider';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Payout {
  payoutId: string;
  date: string;
  amount: number;
  status: string;
}

const earningsHistory: Payout[] = [
  { payoutId: 'POUT-007', date: '2025-07-15', amount: 12500.00, status: 'Completed' },
  { payoutId: 'POUT-006', date: '2025-06-15', amount: 11005.50, status: 'Completed' },
  { payoutId: 'POUT-005', date: '2025-05-15', amount: 13007.75, status: 'Completed' },
  { payoutId: 'POUT-004', date: '2025-04-15', amount: 9500.00, status: 'Completed' },
];

export default function TailorEarningsPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isPayoutDialogOpen, setIsPayoutDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestPayout = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        setIsPayoutDialogOpen(false);
        toast({
            title: t('Payout Requested'),
            description: t('Your payout request for ₹2,350.50 has been submitted.'),
        });
    }, 1500);
  };

  const handleDownloadInvoice = (payout: Payout) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('PerfectFit Invoice', 14, 22);
    doc.setFontSize(10);
    doc.text('PerfectFit Inc.', 14, 30);
    doc.text('Navi Mumbai, Maharashtra, India', 14, 35);
    doc.text('support@perfectfit.com', 14, 40);

    doc.setFontSize(12);
    doc.text('Payout Details', 14, 60);
    doc.setFontSize(10);
    doc.text(`Payout ID: ${payout.payoutId}`, 14, 70);
    doc.text(`Date: ${payout.date}`, 14, 75);
    doc.text(`Status: ${payout.status}`, 14, 80);
    doc.setFontSize(12);
    doc.text(`Amount: ₹${payout.amount.toFixed(2)}`, 140, 70);
    
    doc.setLineWidth(0.5);
    doc.line(14, 90, 196, 90);

    (doc as any).autoTable({
      startY: 100,
      head: [['Description', 'Quantity', 'Rate', 'Amount']],
      body: [
        ['Suit Stitching Orders', '10', '₹800.00', '₹8000.00'],
        ['Shirt Stitching Orders', '15', '₹400.00', '₹6000.00'],
        ['Alterations', '5', '₹150.00', '₹750.00'],
        ['Platform Fee', '', '', '-₹2250.00'],
      ],
      foot: [
        ['', '', 'Subtotal', `₹${(payout.amount * 1.2).toFixed(2)}`],
        ['', '', 'Total Payout', `₹${payout.amount.toFixed(2)}`],
      ],
      theme: 'striped',
      headStyles: { fillColor: [34, 34, 34] }, 
      footStyles: { fillColor: [230, 230, 230], textColor: [0,0,0] },
    });

    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text('Thank you for your partnership with PerfectFit!', 14, doc.internal.pageSize.height - 15);
        doc.text(`Page ${i} of ${pageCount}`, 190, doc.internal.pageSize.height - 15);
    }
    
    doc.save(`Invoice-${payout.payoutId}.pdf`);
  };

  return (
    <>
    <div className="space-y-8 animate-fade-in-up">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">{t('Earnings Overview')}</CardTitle>
          <CardDescription>{t('Track your finances and manage payouts.')}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-muted/40 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('Available for Payout')}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2,350.50</div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setIsPayoutDialogOpen(true)}><Banknote className="mr-2 h-4 w-4"/>{t('Request Payout')}</Button>
            </CardFooter>
          </Card>
           <Card className="bg-muted/40 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('Next Payout Date')}</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{t('Aug 15, 2025')}</div>
              <p className="text-xs text-muted-foreground">{t('Payouts are processed on the 15th of each month.')}</p>
            </CardContent>
          </Card>
           <Card className="bg-muted/40 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('Total Earned (All Time)')}</CardTitle>
               <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45,231.89</div>
              <p className="text-xs text-muted-foreground">{t('Since joining in Jan 2025.')}</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">{t('Payout History')}</CardTitle>
          <CardDescription>{t('A record of all your past payouts.')}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="md:hidden space-y-4">
            {earningsHistory.map((payout) => (
                <Card key={payout.payoutId} className="overflow-hidden transition-all hover:shadow-md hover:bg-muted/50">
                    <CardContent className="p-4 flex flex-col gap-2">
                         <div className="flex justify-between items-center">
                            <span className="font-medium">{payout.payoutId}</span>
                            <span className="font-bold">₹{payout.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span>{payout.date}</span>
                            <Badge>{t(payout.status as any)}</Badge>
                        </div>
                         <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => handleDownloadInvoice(payout)}>
                            <Download className="mr-2 h-3.5 w-3.5"/>
                            {t('Invoice')}
                        </Button>
                    </CardContent>
                </Card>
            ))}
            </div>

          <div className="hidden md:block rounded-md border">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>{t('Payout ID')}</TableHead>
                    <TableHead>{t('Date')}</TableHead>
                    <TableHead>{t('Amount')}</TableHead>
                    <TableHead>{t('Status')}</TableHead>
                    <TableHead className="text-right">{t('Actions')}</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {earningsHistory.map((payout) => (
                    <TableRow key={payout.payoutId} className="transition-colors hover:bg-muted/30">
                    <TableCell className="font-medium">{payout.payoutId}</TableCell>
                    <TableCell>{payout.date}</TableCell>
                    <TableCell>₹{payout.amount.toFixed(2)}</TableCell>
                    <TableCell>
                        <Badge>{t(payout.status as any)}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleDownloadInvoice(payout)}>
                        <Download className="mr-2 h-3.5 w-3.5"/>
                        {t('Invoice')}
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
    
    <Dialog open={isPayoutDialogOpen} onOpenChange={setIsPayoutDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{t('Confirm Payout Request')}</DialogTitle>
                <DialogDescription>
                    {t('You are about to request a payout of')} <b>₹2,350.50</b>. {t('This amount will be transferred to your registered bank account within 3-5 business days.')}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="ghost" onClick={() => setIsPayoutDialogOpen(false)}>{t('Cancel')}</Button>
                <Button onClick={handleRequestPayout} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('Confirm')}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
}
