"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Camera, Upload, RefreshCw, Loader2, Info } from "lucide-react";
import Image from "next/image";

export default function MeasurePage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const resetForm = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyzeImage = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/api/measure", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to analyze image");
      }

      setResult(data);
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          PerfectFit AI Measurement
        </h1>
        <p className="text-xl text-muted-foreground">
          Upload a full-body photo to get your precise measurements and recommended size.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Image Upload</CardTitle>
            <CardDescription>
              Ensure an A4 paper is visible for automatic calibration, and your full body is in the frame.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col items-center justify-center">
            {previewUrl ? (
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border">
                <Image 
                  src={previewUrl} 
                  alt="Preview" 
                  fill 
                  className="object-contain bg-muted/30"
                />
              </div>
            ) : (
              <div 
                className="w-full aspect-[3/4] border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={handleUploadClick}
              >
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-2">Click to upload photo</h3>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG up to 10MB
                </p>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </CardContent>
          <CardFooter className="flex justify-between gap-4">
            {previewUrl ? (
              <>
                <Button variant="outline" onClick={resetForm} className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" /> Retake
                </Button>
                <Button 
                  onClick={analyzeImage} 
                  disabled={loading} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-4 w-4" /> Get Measurements
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={handleUploadClick} className="w-full">
                Select Photo
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              Your AI-extracted body measurements.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {error && (
              <div className="bg-destructive/15 text-destructive border border-destructive/30 rounded-lg p-4 mb-4 flex items-start">
                <Info className="h-5 w-5 mr-3 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Analysis Failed</h4>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {!result && !error && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground min-h-[300px]">
                <Camera className="h-12 w-12 mb-4 opacity-20" />
                <p>Upload an image to see your measurements here.</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground min-h-[300px]">
                <Loader2 className="h-12 w-12 mb-4 animate-spin text-blue-500" />
                <p>Analyzing image with Mediapipe...</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-6 border border-blue-500/20 text-center">
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">Recommended Size</h3>
                  <div className="text-5xl font-black text-blue-600 dark:text-blue-400">
                    {result.recommended_size}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Detailed Measurements</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(result.measurements).map(([key, value]) => (
                      <div key={key} className="bg-muted/40 rounded-lg p-4 border">
                        <p className="text-sm text-muted-foreground mb-1">{key}</p>
                        <p className="text-xl font-semibold">{String(value)} <span className="text-sm font-normal text-muted-foreground">cm</span></p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground text-center mt-4 pt-4 border-t">
                  Scale: {result.scale_cm_per_px.toFixed(4)} cm/px
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
