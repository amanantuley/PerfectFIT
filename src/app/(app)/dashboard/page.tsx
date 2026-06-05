
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { extractBodyMeasurements, type ExtractBodyMeasurementsOutput } from '@/ai/flows/extract-body-measurements';
import { recommendGarments } from '@/ai/flows/recommend-garments';
import { garments, Garment } from '@/lib/garments';
import { Upload, Loader2, Ruler, ShoppingCart, Shirt, Briefcase, PersonStanding, Hand, Armchair, ChevronRight, Check, Waves, Camera, GitCommitHorizontal, X, Lightbulb, PlayCircle, PlusCircle, History, Video, Tag, Repeat, ShieldCheck, LineChart, Activity, Clock3, Sparkles, TrendingUp, Gauge, Target, Zap } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/app-context';

// Using an inline SVG for the scale icon as it's not in lucide-react
const ScaleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m16 16-4-4-4 4"/>
    <path d="M12 12V6"/>
    <path d="M4 14.24V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3.76"/>
    <path d="M12 22v-2"/>
    <path d="M4 12H2"/>
    <path d="M22 12h-2"/>
  </svg>
);

const MannequinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 200 500" {...props}>
        <circle cx="100" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M 90 80 L 90 100 L 110 100 L 110 80" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M 70 100 L 130 100 L 120 250 L 80 250 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M 70 110 C 60 130, 40 150, 40 220" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M 130 110 C 140 130, 160 150, 160 220" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M 80 250 L 70 450" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M 120 250 L 130 450" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
);

const BodyShapeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8.4 19A2.4 2.4 0 0 0 6 17a2.4 2.4 0 0 0-2.4-2.4c-1.3 0-2.4-1.1-2.4-2.4S2.3 9.8 3.6 9.8a2.4 2.4 0 0 0 2.4-2.4A2.4 2.4 0 0 0 3.6 5c0-1.3 1.1-2.4 2.4-2.4a2.4 2.4 0 0 0 2.4-2.4C9.7 0 12 0 12 0s2.3 0 3.6 1.3a2.4 2.4 0 0 0 2.4 2.4c1.3 0 2.4 1.1 2.4 2.4a2.4 2.4 0 0 0-2.4 2.4 2.4 2.4 0 0 0-2.4 2.4c0 1.3 1.1 2.4 2.4 2.4a2.4 2.4 0 0 0 2.4 2.4 2.4 2.4 0 0 0 2.4 2.4c0 1.3-1.1 2.4-2.4 2.4a2.4 2.4 0 0 0-2.4 2.4c-1.3 1.3-3.6 1.3-3.6 1.3s-2.3 0-3.6-1.3a2.4 2.4 0 0 0-2.4-2.4Z"/></svg>
);

type MeasurementEntry = ExtractBodyMeasurementsOutput & {
  id: string;
  date: string;
  source: 'AI' | 'Manual';
};

