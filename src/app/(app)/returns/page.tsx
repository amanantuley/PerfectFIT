
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { returnsHistory } from '@/lib/returns-data';
import { Undo, Replace, Calendar, FileText } from 'lucide-react';

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
  return (
    <div className="space-y-8 animate-fade-in-up">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-rainbow bg-size-200 animate-text-rainbow">Return & Refund Policy</CardTitle>
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
          <CardTitle className="text-rainbow bg-size-200 animate-text-rainbow">Return History</CardTitle>
          <CardDescription>A list of your past returns and replacements.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
            {returnsHistory.map((item) => {
                const statusConfig = getStatusConfig(item.status);
                return (
                <Card key={item.id} className="overflow-hidden transition-all hover:shadow-md hover:bg-muted/50">
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
                        <TableRow key={item.id} className="transition-colors hover:bg-muted/50">
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
  );
}
