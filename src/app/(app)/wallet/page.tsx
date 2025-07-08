'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Wallet, DollarSign, PlusCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const transactionHistory = [
  { id: 'TXN789', type: 'Top-up', amount: 50.00, status: 'Completed', date: '2024-07-20' },
  { id: 'TXN788', type: 'Purchase', amount: -25.50, status: 'Completed', date: '2024-07-18' },
  { id: 'TXN787', type: 'Cashback', amount: 1.28, status: 'Completed', date: '2024-07-18' },
  { id: 'TXN786', type: 'Subscription', amount: -59.00, status: 'Completed', date: '2024-07-01' },
  { id: 'TXN785', type: 'Cashback', amount: 2.95, status: 'Completed', date: '2024-07-01' },
];

export default function WalletPage() {
    const { toast } = useToast();
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);
    const [topUpAmount, setTopUpAmount] = useState('');

    const handleTopUp = () => {
        if (!topUpAmount || +topUpAmount <= 0) {
            toast({
                variant: 'destructive',
                title: 'Invalid Amount',
                description: 'Please enter a valid amount to top up.',
            });
            return;
        }
        toast({
            title: 'Success!',
            description: `Successfully added $${topUpAmount} to your PerfectPay wallet.`,
        });
        setIsTopUpOpen(false);
        setTopUpAmount('');
        // In a real app, you would update the user's balance here.
    };

    return (
        <>
            <div className="space-y-8">
                <Card className="shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-3xl flex items-center gap-3">
                                <Wallet className="h-8 w-8" />
                                PerfectPay Wallet
                            </CardTitle>
                            <CardDescription>Your personal wallet for seamless, one-click payments.</CardDescription>
                        </div>
                        <Button onClick={() => setIsTopUpOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Money
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg border bg-muted/30 p-6 flex flex-col items-center justify-center text-center">
                            <p className="text-sm text-muted-foreground">Current Balance</p>
                            <p className="text-5xl font-bold tracking-tight flex items-center">
                                <DollarSign className="h-10 w-10 text-muted-foreground" />
                                50.00
                            </p>
                            <p className="text-xs text-primary mt-1">5% cashback on all payments made with PerfectPay!</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>A record of your recent PerfectPay wallet activity.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Transaction ID</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactionHistory.map((tx) => (
                                        <TableRow key={tx.id}>
                                            <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                                            <TableCell>
                                                <Badge variant={tx.type === 'Cashback' ? 'default' : tx.type === 'Top-up' ? 'secondary' : 'outline'}>{tx.type}</Badge>
                                            </TableCell>
                                            <TableCell>{tx.status}</TableCell>
                                            <TableCell className={`text-right font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-right">{tx.date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen}>
                <DialogContent className="sm:max-w-xs">
                    <DialogHeader>
                        <DialogTitle>Add Money to PerfectPay</DialogTitle>
                        <DialogDescription>
                            Top up your wallet to enjoy seamless payments and earn cashback.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount ($)</Label>
                        <Input 
                            id="amount" 
                            type="number" 
                            placeholder="e.g. 50" 
                            value={topUpAmount}
                            onChange={(e) => setTopUpAmount(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsTopUpOpen(false)}>Cancel</Button>
                        <Button onClick={handleTopUp}>Top Up</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