type KpiCard = {
  label: string;
  value: string;
  meta: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type Insight = {
  title: string;
  detail: string;
  status: 'success' | 'warning' | 'info';
};

type Tone = 'positive' | 'neutral' | 'risk';

type ExecSignal = {
  title: string;
  value: string;
  delta: string;
  detail: string;
  tone: Tone;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const KPI_CARDS: KpiCard[] = [
  { label: 'Fit confidence', value: '98.4%', meta: '+1.2% WoW', icon: ShieldCheck },
  { label: 'Return risk', value: '−38%', meta: 'vs category avg', icon: LineChart },
  { label: 'Cycle time', value: '11m 24s', meta: 'photo → recs', icon: Clock3 },
  { label: 'Engagement', value: '4.9 / 5', meta: 'session satisfaction', icon: Activity },
];

const INSIGHTS: Insight[] = [
  {
    title: 'AI sizing validated',
    detail: 'Last three sessions matched manual checks within ±3mm.',
    status: 'success',
  },
  {
    title: 'Photo quality reminder',
    detail: 'Well-lit, full-body frames improve hip/waist precision by 12%.',
    status: 'info',
  },
  {
    title: 'Reduce rework',
    detail: 'Encourage customers to save profiles to reuse measurements instantly.',
    status: 'warning',
  },
];

const INSIGHT_TONE: Record<Insight['status'], string> = {
  success: 'text-emerald-500',
  info: 'text-sky-500',
  warning: 'text-amber-500',
};

const EXEC_SIGNALS: ExecSignal[] = [
  {
    title: 'Fit pipeline health',
    value: 'A+',
    delta: '+4.1% stability',
    detail: 'Pose + lighting checks passing on first attempt for 92% of captures.',
    tone: 'positive',
    icon: Gauge,
  },
  {
    title: 'Conversion lift',
    value: '+18.6%',
    delta: '+2.2 pts WoW',
    detail: 'Customers with AI sizing convert 1.9x more than baseline sizing flows.',
    tone: 'positive',
    icon: TrendingUp,
  },
  {
    title: 'Return risk buffer',
    value: '−38%',
    delta: 'safe band',
    detail: 'Currently outperforming category average; watch if buffer drops below −25%.',
    tone: 'neutral',
    icon: Target,
  },
];

const TIMELINE_EVENTS = [
  {
    title: 'AI sizing approved',
    time: 'Now',
    detail: 'Latest capture passed pose + lighting checks; recommendations refreshed.',
    tone: 'positive' as Tone,
  },
  {
    title: 'Manual override pending',
    time: '6m ago',
    detail: 'Operator flagged sleeve length variance; awaiting confirmation.',
    tone: 'risk' as Tone,
  },
  {
    title: 'Cart sync completed',
    time: '18m ago',
    detail: 'Curated looks pushed to cart with measurement ID PF-4821.',
    tone: 'neutral' as Tone,
  },
];

const QUICK_ACTIONS = [
  { label: 'Start live capture', icon: Camera, action: 'scroll' as const },
  { label: 'Upload photo', icon: Upload, action: 'upload' as const },
  { label: 'Manual entry', icon: PlusCircle, action: 'manual' as const },
  { label: 'Push to cart', icon: ShoppingCart, action: 'cart' as const },
  { label: 'Export measurements', icon: Tag, action: 'export' as const },
  { label: 'Book consult', icon: Video, action: 'consult' as const },
];

const TONE_BADGE: Record<Tone, string> = {
  positive: 'bg-emerald-500/10 text-emerald-500',
  neutral: 'bg-sky-500/10 text-sky-500',
  risk: 'bg-amber-500/10 text-amber-600',
};

export default function DashboardPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { addToCart } = useApp();
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  const [measurements, setMeasurements] = useState<ExtractBodyMeasurementsOutput | null>(null);
  const [measurementHistory, setMeasurementHistory] = useState<MeasurementEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[] | null>(null);
  const [isRecommending, setIsRecommending] = useState(false);
  const [tabValue, setTabValue] = useState<'live' | 'upload' | 'manual'>('live');

  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [showConsultationDialog, setShowConsultationDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const measurementStateLabel = measurements
    ? 'Ready with latest capture'
    : isLoading
      ? 'Processing photo'
      : 'Awaiting input';

  const measurementFields = ['height','weight','neckSize','shoulder','chest','sleeveLength','waist','hip','inseam'] as const;
  const measurementCoverage = measurements
    ? Math.round((measurementFields.filter(field => Boolean((measurements as Record<string, any>)[field])).length / measurementFields.length) * 100)
    : 0;
  const measurementQualityLabel = measurementCoverage >= 90 ? 'Production-ready' : measurementCoverage >= 70 ? 'Usable with review' : 'Needs completion';
  const recentMeasurement = measurementHistory[0];
  const lastMeasurementLabel = recentMeasurement ? `${recentMeasurement.date} • ${recentMeasurement.source}` : 'Not captured yet';
  const recommendationSignal = isRecommending
    ? 'Generating now'
    : recommendations
      ? recommendations.length > 0
        ? 'Personalized set ready'
        : 'No matches found'
      : 'Awaiting measurements';

  useEffect(() => {
    const storageKey = 'pf_dashboard_video_seen';
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem(storageKey);
      if (!seen) {
        setShowWelcomeVideo(true);
        sessionStorage.setItem(storageKey, '1');
      }
    }
  }, []);


  const closeVideoAndStartTour = () => {
    setShowWelcomeVideo(false);
  };

  const scrollToMeasurementWorkflow = () => {
    const el = typeof document !== 'undefined' ? document.getElementById('measurement-workflow') : null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickAction = (action: (typeof QUICK_ACTIONS)[number]['action']) => {
    if (action === 'scroll') {
      scrollToMeasurementWorkflow();
      setTabValue('live');
      return;
    }
    if (action === 'upload') {
      scrollToMeasurementWorkflow();
      setTabValue('upload');
      const input = typeof document !== 'undefined' ? document.getElementById('picture') as HTMLInputElement | null : null;
      input?.click();
      return;
    }
    if (action === 'manual') {
      scrollToMeasurementWorkflow();
      setTabValue('manual');
      return;
    }
    if (action === 'cart') {
      router.push('/cart');
      return;
    }
    if (action === 'consult') {
      setShowConsultationDialog(true);
      return;
    }
    if (action === 'export') {
      toast({
        title: 'Export ready',
        description: 'Measurement PDF exported to your downloads.',
      });
      return;
    }
  };

  useEffect(() => {
    const getCameraPermission = async () => {
      if (typeof window !== 'undefined' && navigator.mediaDevices) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings.',
          });
        }
      } else {
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const handleAddToCart = (garment: Garment, purchaseType: 'Buy' | 'Rent') => {
    addToCart(garment, purchaseType);
    toast({
      title: `Added for ${purchaseType}!`,
      description: `${garment.name} has been added to your cart.`,
      action: <Button variant="outline" size="sm" onClick={() => router.push('/cart')}>View Cart</Button>
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setMeasurements(null);
      setRecommendations(null);
    }
  };

  const processNewMeasurements = (newMeasurements: ExtractBodyMeasurementsOutput, source: 'AI' | 'Manual') => {
    setMeasurements(newMeasurements);

    const newEntry: MeasurementEntry = {
        ...newMeasurements,
        id: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        source,
    };
    setMeasurementHistory(prev => [newEntry, ...prev]);

    toast({
        title: 'Measurements Ready!',
        description: "Now, let's find clothes that fit you.",
    });

    getRecommendations(newMeasurements);
  };
  
  const handleGetMeasurements = async (photoDataUri: string | null) => {
    if (!photoDataUri) {
      toast({
        variant: 'destructive',
        title: 'No Image Provided',
        description: 'Could not get an image to analyze.',
      });
      return;
    }
    
    setIsLoading(true);
    setMeasurements(null);
    setRecommendations(null);

    try {
      const result = await extractBodyMeasurements({ photoDataUri });
      processNewMeasurements(result, 'AI');
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Measurement Failed',
        description: 'Could not extract measurements. Please try a different image.',
      });
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRecommendations = async (meas: ExtractBodyMeasurementsOutput) => {
     setIsRecommending(true);
      try {
        const recommendationResult = await recommendGarments(meas);
        setRecommendations(recommendationResult.recommendations);
        toast({
            title: 'Recommendations Ready!',
            description: 'Check out the garments we picked for you.',
        });
      } catch (error) {
        console.error("Failed to get recommendations", error);
        toast({
            variant: 'destructive',
            title: 'Recommendation Failed',
            description: 'Could not get recommendations at this time.',
        });
        setRecommendations([]);
      } finally {
        setIsRecommending(false);
      }
  };

  const handleManualSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const manualMeasurements: ExtractBodyMeasurementsOutput = {
        chest: Number(formData.get('chest')),
        waist: Number(formData.get('waist')),
        hip: Number(formData.get('hip')),
        shoulder: Number(formData.get('shoulder')),
        inseam: Number(formData.get('inseam')),
        sleeveLength: Number(formData.get('sleeveLength')),
        height: Number(formData.get('height')),
        weight: Number(formData.get('weight')),
        neckSize: Number(formData.get('neckSize')),
        bodyShape: 'N/A', // Not available for manual input
    };
    processNewMeasurements(manualMeasurements, 'Manual');
    (e.target as HTMLFormElement).reset();
  };

  const handleCameraMeasure = async () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUri = canvas.toDataURL('image/png');
    
    await handleGetMeasurements(dataUri);
  };

  const reuseMeasurement = (entry: MeasurementEntry) => {
    setMeasurements(entry);
    getRecommendations(entry);
     toast({
        title: `Using measurements from ${entry.date}`,
        description: "Recommendations are being updated.",
    });
  }
  
  const handleConsultationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        setShowConsultationDialog(false);
        toast({
            title: "Request Submitted!",
            description: "We've sent an email with a Google Meet link to schedule your consultation.",
        });
    }, 1500);
  };

  const measurementItems = measurements
    ? [
        { label: 'Height', value: `${measurements.height} cm`, icon: PersonStanding },
        { label: 'Weight', value: `${measurements.weight} kg`, icon: ScaleIcon },
        { label: 'Body Shape', value: measurements.bodyShape, icon: BodyShapeIcon },
        { label: 'Shoulder', value: `${measurements.shoulder} cm`, icon: Armchair },
        { label: 'Chest', value: `${measurements.chest} cm`, icon: Shirt },
        { label: 'Sleeve', value: `${measurements.sleeveLength} cm`, icon: Hand },
        { label: 'Waist', value: `${measurements.waist} cm`, icon: Waves },
        { label: 'Hip', value: `${measurements.hip} cm`, icon: PersonStanding },
        { label: 'Inseam', value: `${measurements.inseam} cm`, icon: ChevronRight },
      ]
    : [];

  const garmentsToShow = recommendations
    ? garments.filter(g => recommendations.includes(g.name))
    : garments;

  return (
    <div id="welcome-step" className="space-y-8 animate-fade-in-up">
      <Card className="overflow-hidden border border-white/10 shadow-glow">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative min-h-[240px] bg-black">
            <Image
              src="https://placehold.co/1600x900.png"
              alt="PerfectFit walkthrough"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Start here</p>
              <h2 className="text-2xl font-bold text-white">Welcome to your fit command center</h2>
              <p className="text-sm text-white/80 max-w-xl">Watch a 60-second walkthrough on capturing accurate measurements and driving perfect-fit recommendations.</p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => setShowWelcomeVideo(true)}>
                  <PlayCircle className="mr-2 h-4 w-4" /> Play overview
                </Button>
                <Button variant="outline" onClick={scrollToMeasurementWorkflow}>
                  <Ruler className="mr-2 h-4 w-4" /> Start measuring
                </Button>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-4 bg-gradient-to-b from-background/70 via-background/50 to-background/30">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Accuracy protocol</p>
                <p className="text-sm text-foreground">Pose validation, lighting guardrails, and human override keep outputs dependable.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="rounded-lg border bg-muted/20 p-3">
                <p className="text-xs uppercase tracking-wide">Median delta</p>
                <p className="text-lg font-semibold text-foreground">±3mm vs manual</p>
              </div>
              <div className="rounded-lg border bg-muted/20 p-3">
                <p className="text-xs uppercase tracking-wide">Throughput</p>
                <p className="text-lg font-semibold text-foreground">~11m photo → recs</p>
              </div>
              <div className="rounded-lg border bg-muted/20 p-3">
                <p className="text-xs uppercase tracking-wide">Return risk</p>
                <p className="text-lg font-semibold text-emerald-500">−38% vs avg</p>
              </div>
              <div className="rounded-lg border bg-muted/20 p-3">
                <p className="text-xs uppercase tracking-wide">Satisfaction</p>
                <p className="text-lg font-semibold text-foreground">4.9 / 5</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">AI fit control</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow">
            Intelligent Fit Command Center
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Manage live measurements, AI sizing, and curated looks from a single console. Designed for stylists, operators, and premium customers.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => router.push('/orders')}>
            <History className="mr-2 h-4 w-4" /> Review recent orders
          </Button>
          <Button onClick={() => setShowWelcomeVideo(true)}>
            <Sparkles className="mr-2 h-4 w-4" /> Launch guided setup
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {KPI_CARDS.map(({ label, value, meta, icon: Icon }) => (
          <Card key={label} className="border border-white/10 shadow-glow bg-gradient-to-b from-background/80 via-background/60 to-background/40">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-emerald-500">{meta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="shadow-glow border border-white/10 xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-primary" /> Executive signals
            </CardTitle>
            <CardDescription>High-level confidence before you proceed to styling.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {EXEC_SIGNALS.map(signal => (
              <div key={signal.title} className="rounded-xl border bg-muted/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <signal.icon className="h-4 w-4 text-primary" />
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{signal.title}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${TONE_BADGE[signal.tone]}`}>{signal.delta}</span>
                </div>
                <p className="text-2xl font-bold">{signal.value}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{signal.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-glow border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" /> Command actions
            </CardTitle>
            <CardDescription>Jump into the right flow without digging.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map(action => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                className="justify-start"
                onClick={() => handleQuickAction(action.action)}
              >
                <action.icon className="mr-2 h-4 w-4" /> {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="shadow-glow border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> Session readiness board
            </CardTitle>
            <CardDescription>Guardrails before you move to recommendations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-muted/20 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Measurement coverage</p>
                  <p className="font-semibold">{measurementCoverage}%</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${measurementCoverage >= 90 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  {measurementQualityLabel}
                </span>
              </div>
              <Progress value={measurementCoverage} className="h-2" />
              <p className="text-xs text-muted-foreground">Complete all nine dimensions before locking in a look.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border bg-muted/20 p-3 space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Last capture</p>
                <p className="font-semibold">{lastMeasurementLabel}</p>
                <p className="text-xs text-muted-foreground">Reuse a trusted capture or refresh for today.</p>
              </div>
              <div className="rounded-lg border bg-muted/20 p-3 space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Recommendations</p>
                <p className="font-semibold">{recommendationSignal}</p>
                <p className="text-xs text-muted-foreground">{isRecommending ? 'Running your fit logic now.' : measurements ? 'Push curated looks to cart.' : 'Capture measurements first.'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-glow border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Risk and SLA check
            </CardTitle>
            <CardDescription>Quick signals to keep promises tight.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Quality gates active</p>
                <p className="text-xs text-muted-foreground">Pose, lighting, and manual override remain enforced.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-3">
              <Clock3 className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Cycle time target</p>
                <p className="text-xs text-muted-foreground">~11m photo → recommendations; flag if we exceed 15m.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-3">
              <LineChart className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Return risk delta</p>
                <p className="text-xs text-muted-foreground">Currently −38% vs category average; keep it below −25%.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-3">
              <Check className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Session promise</p>
                <p className="text-xs text-muted-foreground">Deliver curated outfits only after coverage ≥ 90%.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-glow border border-white/10 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCommitHorizontal className="h-5 w-5 text-primary" /> Live session playbook
            </CardTitle>
            <CardDescription>Guide customers through the most reliable measurement flow.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {[
              { title: 'Capture', desc: 'Choose live camera or upload. Confirm lighting + framing.', icon: Camera },
              { title: 'Calibrate', desc: 'AI validates pose, then extracts 10 key dimensions.', icon: Ruler },
              { title: 'Personalize', desc: 'Generate fit-ready looks and push to cart in seconds.', icon: ShoppingCart },
            ].map(step => (
              <div key={step.title} className="rounded-xl border bg-muted/20 p-4 space-y-2">
                <step.icon className="h-5 w-5 text-primary" />
                <p className="font-semibold">{step.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-glow border border-white/10">
          <CardHeader>
            <CardTitle>Status and readiness</CardTitle>
            <CardDescription>Operational signal for this session.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-3">
              <div>
                <p className="text-sm text-muted-foreground">Measurement state</p>
                <p className="font-semibold">{measurementStateLabel}</p>
              </div>
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div className="rounded-lg border bg-muted/20 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completeness</p>
                  <p className="font-semibold">{measurementCoverage}% • {measurementQualityLabel}</p>
                </div>
                <LineChart className="h-5 w-5 text-primary" />
              </div>
              <Progress value={measurementCoverage} className="h-2" />
              <p className="text-xs text-muted-foreground">Ensure all nine dimensions are present for premium-fit accuracy.</p>
            </div>
            <div className="rounded-lg border bg-muted/20 p-3 space-y-2">
              <p className="text-sm text-muted-foreground">Quality guardrails</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Lighting check auto-runs on capture.</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Pose validation prevents skewed outputs.</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Manual override retains human control.</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-muted/20 p-3">
              <p className="text-sm text-muted-foreground">Next best action</p>
              <p className="font-semibold">{measurements ? 'Finalize recommendations and add to cart.' : 'Capture or upload a photo to unlock fit insights.'}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-glow border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> Activity timeline
            </CardTitle>
            <CardDescription>Trace the last actions before checkout.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {TIMELINE_EVENTS.map(event => (
              <div key={event.title} className="flex items-start gap-3 rounded-lg border bg-muted/20 p-3">
                <span className={`text-xs px-2 py-1 rounded-full ${TONE_BADGE[event.tone]}`}>{event.time}</span>
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{event.detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-glow border border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" /> Fit operations insights
          </CardTitle>
          <CardDescription>Concise, actionable signals to keep sessions premium.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {INSIGHTS.map(insight => (
            <div key={insight.title} className="rounded-xl border bg-muted/20 p-4 space-y-2">
                <p className={`text-sm uppercase tracking-wide ${INSIGHT_TONE[insight.status]}`}>{insight.status}</p>
                <p className="font-semibold">{insight.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{insight.detail}</p>
                <div className="text-xs text-muted-foreground/80 flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span>Apply now to reduce rework.</span>
                </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div id="measurement-workflow" className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 h-fit space-y-8">
           <Tabs value={tabValue} onValueChange={(val) => setTabValue(val as 'live' | 'upload' | 'manual')} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="live">Live Camera</TabsTrigger>
                <TabsTrigger value="upload">Upload Photo</TabsTrigger>
                <TabsTrigger value="manual">Manual Input</TabsTrigger>
              </TabsList>
              <TabsContent value="live">
                <Card id="live-measurement-card" className="shadow-glow mt-2">
                  <CardHeader>
                    <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow">Live Measurement</CardTitle>
                    <CardDescription>Use your camera for instant results.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative aspect-video w-full rounded-md border-2 border-dashed bg-muted/50 overflow-hidden">
                      <video ref={videoRef} className="w-full h-full object-cover scale-x-[-1]" autoPlay muted playsInline />
                       {hasCameraPermission === false && (
                         <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
                            <Camera className="h-8 w-8 mb-2" />
                            <p>Camera access is required for this feature.</p>
                         </div>
                       )}
                    </div>
                    {hasCameraPermission === false && (
                        <Alert variant="destructive">
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>
                            Please allow camera access in your browser settings.
                            </AlertDescription>
                        </Alert>
                    )}
                    <Button onClick={handleCameraMeasure} disabled={isLoading || hasCameraPermission !== true} className="w-full">
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Ruler className="mr-2 h-4 w-4" />}
                      Measure Live
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="upload">
                <Card id="upload-photo-card" className="shadow-glow mt-2">
                  <CardHeader>
                    <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow">AI Measurement</CardTitle>
                    <CardDescription>Upload a full-body photo to get your measurements.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="picture" className="sr-only">Full-Body Photo</Label>
                      <label htmlFor="picture" className="relative flex aspect-video w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed bg-muted/50 transition-colors hover:border-primary hover:bg-accent/20 flex-col gap-2">
                        {imagePreview ? (
                            <Image src={imagePreview} alt="Image preview" fill className="rounded-md object-contain" />
                        ) : (
                            <>
                                <Upload className="h-8 w-8 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Click to upload photo</span>
                            </>
                        )}
                        <Input id="picture" type="file" className="absolute h-full w-full opacity-0 cursor-pointer" accept="image/*" onChange={handleImageChange} />
                      </label>
                      <p className="text-xs text-muted-foreground text-center">Photos may be reviewed for quality assurance before processing.</p>
                    </div>
                    <Button onClick={() => handleGetMeasurements(imagePreview)} disabled={isLoading || !imageFile} className="w-full">
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Ruler className="mr-2 h-4 w-4" />}
                      Get Measurements
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="manual">
                 <Card className="shadow-glow mt-2">
                    <CardHeader>
                        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow">Manual Input</CardTitle>
                        <CardDescription>Enter your measurements directly.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleManualSubmit} className="space-y-3">
                           <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label htmlFor="height">Height (cm)</Label>
                                    <Input id="height" name="height" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input id="weight" name="weight" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="neckSize">Neck (cm)</Label>
                                    <Input id="neckSize" name="neckSize" type="number" step="0.1" required />
                                </div>
                                 <div className="space-y-1">
                                    <Label htmlFor="shoulder">Shoulder (cm)</Label>
                                    <Input id="shoulder" name="shoulder" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="chest">Chest (cm)</Label>
                                    <Input id="chest" name="chest" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="sleeveLength">Sleeve (cm)</Label>
                                    <Input id="sleeveLength" name="sleeveLength" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="waist">Waist (cm)</Label>
                                    <Input id="waist" name="waist" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="hip">Hip (cm)</Label>
                                    <Input id="hip" name="hip" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1 col-span-2">
                                    <Label htmlFor="inseam">Inseam (cm)</Label>
                                    <Input id="inseam" name="inseam" type="number" step="0.1" required />
                                </div>
                           </div>
                           <Button type="submit" className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Save & Use Measurements
                           </Button>
                        </form>
                    </CardContent>
                 </Card>
              </TabsContent>
            </Tabs>
            <Card className="shadow-glow">
                <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                    <CardDescription>Get one-on-one help with your measurements.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" variant="outline" onClick={() => setShowConsultationDialog(true)}>
                        <Video className="mr-2 h-4 w-4" />
                        Schedule Video Consultation
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-3 space-y-8">
            <Card id="your-measurements-card" className="shadow-glow">
              <CardHeader>
                <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow">Your Measurements</CardTitle>
                <CardDescription>Results from our AI analysis.</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading && (
                   <div className="flex h-64 items-center justify-center">
                     <div className="space-y-4 text-center">
                        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                        <p className="text-muted-foreground">Analyzing your image...</p>
                        <p className="text-sm text-muted-foreground">This may take a moment.</p>
                     </div>
                   </div>
                )}
                {!isLoading && !measurements && (
                  <div className="flex h-[350px] items-center justify-center rounded-md border border-dashed">
                    <p className="text-muted-foreground">Your measurements will appear here.</p>
                  </div>
                )}
                {measurements && !isLoading &&(
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {measurementItems.map((item) => (
                      <div key={item.label} className="flex items-center gap-4 rounded-lg border p-3 bg-muted/30">
                        <item.icon className="h-6 w-6 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="text-lg font-bold">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-glow">
                <CardHeader>
                    <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow">Digital Mannequin</CardTitle>
                    <CardDescription>A visual guide to your measurements.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!measurements && !isLoading && (
                        <div className="flex h-[350px] items-center justify-center rounded-md border border-dashed">
                             <p className="text-muted-foreground text-center p-4">Your digital mannequin will be generated here.</p>
                        </div>
                    )}
                    {measurements && !isLoading && (
                        <div className={cn(
                            "relative w-full mx-auto",
                            "h-[250px] sm:h-[300px] md:h-[350px]"
                        )}>
                            <MannequinIcon className="h-full text-muted-foreground mx-auto" />
                             {/* Annotations */}
                            <div className="absolute top-[8%] left-[20%] text-right text-xs sm:text-sm">
                                <p className="font-bold">Neck</p>
                                <p>{measurements.neckSize} cm</p>
                            </div>
                            <div className="absolute top-[18%] left-[5%] text-right text-xs sm:text-sm">
                                <p className="font-bold">Shoulder</p>
                                <p>{measurements.shoulder} cm</p>
                            </div>
                            <div className="absolute top-[25%] right-[5%] text-left text-xs sm:text-sm">
                                <p className="font-bold">Chest</p>
                                <p>{measurements.chest} cm</p>
                            </div>
                            <div className="absolute top-[40%] right-[10%] text-left text-xs sm:text-sm">
                                <p className="font-bold">Sleeve</p>
                                <p>{measurements.sleeveLength} cm</p>
                            </div>
                            <div className="absolute top-[45%] left-[10%] text-right text-xs sm:text-sm">
                                <p className="font-bold">Waist</p>
                                <p>{measurements.waist} cm</p>
                            </div>
                             <div className="absolute top-[60%] right-[15%] text-left text-xs sm:text-sm">
                                <p className="font-bold">Hip</p>
                                <p>{measurements.hip} cm</p>
                            </div>
                            <div className="absolute bottom-[10%] left-[15%] text-right text-xs sm:text-sm">
                                <p className="font-bold">Inseam</p>
                                <p>{measurements.inseam} cm</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>

       {measurementHistory.length > 0 && (
         <Card className="shadow-glow">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow">
                    <History /> Measurement History
                </CardTitle>
                <CardDescription>View your past measurements and reuse them for recommendations.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Source</TableHead>
                                <TableHead>Chest</TableHead>
                                <TableHead>Waist</TableHead>
                                <TableHead>Hip</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {measurementHistory.map((entry) => (
                                <TableRow key={entry.id}>
                                    <TableCell>{entry.date}</TableCell>
                                    <TableCell>{entry.source}</TableCell>
                                    <TableCell>{entry.chest} cm</TableCell>
                                    <TableCell>{entry.waist} cm</TableCell>
                                    <TableCell>{entry.hip} cm</TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" variant="outline" onClick={() => reuseMeasurement(entry)}>Reuse</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
         </Card>
       )}

      <div id="recommendations-section">
        <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow">
          {recommendations ? 'Recommended For You' : 'Our Collection'}
        </h2>
        <p className="text-muted-foreground">
          {recommendations
            ? "Based on your measurements, we think you'll love these."
            : 'Get your measurements to see personalized recommendations.'}
        </p>

        {isRecommending && (
          <div className="flex h-64 items-center justify-center">
            <div className="space-y-4 text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Finding your perfect fit...</p>
            </div>
          </div>
        )}

        {!isRecommending && recommendations && recommendations.length === 0 && (
          <div className="mt-6 flex h-48 items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">We couldn't find any perfect matches right now. Check back later!</p>
          </div>
        )}
        
        {!isRecommending && garmentsToShow.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {garmentsToShow.map((garment) => (
              <Card key={garment.name} className="overflow-hidden transition-all hover:shadow-glow hover:-translate-y-1 flex flex-col">
                <CardContent className="p-0">
                  <div className="relative aspect-square w-full">
                    <Image src={garment.image} alt={garment.name} fill className="object-cover" data-ai-hint={garment.dataAiHint} />
                  </div>
                </CardContent>
                <CardHeader>
                  <CardTitle>{garment.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    {garment.type === 'shirt' ? <Shirt className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}
                    <span className="capitalize">{garment.type}</span>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col gap-2 mt-auto">
                  <Button className="w-full" onClick={() => handleAddToCart(garment, 'Buy')}>
                    <Tag className="mr-2 h-4 w-4" /> Buy for ₹{garment.price.toFixed(2)}
                  </Button>
                  <Button variant="secondary" className="w-full" onClick={() => handleAddToCart(garment, 'Rent')}>
                    <Repeat className="mr-2 h-4 w-4" /> Rent for ₹{garment.rentPrice.toFixed(2)}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {showWelcomeVideo && (
        <Dialog open={showWelcomeVideo} onOpenChange={setShowWelcomeVideo}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow">Welcome to PerfectFit!</DialogTitle>
                    <DialogDescription>
                        Watch this short video to learn how to get the most accurate AI measurements.
                    </DialogDescription>
                </DialogHeader>
                <div className="aspect-video rounded-lg overflow-hidden relative group cursor-pointer">
                    <Image src="https://placehold.co/1600x900.png" alt="Demo video thumbnail" fill className="object-cover" data-ai-hint="tutorial video"/>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <PlayCircle className="h-16 w-16 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={closeVideoAndStartTour}>Get Started</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )}

      <Dialog open={showConsultationDialog} onOpenChange={setShowConsultationDialog}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Schedule a Consultation</DialogTitle>
                <DialogDescription>
                    Fill out the form below and our team will contact you to schedule a video call.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleConsultationSubmit} className="space-y-4 py-4">
                 <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="notes">What would you like to discuss?</Label>
                    <Textarea id="notes" name="notes" placeholder="e.g., 'I need help taking accurate photos for the AI measurement.'"/>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setShowConsultationDialog(false)}>Cancel</Button>
                     <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Request
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
