'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
} from '@/components/ui/card';
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import {
  MoreHorizontal, Plus, Star, User, StickyNote, Search,
  Loader2, Filter, Crown, MessageSquare,
} from 'lucide-react';
import { useTranslation } from '@/context/translation-provider';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

// ------- Types & seed data -------
type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

type Customer = {
  name: string;
  email: string;
  phone: string;
  orders: number;
  isPriority: boolean;
  tier: Tier;
  notes?: string[]; // persisted locally
};

const seed: Customer[] = [
  { name: 'Priya Patel',  email: 'priya.patel@example.com',  phone: '9876543211', orders: 8,  isPriority: true,  tier: 'Gold' },
  { name: 'Rohan Sharma', email: 'rohan.sharma@example.com', phone: '9876543210', orders: 5,  isPriority: false, tier: 'Silver' },
  { name: 'Sneha Reddy',  email: 'sneha.reddy@example.com',  phone: '9876543213', orders: 12, isPriority: true,  tier: 'Platinum' },
  { name: 'Amit Singh',   email: 'amit.singh@example.com',   phone: '9876543212', orders: 2,  isPriority: false, tier: 'Bronze' },
  { name: 'Vikram Mehta', email: 'vikram.mehta@example.com', phone: '9876543214', orders: 1,  isPriority: false, tier: 'Silver' },
];

const STORAGE_KEY = 'tailorCustomers.v1';

