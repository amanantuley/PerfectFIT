
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { extractBodyMeasurements, type ExtractBodyMeasurementsOutput } from '@/ai/flows/extract-body-measurements';
import { recommendGarments } from '@/ai/flows/recommend-garments';
import { garments } from '@/lib/garments';
import { Upload, Loader2, Ruler, ShoppingCart, Shirt, Briefcase, PersonStanding, Hand, Armchair, ChevronRight, Check, Waves, Camera, GitCommitHorizontal, X, Lightbulb, PlayCircle, PlusCircle, History, Video } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

export default function DashboardPage() {
  const { toast } = useToast();
  const router = useRouter();
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  const [measurements, setMeasurements] = useState<ExtractBodyMeasurementsOutput | null>(null);
  const [measurementHistory, setMeasurementHistory] = useState<MeasurementEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[] | null>(null);
  const [isRecommending, setIsRecommending] = useState(false);

  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);


  useEffect(() => {
    // Show the video every time the user visits the dashboard
    setShowWelcomeVideo(true);
  }, []);
  
  const closeVideoAndStartTour = () => {
    setShowWelcomeVideo(false);
  }

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

  const measurementItems = measurements
    ? [
        { label: 'Height', value: `${measurements.height}"`, icon: PersonStanding },
        { label: 'Weight', value: `${measurements.weight} lbs`, icon: ScaleIcon },
        { label: 'Body Shape', value: measurements.bodyShape, icon: BodyShapeIcon },
        { label: 'Shoulder', value: `${measurements.shoulder}"`, icon: Armchair },
        { label: 'Chest', value: `${measurements.chest}"`, icon: Shirt },
        { label: 'Sleeve', value: `${measurements.sleeveLength}"`, icon: Hand },
        { label: 'Waist', value: `${measurements.waist}"`, icon: Waves },
        { label: 'Hip', value: `${measurements.hip}"`, icon: PersonStanding },
        { label: 'Inseam', value: `${measurements.inseam}"`, icon: ChevronRight },
      ]
    : [];

  const garmentsToShow = recommendations
    ? garments.filter(g => recommendations.includes(g.name))
    : garments;

  return (
    <div id="welcome-step" className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-5">
        <div className="xl:col-span-2 h-fit space-y-8">
           <Tabs defaultValue="live" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="live">Live Camera</TabsTrigger>
                <TabsTrigger value="upload">Upload Photo</TabsTrigger>
                <TabsTrigger value="manual">Manual Input</TabsTrigger>
              </TabsList>
              <TabsContent value="live">
                <Card id="live-measurement-card" className="shadow-lg mt-2">
                  <CardHeader>
                    <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Live Measurement</CardTitle>
                    <CardDescription>Use your camera for instant results.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative flex h-48 w-full items-center justify-center rounded-md border-2 border-dashed bg-muted/50 overflow-hidden">
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
                <Card id="upload-photo-card" className="shadow-lg mt-2">
                  <CardHeader>
                    <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">AI Measurement</CardTitle>
                    <CardDescription>Upload a full-body photo to get your measurements.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="picture" className="sr-only">Full-Body Photo</Label>
                      <label htmlFor="picture" className="relative flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed bg-muted/50 transition-colors hover:border-primary hover:bg-accent/20 flex-col gap-2">
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
                 <Card className="shadow-lg mt-2">
                    <CardHeader>
                        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Manual Input</CardTitle>
                        <CardDescription>Enter your measurements directly.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleManualSubmit} className="space-y-3">
                           <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label htmlFor="height">Height (in)</Label>
                                    <Input id="height" name="height" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="weight">Weight (lbs)</Label>
                                    <Input id="weight" name="weight" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="neckSize">Neck (in)</Label>
                                    <Input id="neckSize" name="neckSize" type="number" step="0.1" required />
                                </div>
                                 <div className="space-y-1">
                                    <Label htmlFor="shoulder">Shoulder (in)</Label>
                                    <Input id="shoulder" name="shoulder" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="chest">Chest (in)</Label>
                                    <Input id="chest" name="chest" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="sleeveLength">Sleeve (in)</Label>
                                    <Input id="sleeveLength" name="sleeveLength" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="waist">Waist (in)</Label>
                                    <Input id="waist" name="waist" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="hip">Hip (in)</Label>
                                    <Input id="hip" name="hip" type="number" step="0.1" required />
                                </div>
                                <div className="space-y-1 col-span-2">
                                    <Label htmlFor="inseam">Inseam (in)</Label>
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
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                    <CardDescription>Get one-on-one help with your measurements.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" variant="outline" onClick={() => toast({ title: "Coming Soon!", description: "Video consultations will be available soon." })}>
                        <Video className="mr-2 h-4 w-4" />
                        Schedule Video Consultation
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="xl:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card id="your-measurements-card" className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Your Measurements</CardTitle>
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
                  <div className="grid grid-cols-2 gap-4">
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

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Digital Mannequin</CardTitle>
                    <CardDescription>A visual guide to your measurements.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!measurements && !isLoading && (
                        <div className="flex h-[350px] items-center justify-center rounded-md border border-dashed">
                             <p className="text-muted-foreground text-center p-4">Your digital mannequin will be generated here.</p>
                        </div>
                    )}
                    {measurements && !isLoading && (
                        <div className="relative h-[350px] w-full flex justify-center items-center">
                            <MannequinIcon className="h-full text-muted-foreground" />
                             {/* Annotations */}
                            <div className="absolute top-[8%] left-[20%] text-right text-xs">
                                <p className="font-bold">Neck</p>
                                <p>{measurements.neckSize}"</p>
                            </div>
                            <div className="absolute top-[18%] left-[5%] text-right text-xs">
                                <p className="font-bold">Shoulder</p>
                                <p>{measurements.shoulder}"</p>
                            </div>
                            <div className="absolute top-[25%] right-[5%] text-left text-xs">
                                <p className="font-bold">Chest</p>
                                <p>{measurements.chest}"</p>
                            </div>
                            <div className="absolute top-[40%] right-[10%] text-left text-xs">
                                <p className="font-bold">Sleeve</p>
                                <p>{measurements.sleeveLength}"</p>
                            </div>
                            <div className="absolute top-[45%] left-[10%] text-right text-xs">
                                <p className="font-bold">Waist</p>
                                <p>{measurements.waist}"</p>
                            </div>
                             <div className="absolute top-[60%] right-[15%] text-left text-xs">
                                <p className="font-bold">Hip</p>
                                <p>{measurements.hip}"</p>
                            </div>
                            <div className="absolute bottom-[10%] left-[15%] text-right text-xs">
                                <p className="font-bold">Inseam</p>
                                <p>{measurements.inseam}"</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
          </div>
        </div>
      </div>

       {measurementHistory.length > 0 && (
         <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                    <History /> Measurement History
                </CardTitle>
                <CardDescription>View your past measurements and reuse them for recommendations.</CardDescription>
            </CardHeader>
            <CardContent>
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
                                <TableCell>{entry.chest}"</TableCell>
                                <TableCell>{entry.waist}"</TableCell>
                                <TableCell>{entry.hip}"</TableCell>
                                <TableCell className="text-right">
                                    <Button size="sm" variant="outline" onClick={() => reuseMeasurement(entry)}>Reuse</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
         </Card>
       )}

      <div id="recommendations-section">
        <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
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
              <Card key={garment.name} className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
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
                <CardFooter className="flex gap-2">
                  <Button className="w-full" onClick={() => router.push('/cart')}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Customize & Buy
                  </Button>
                  <Button variant="secondary" className="w-full" onClick={() => toast({ title: `${garment.name} added for rent!` })}>
                    Rent
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
                    <DialogTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Welcome to PerfectFit!</DialogTitle>
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
    </div>
  );
}
