

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Download, Banknote, Calendar } from 'lucide-react';

const earningsHistory = [
  { payoutId: 'POUT-007', date: '2025-07-15', amount: 1250.00, status: 'Completed' },
  { payoutId: 'POUT-006', date: '2025-06-15', amount: 1100.50, status: 'Completed' },
  { payoutId: 'POUT-005', date: '2025-05-15', amount: 1300.75, status: 'Completed' },
  { payoutId: 'POUT-004', date: '2025-04-15', amount: 950.00, status: 'Completed' },
];

export default function TailorEarningsPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <Card>
        <CardHeader>
          <CardTitle className="animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent bg-size-200">Earnings Overview</CardTitle>
          <CardDescription>Track your finances and manage payouts.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          <Card className="bg-muted/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available for Payout</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,350.50</div>
            </CardContent>
            <CardFooter>
              <Button className="w-full"><Banknote className="mr-2 h-4 w-4"/>Request Payout</Button>
            </CardFooter>
          </Card>
           <Card className="bg-muted/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payout Date</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Aug 15, 2025</div>
              <p className="text-xs text-muted-foreground">Payouts are processed on the 15th of each month.</p>
            </CardContent>
          </Card>
           <Card className="bg-muted/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earned (All Time)</CardTitle>
               <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">Since joining in Jan 2025.</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle className="animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent bg-size-200">Payout History</CardTitle>
          <CardDescription>A record of all your past payouts.</CardDescription>
        </CardHeader>
        <CardContent>
           {/* Mobile View */}
            <div className="md:hidden space-y-4">
            {earningsHistory.map((payout) => (
                <Card key={payout.payoutId} className="overflow-hidden transition-all hover:shadow-md hover:bg-muted/50">
                    <CardContent className="p-4 flex flex-col gap-2">
                         <div className="flex justify-between items-center">
                            <span className="font-medium">{payout.payoutId}</span>
                            <span className="font-bold">${payout.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span>{payout.date}</span>
                            <Badge>{payout.status}</Badge>
                        </div>
                         <Button variant="outline" size="sm" className="w-full mt-2">
                            <Download className="mr-2 h-3.5 w-3.5"/>
                            Invoice
                        </Button>
                    </CardContent>
                </Card>
            ))}
            </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Payout ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {earningsHistory.map((payout) => (
                    <TableRow key={payout.payoutId} className="transition-colors hover:bg-muted/30">
                    <TableCell className="font-medium">{payout.payoutId}</TableCell>
                    <TableCell>{payout.date}</TableCell>
                    <TableCell>${payout.amount.toFixed(2)}</TableCell>
                    <TableCell>
                        <Badge>{payout.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                        <Download className="mr-2 h-3.5 w-3.5"/>
                        Invoice
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
  );
}
