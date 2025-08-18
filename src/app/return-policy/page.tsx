
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Undo } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-lg animate-fade-in-up">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Undo className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                Return & Refund Policy
              </CardTitle>
              <CardDescription>Last updated: July 29, 2024</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 prose prose-stone dark:prose-invert max-w-none text-muted-foreground">
          <p>
            We want you to be completely satisfied with your PerfectFit purchase. If you are not happy with your garment, you can return it within 30 days of the delivery date for a full refund or an exchange. The item must be in its original condition: unworn, unwashed, with all tags attached.
          </p>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">1. Initiating a Return</h3>
            <p>
              To initiate a return, please log in to your account, go to the "My Orders" page, select the item you wish to return, and follow the instructions provided. If you checked out as a guest, please contact our customer support with your order number.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">2. Rental Returns</h3>
            <p>
              Rental items must be returned on or before the specified return date. We provide a prepaid return label with your order. Simply pack the garment in its original packaging and drop it off at the designated courier service. Late returns will be subject to a late fee.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">3. Damaged or Incorrect Items</h3>
            <p>
              If you receive a damaged, defective, or incorrect item, please contact our customer support within 48 hours of delivery. We will arrange for a replacement or a full refund, including any shipping costs. Please provide a photo of the damage or issue when you contact us.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">4. Refund Process</h3>
            <p>
             Once we receive and inspect your returned item, we will process your refund. Refunds will be credited to your original method of payment within 5-7 business days. You will receive an email notification once your refund has been processed. Original shipping fees are non-refundable.
            </p>
          </div>
          
           <div className="space-y-4">
            <h3 className="font-bold text-foreground">5. Non-Returnable Items</h3>
            <p>
              Custom-made garments that are tailored to your specific measurements are non-returnable and non-refundable, as they are created uniquely for you. However, if there is a fit issue, we offer one free alteration.
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <Button asChild>
                <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