// ------- tiny debounce hook -------
function useDebounced<T>(value: T, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

// ------- Tier styling helper -------
function tierBadgeClasses(tier: Tier) {
  switch (tier) {
    case 'Gold':
      return 'text-yellow-700 border-yellow-400';
    case 'Silver':
      return 'text-gray-600 border-gray-400';
    case 'Platinum':
      return 'text-purple-700 border-purple-400';
    default:
      return 'text-amber-700 border-amber-400';
  }
}

export default function TailorCustomersPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { toast } = useToast();

  // ---------- state ----------
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounced(search, 200);

  const [filter, setFilter] = useState<'All' | 'Priority' | 'Frequent'>('All');

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addForm, setAddForm] = useState<Partial<Customer>>({
    name: '', email: '', phone: '', orders: 0, isPriority: false, tier: 'Bronze',
  });

  // ---------- load & persist ----------
  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        setCustomers(JSON.parse(cached));
        return;
      } catch {}
    }
    setCustomers(seed);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  }, [customers]);

  // ---------- derived list ----------
  const filteredCustomers = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    let list = customers.filter(c => {
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q)
      );
    });

    if (filter === 'Priority') list = list.filter(c => c.isPriority);
    if (filter === 'Frequent') list = list.filter(c => c.orders >= 5);

    // Optional: stable sort by orders desc, then name
    list.sort((a, b) => (b.orders - a.orders) || a.name.localeCompare(b.name));
    return list;
  }, [customers, debouncedSearch, filter]);

  // ---------- actions ----------
  const handleAction = (customer: Customer, action: 'details' | 'message' | 'note') => {
    setSelectedCustomer(customer);
    if (action === 'details') setIsDetailOpen(true);
    if (action === 'message') router.push('/tailor/messages');
    if (action === 'note') setIsNoteOpen(true);
  };

  const handleNoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const note = String(fd.get('note') || '').trim();
    if (!note || !selectedCustomer) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setCustomers(prev =>
        prev.map(c =>
          c.email === selectedCustomer.email
            ? { ...c, notes: [...(c.notes ?? []), note] }
            : c
        )
      );
      setIsSubmitting(false);
      setIsNoteOpen(false);
      toast({
        title: t('Note Saved'),
        description: `${t('A note for')} ${selectedCustomer.name} ${t('has been saved.')}`,
      });
    }, 600);
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    // very light validation
    if (!addForm.name || !addForm.email || !addForm.phone) {
      toast({ variant: 'destructive', title: t('Missing fields'), description: t('Please fill name, email & phone.') });
      return;
    }
    const exists = customers.some(c => c.email === addForm.email);
    if (exists) {
      toast({ variant: 'destructive', title: t('Duplicate email'), description: t('A customer with this email already exists.') });
      return;
    }

    const newCustomer: Customer = {
      name: addForm.name!,
      email: addForm.email!,
      phone: addForm.phone!,
      orders: Number(addForm.orders ?? 0),
      isPriority: Boolean(addForm.isPriority),
      tier: (addForm.tier as Tier) ?? 'Bronze',
      notes: [],
    };

    setCustomers(prev => [newCustomer, ...prev]);
    setIsAddOpen(false);
    setAddForm({ name: '', email: '', phone: '', orders: 0, isPriority: false, tier: 'Bronze' });
    toast({ title: t('Customer added'), description: newCustomer.name });
  };

  return (
    <>
      <div className="flex flex-col gap-4 animate-fade-in-up">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
                {t('Customers')}
              </CardTitle>
              <CardDescription>
                {t('Manage your customers, orders, notes and quick actions.')}
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              {t('Add Customer')}
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="relative w-full sm:w-1/2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('Search customers...')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="flex gap-2">
                {(['All', 'Priority', 'Frequent'] as const).map((type) => (
                  <Button
                    key={type}
                    variant={filter === type ? 'default' : 'outline'}
                    onClick={() => setFilter(type)}
                  >
                    <Filter className="h-4 w-4 mr-1" /> {t(type)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Table */}
            {filteredCustomers.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <User className="h-10 w-10 mx-auto mb-2 opacity-60" />
                {t('No customers found. Try adjusting filters.')}
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('Name')}</TableHead>
                      <TableHead>{t('Contact')}</TableHead>
                      <TableHead>{t('Orders')}</TableHead>
                      <TableHead>{t('Tier')}</TableHead>
                      <TableHead className="text-right">{t('Actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.email} className="hover:bg-muted/30 transition">
                        <TableCell>
                          <div className="font-medium flex items-center gap-2">
                            {customer.name}
                            {customer.isPriority && (
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{customer.email}</div>
                          <div className="text-xs text-muted-foreground">{customer.phone}</div>
                        </TableCell>
                        <TableCell>{customer.orders}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={tierBadgeClasses(customer.tier)}>
                            <Crown className="h-3 w-3 mr-1" /> {customer.tier}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleAction(customer, 'details')}>
                                {t('View Details')}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction(customer, 'message')}>
                                {t('Message')}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction(customer, 'note')}>
                                {t('Add Note')}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User /> {selectedCustomer?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedCustomer?.email} &bull; {selectedCustomer?.phone}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">{t('Order History')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('Previous orders and details will appear here.')}
              </p>
            </div>
            {selectedCustomer?.notes?.length ? (
              <div>
                <h3 className="font-semibold mb-2">{t('Notes')}</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {selectedCustomer.notes.map((n, i) => (<li key={i}>{n}</li>))}
                </ul>
              </div>
            ) : null}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              {t('Close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={isNoteOpen} onOpenChange={setIsNoteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <StickyNote /> {t('Add Note for')} {selectedCustomer?.name}
            </DialogTitle>
            <DialogDescription>
              {t('Add a private note. This is visible only to you.')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNoteSubmit} className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="note">{t('Note')}</Label>
              <Textarea id="note" name="note" placeholder={t('e.g. Prefers a specific type of lining...')} rows={4} />
            </div>
            <DialogFooter>
              <Button variant="ghost" type="button" onClick={() => setIsNoteOpen(false)}>
                {t('Cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('Save Note')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Customer Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User /> {t('Add Customer')}
            </DialogTitle>
            <DialogDescription>
              {t('Create a new customer record.')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddCustomer} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('Name')}</Label>
                <Input
                  id="name"
                  value={addForm.name ?? ''}
                  onChange={(e) => setAddForm(s => ({ ...s, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('Email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={addForm.email ?? ''}
                  onChange={(e) => setAddForm(s => ({ ...s, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('Phone')}</Label>
                <Input
                  id="phone"
                  value={addForm.phone ?? ''}
                  onChange={(e) => setAddForm(s => ({ ...s, phone: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orders">{t('Orders')}</Label>
                <Input
                  id="orders"
                  type="number"
                  min={0}
                  value={addForm.orders ?? 0}
                  onChange={(e) => setAddForm(s => ({ ...s, orders: Number(e.target.value || 0) }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tier">{t('Tier')}</Label>
                <Input
                  id="tier"
                  list="tiers"
                  value={addForm.tier ?? 'Bronze'}
                  onChange={(e) => setAddForm(s => ({ ...s, tier: e.target.value as Tier }))}
                />
                <datalist id="tiers">
                  <option value="Bronze" />
                  <option value="Silver" />
                  <option value="Gold" />
                  <option value="Platinum" />
                </datalist>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">{t('Priority')}</Label>
                <div className="flex items-center gap-2">
                  <input
                    id="priority"
                    type="checkbox"
                    checked={Boolean(addForm.isPriority)}
                    onChange={(e) => setAddForm(s => ({ ...s, isPriority: e.target.checked }))}
                  />
                  <span className="text-sm text-muted-foreground">{t('Mark as priority')}</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>
                {t('Cancel')}
              </Button>
              <Button type="submit">
                <MessageSquare className="mr-2 h-4 w-4" />
                {t('Save Customer')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
