
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
import Image from 'next/image';
import { returnsHistory, type ReturnEntry } from '@/lib/returns-data';
import { Undo, Replace, Calendar, FileText, Banknote, HelpCircle, Download } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const getStatusConfig = (status: string): { variant: 'outline' | 'secondary', icon: React.ElementType } => {
  switch (status.toLowerCase()) {
    case 'replaced':
      return { variant: 'secondary', icon: Replace };
    case 'returned':
      return { variant: 'outline', icon: Undo };
    default:
      return { variant: 'outline', icon: Undo };
  }
};

export default function ReturnsPage() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<ReturnEntry | null>(null);

  const handleOpenDetails = (item: ReturnEntry) => {
    setSelectedReturn(item);
    setIsDetailOpen(true);
  };

  const handleDownloadReturnInvoice = (item: ReturnEntry) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
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

    // Customer Info
    doc.setLineWidth(0.5);
    doc.line(14, 50, pageWidth - 14, 50);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 14, 58);
    doc.setFont('helvetica', 'normal');
    doc.text('User', 14, 64);
    doc.text('user@example.com', 14, 69);
    doc.text('123 Fashion Ave, Style City, 10001', 14, 74);

    // Return Details Table
    (doc as any).autoTable({
        startY: 85,
        head: [['Item Returned', 'Reason', 'Status']],
        body: [[
            item.item,
            item.reason,
            item.status
        ]],
        theme: 'striped',
        headStyles: { fillColor: [143, 88, 240] },
    });
    
    // Refund Summary
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

    let lastY = (doc as any).lastAutoTable.finalY;
    doc.setLineWidth(0.2);
    doc.line(14, lastY, pageWidth - 14, lastY);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Net Refund Amount:', 14, lastY + 8);
    doc.text(`₹${item.refundDetails.netRefund.toFixed(2)}`, pageWidth - 14, lastY + 8, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Status: ${item.refundDetails.refundStatus}`, 14, lastY + 14);
    doc.text(`Transaction ID: ${item.refundDetails.transactionId}`, 14, lastY + 19);

    // Footer
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setLineWidth(0.5);
    doc.line(14, pageHeight - 30, pageWidth - 14, pageHeight - 30);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for your business!', pageWidth / 2, pageHeight - 22, { align: 'center' });
    doc.text('If you have any questions, please contact support@perfectfit.com.', pageWidth / 2, pageHeight - 15, { align: 'center' });


    doc.save(`PerfectFit-Return-${item.id}.pdf`);
  };

  return (
    <>
      <div className="space-y-8 animate-fade-in-up">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Return & Refund Policy</CardTitle>
            <CardDescription>
              Our policy for returns and refunds for purchased and rented items.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>30-Day Return Policy (Purchased Items)</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    We want you to be completely satisfied with your purchase. If you are not happy with your garment, you can return it within 30 days of the delivery date for a full refund or an exchange. The item must be in its original condition: unworn, unwashed, with all tags attached.
                  </p>
                  <p>
                    To initiate a return, please visit the "My Orders" page, select the item you wish to return, and follow the instructions.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Rental Returns</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    Rental items must be returned on or before the specified return date. We provide a prepaid return label with your order. Simply pack the garment in its original packaging and drop it off at the designated courier service.
                  </p>
                  <p>
                    Late returns will be subject to a late fee for each day past the due date. If an item is not returned within 14 days of the due date, you will be charged the full retail price of the garment.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Damaged or Incorrect Items</AccordionTrigger>
                <AccordionContent>
                  <p>
                    If you receive a damaged, defective, or incorrect item, please contact our customer support within 48 hours of delivery. We will arrange for a replacement or a full refund, including any shipping costs. Please provide a photo of the damage or issue when you contact us.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Refund Process</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    Once we receive and inspect your returned item, we will process your refund. Refunds will be credited to your original method of payment within 5-7 business days. You will receive an email notification once your refund has been processed.
                  </p>
                  <p>
                    Please note that original shipping fees are non-refundable.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Non-Returnable Items</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Custom-made garments that are tailored to your specific measurements are non-returnable and non-refundable, as they are created uniquely for you. However, if there is a fit issue, we offer one free alteration. Please contact customer service to arrange for an alteration.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Return History</CardTitle>
            <CardDescription>A list of your past returns and replacements.</CardDescription>
          </CardHeader>
          <CardContent>
              {/* Mobile View */}
              <div className="md:hidden space-y-4">
              {returnsHistory.map((item) => {
                  const statusConfig = getStatusConfig(item.status);
                  return (
                  <Card key={item.id} className="overflow-hidden transition-all hover:shadow-md hover:bg-muted/50" onClick={() => handleOpenDetails(item)}>
                      <CardContent className="p-4 flex gap-4">
                      <Image
                          src={item.image}
                          alt={item.item}
                          width={64}
                          height={64}
                          className="rounded-md object-cover"
                          data-ai-hint={item.dataAiHint}
                      />
                      <div className="flex-1 space-y-2">
                          <p className="font-bold">{item.item}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                              <FileText className="h-4 w-4 mr-1.5"/>
                              <p>{item.id}</p>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-1.5"/>
                              <p>{item.date}</p>
                          </div>
                      </div>
                      </CardContent>
                      <div className="px-4 pb-3">
                          <Badge variant={statusConfig.variant} className="w-full justify-center py-2">
                              <statusConfig.icon className="h-4 w-4 mr-2" />
                              {item.status}
                          </Badge>
                      </div>
                  </Card>
                  );
              })}
              </div>
            {/* Desktop View */}
            <div className="hidden md:block rounded-md border">
              <Table>
              <TableHeader>
                  <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {returnsHistory.map((item) => {
                      const statusConfig = getStatusConfig(item.status);
                      return (
                          <TableRow key={item.id} className="transition-colors hover:bg-muted/50 cursor-pointer" onClick={() => handleOpenDetails(item)}>
                              <TableCell>
                              <div className="flex items-center gap-3">
                                  <Image
                                  src={item.image}
                                  alt={item.item}
                                  width={40}
                                  height={40}
                                  className="rounded-md"
                                  data-ai-hint={item.dataAiHint}
                                  />
                                  <span className="font-medium">{item.item}</span>
                              </div>
                              </TableCell>
                              <TableCell>
                              <Badge variant={statusConfig.variant} className="gap-1.5">
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
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Return Details: {selectedReturn?.id}</DialogTitle>
              <DialogDescription>
                Details for your returned item: {selectedReturn?.item}.
              </DialogDescription>
            </DialogHeader>
            {selectedReturn && (
              <div className="space-y-4 py-4">
                  <div className="flex items-center gap-4">
                      <Image
                          src={selectedReturn.image}
                          alt={selectedReturn.item}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                          data-ai-hint={selectedReturn.dataAiHint}
                      />
                      <div>
                        <h3 className="font-bold">{selectedReturn.item}</h3>
                        <p className="text-sm text-muted-foreground">Status: {selectedReturn.status}</p>
                        <p className="text-sm text-muted-foreground">Date: {selectedReturn.date}</p>
                      </div>
                  </div>
                  <Separator />
                  <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg"><Banknote /> Refund Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Original Item Price:</span>
                            <span>₹{selectedReturn.refundDetails.originalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Return Fee:</span>
                            <span>-₹{selectedReturn.refundDetails.returnFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base">
                            <span>Net Refund Amount:</span>
                            <span>₹{selectedReturn.refundDetails.netRefund.toFixed(2)}</span>
                        </div>
                         <Separator className="my-2" />
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Refund Status:</span>
                            <Badge variant={selectedReturn.refundDetails.refundStatus === 'Completed' ? 'default' : 'secondary'}>{selectedReturn.refundDetails.refundStatus}</Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Transaction ID:</span>
                            <span>{selectedReturn.refundDetails.transactionId}</span>
                        </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2 text-lg"><HelpCircle /> Reason for Return</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p className="text-sm text-muted-foreground italic">"{selectedReturn.reason}"</p>
                    </CardContent>
                  </Card>
                  <DialogFooter>
                      <Button variant="outline" onClick={() => handleDownloadReturnInvoice(selectedReturn)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Invoice
                      </Button>
                  </DialogFooter>
              </div>
            )}
        </DialogContent>
      </Dialog>
    </>
  );
}
