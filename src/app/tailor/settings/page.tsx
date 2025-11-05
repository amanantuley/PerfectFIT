'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, HelpCircle } from 'lucide-react';
import { sendSupportMessage } from './actions'; // import your server action

export default function TailorSettingsPage() {
  const { toast } = useToast();
  const [supportMessage, setSupportMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSupportSubmit = async () => {
    if (!supportMessage.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a message before sending.',
      });
      return;
    }

    setIsSending(true);
    const formData = new FormData();
    formData.append('message', supportMessage);

    const result = await sendSupportMessage(null, formData);
    setIsSending(false);

    toast({
      title: result.success ? 'Message Sent!' : 'Error',
      description: result.message,
      variant: result.success ? 'default' : 'destructive',
    });

    if (result.success) setSupportMessage('');
  };

  return (
    <div className="flex justify-center items-start animate-fade-in-up">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Help & Support</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Have a question or issue? Contact the PerfectFit support team.
          </p>

          <div className="space-y-2">
            <Label htmlFor="support-message">Your Message</Label>
            <Textarea
              id="support-message"
              name="message"
              placeholder="Describe your issue here..."
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
            />
          </div>

          <Button
            onClick={handleSupportSubmit}
            disabled={isSending}
            variant="secondary"
            className="w-full"
          >
            {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Message to Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
