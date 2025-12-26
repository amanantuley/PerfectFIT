'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Undo,
  Replace,
  Calendar,
  FileText,
  Banknote,
  HelpCircle,
  Download,
  ShieldCheck,
  Clock,
  BadgeCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, { useState } from 'react';
import { useApp, ReturnEntry } from '@/context/app-context';

const getStatusConfig = (status: string): { variant: 'outline' | 'secondary'; icon: React.ElementType } => {
  switch (status.toLowerCase()) {
    case 'replaced':
      return { variant: 'secondary', icon: Replace };
    case 'returned':
    default:
      return { variant: 'outline', icon: Undo };
  }
};

export default function ReturnsPage() {
  const { returns } = useApp();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<ReturnEntry | null>(null);

  const replacedCount = returns?.filter((r) => r.status.toLowerCase() === 'replaced').length || 0;
  const returnedCount = returns?.filter((r) => r.status.toLowerCase() === 'returned').length || 0;
  const totalRefund = returns?.reduce((sum, r) => sum + (r.refundDetails?.netRefund || 0), 0) || 0;

  const KPI_CARDS = [
    { icon: Undo, label: 'Open Returns', value: returnedCount.toString(), unit: 'in review' },
    { icon: Replace, label: 'Replacements', value: replacedCount.toString(), unit: 'fulfilled' },
    { icon: Banknote, label: 'Refunded', value: `₹${totalRefund.toFixed(0)}`, unit: 'total' },
    { icon: Clock, label: 'Avg SLA', value: '5-7', unit: 'days' },
  ];

  const handleOpenDetails = (item: ReturnEntry) => {
    setSelectedReturn(item);
    setIsDetailOpen(true);
  };

  const handleDownloadReturnInvoice = (item: ReturnEntry) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // --- Header ---
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('PerfectFit', 14, 22);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Navi Mumbai, Maharashtra, India', 14, 30);
    doc.text('support@perfectfit.com', 14, 35);
    doc.text('+91 9867408609', 14, 40);

    doc.setFontSize(18);
    doc.text('Credit Note / Return Invoice', pageWidth - 14, 22, { align: 'right' });
    doc.setFontSize(10);
    doc.text(`Return ID: ${item.id}`, pageWidth - 14, 30, { align: 'right' });
    doc.text(`Date: ${item.date}`, pageWidth - 14, 35, { align: 'right' });

    doc.setLineWidth(0.5);
    doc.line(14, 50, pageWidth - 14, 50);

    // --- Customer Info ---
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 14, 58);
    doc.setFont('helvetica', 'normal');
    doc.text('User', 14, 64);
    doc.text('user@example.com', 14, 69);
    doc.text('123 Fashion Ave, Style City, 10001', 14, 74);

    // --- Return Details ---
    (doc as any).autoTable({
      startY: 85,
      head: [['Item Returned', 'Reason', 'Status']],
      body: [[item.item, item.reason, item.status]],
      theme: 'striped',
      headStyles: { fillColor: [143, 88, 240] },
    });

    // --- Refund Summary ---
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Refund Summary', 14, finalY);

    const refundBody = [
      ['Original Item Price:', `₹${item.refundDetails.originalPrice.toFixed(2)}`],
      ['Return Fee:', `-₹${item.refundDetails.returnFee.toFixed(2)}`],
    ];

    (doc as any).autoTable({
      startY: finalY + 5,
      body: refundBody,
      theme: 'plain',
      styles: { cellPadding: 2 },
    });

    const lastY = (doc as any).lastAutoTable.finalY + 5;
    doc.line(14, lastY, pageWidth - 14, lastY);

    doc.setFont('helvetica', 'bold');
    doc.text('Net Refund Amount:', 14, lastY + 8);
    doc.text(`₹${item.refundDetails.netRefund.toFixed(2)}`, pageWidth - 14, lastY + 8, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Refund Status: ${item.refundDetails.refundStatus}`, 14, lastY + 15);
    doc.text(`Transaction ID: ${item.refundDetails.transactionId}`, 14, lastY + 20);

    // --- Footer ---
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.line(14, pageHeight - 30, pageWidth - 14, pageHeight - 30);
    doc.setFontSize(10);
    doc.text('Thank you for trusting PerfectFit!', pageWidth / 2, pageHeight - 22, { align: 'center' });
    doc.text('Need help? Contact us at support@perfectfit.com', pageWidth / 2, pageHeight - 15, { align: 'center' });

    doc.save(`PerfectFit-Return-${item.id}.pdf`);
  };

  return (
    <div className="space-y-8 animate-fade-in-up p-4 sm:p-6 md:p-10 bg-gradient-to-b from-background via-background/70 to-background/40">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-2xl border border-muted/40 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6 sm:p-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
        <div className="relative space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs rounded-full border border-primary/30 bg-primary/5 text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Protected Returns
            </span>
            <span className="px-3 py-1 text-xs rounded-full border border-primary/30 bg-primary/5 text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> Free Alteration Voucher
            </span>
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500">Returns & Refunds Hub</h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl">
              Manage returns, replacements, and refund invoices with enterprise-grade transparency and clarity.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground">⏱ Refunds in 5–7 days</span>
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground">📑 Downloadable credit notes</span>
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground">🤝 Replacement-first policy</span>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} className="shadow-lg border-muted/40 bg-background/70 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">{card.label}</p>
                    <p className="text-2xl font-bold text-foreground">{card.value}</p>
                    <p className="text-xs text-muted-foreground">{card.unit}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* --- Return Policy Section --- */}
      <Card className="shadow-xl border border-border/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
            Return & Refund Policy
          </CardTitle>
          <CardDescription>
            Everything you need to know about returning or replacing your garments.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                title: '30-Day Return Policy (Purchased Items)',
                content:
                  'We want you to be completely satisfied with your purchase. If you’re not, return it within 30 days in its original condition for a full refund or exchange.',
              },
              {
                title: 'Rental Returns',
                content:
                  'Rental items must be returned by the due date using the prepaid label provided. Late returns may incur daily fees or full retail charge after 14 days.',
              },
              {
                title: 'Damaged or Incorrect Items',
                content:
                  'If you receive a damaged or incorrect item, contact support within 48 hours with a photo. We’ll arrange a replacement or full refund.',
              },
              {
                title: 'Refund Process',
                content:
                  'Once inspected, refunds are processed within 5–7 business days to your original payment method.',
              },
              {
                title: 'Non-Returnable Items',
                content:
                  'Custom-made garments are non-returnable but include one free alteration for fit issues.',
              },
            ].map((policy, i) => (
              <AccordionItem key={i} value={`policy-${i}`}>
                <AccordionTrigger>{policy.title}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{policy.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* --- Return History Section --- */}
      <Card className="shadow-xl border border-border/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
            Return History
          </CardTitle>
          <CardDescription>Track your past returns, replacements, and refund details.</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {returns.map((item) => {
              const statusConfig = getStatusConfig(item.status);
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-lg border hover:bg-muted/50 transition-all shadow-sm"
                  onClick={() => handleOpenDetails(item)}
                >
                  <CardContent className="p-4 flex gap-4 items-center">
                    <Image
                      src={item.image}
                      alt={item.item}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-semibold">{item.item}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <FileText className="h-3 w-3" /> {item.id}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {item.date}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Badge
                      variant={statusConfig.variant}
                      className="w-full justify-center py-2 capitalize"
                    >
                      <statusConfig.icon className="h-4 w-4 mr-1" />
                      {item.status}
                    </Badge>
                  </CardFooter>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returns.map((item) => {
                  const statusConfig = getStatusConfig(item.status);
                  return (
                    <TableRow
                      key={item.id}
                      className="hover:bg-muted/50 cursor-pointer transition"
                      onClick={() => handleOpenDetails(item)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Image
                            src={item.image}
                            alt={item.item}
                            width={40}
                            height={40}
                            className="rounded-md"
                          />
                          <span className="font-medium">{item.item}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusConfig.variant} className="gap-1.5 capitalize">
                          <statusConfig.icon className="h-3.5 w-3.5" />
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{item.date}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* --- Dialog for Details --- */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Return Details: {selectedReturn?.id}</DialogTitle>
            <DialogDescription>
              Review refund and return details for your item.
            </DialogDescription>
          </DialogHeader>

          {selectedReturn && (
            <div className="space-y-4 py-3">
              <div className="flex gap-4 items-center">
                <Image
                  src={selectedReturn.image}
                  alt={selectedReturn.item}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div>
                  <h3 className="font-semibold">{selectedReturn.item}</h3>
                  <p className="text-sm text-muted-foreground">Status: {selectedReturn.status}</p>
                  <p className="text-sm text-muted-foreground">Date: {selectedReturn.date}</p>
                </div>
              </div>

              <Separator />

              {/* Refund Summary */}
              <Card className="bg-muted/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <Banknote className="h-4 w-4" /> Refund Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Original Item Price:</span>
                    <span>₹{selectedReturn.refundDetails.originalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Return Fee:</span>
                    <span>-₹{selectedReturn.refundDetails.returnFee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Net Refund:</span>
                    <span>₹{selectedReturn.refundDetails.netRefund.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Refund Status:</span>
                    <Badge
                      variant={
                        selectedReturn.refundDetails.refundStatus === 'Completed'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {selectedReturn.refundDetails.refundStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span>{selectedReturn.refundDetails.transactionId}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Reason */}
              <Card className="bg-muted/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <HelpCircle className="h-4 w-4" /> Reason for Return
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="italic text-sm text-muted-foreground">
                    “{selectedReturn.reason}”
                  </p>
                </CardContent>
              </Card>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => handleDownloadReturnInvoice(selectedReturn)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Trust & CTA */}
      <Card className="shadow-xl border border-primary/30 bg-gradient-to-r from-primary/5 via-background to-primary/5">
        <CardContent className="py-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-primary flex items-center gap-2"><BadgeCheck className="h-4 w-4" /> Promise</p>
              <p className="text-base text-foreground">Fast, transparent refunds and replacements with downloadable credit notes.</p>
            </div>
            <Button className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 text-white hover:opacity-90" asChild>
              <a href="/contact" className="flex items-center gap-2">
                Need help?
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-primary mt-0.5" />
              <p><strong>Protected:</strong> Every return is logged with a transaction ID and refund status for auditability.</p>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-primary mt-0.5" />
              <p><strong>Predictable SLAs:</strong> Standard refunds in 5–7 business days; replacements prioritized within 72 hours.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
