import { NextRequest, NextResponse } from "next/server";
import { extractBodyMeasurements } from "@/ai/flows/extract-body-measurements";

function recommendSize(height: number, shoulder: number, hip: number, neck: number): string {
  const ratioShoulder = (shoulder / height) * 100;
  const ratioHip = shoulder > 0 ? hip / shoulder : 1.0;
  const ratioNeck = shoulder > 0 ? neck / shoulder : 0.5;

  let size = "M";
  if (height < 160 || ratioShoulder < 16.5) {
    size = "S";
  } else if (height >= 160 && height < 170 && ratioShoulder >= 16.5 && ratioShoulder < 18.0) {
    size = "M";
  } else if (height >= 170 && height < 178 && ratioShoulder >= 18.0 && ratioShoulder < 19.0) {
    size = "L";
  } else if (height >= 178 && height < 186 && ratioShoulder >= 19.0 && ratioShoulder < 20.5) {
    size = "XL";
  } else if (height >= 186 || ratioShoulder >= 20.5) {
    size = "XXL";
  }

  if (ratioHip > 1.25) {
    size = "XL";
  } else if (ratioNeck > 1.15) {
    size = "XXL";
  }

  return size;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const heightStr = formData.get("height") as string | null;

    if (!file) {
      return NextResponse.json({ detail: "No file provided" }, { status: 400 });
    }
    if (!heightStr || isNaN(parseFloat(heightStr))) {
      return NextResponse.json({ detail: "Valid height is required for highest accuracy." }, { status: 400 });
    }

    const heightCm = parseFloat(heightStr);

    // Convert file to Base64 Data URL
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/jpeg";
    const base64Image = buffer.toString("base64");
    const photoDataUri = `data:${mimeType};base64,${base64Image}`;

    // Invoke Gemini AI Genkit Flow
    const result = await extractBodyMeasurements({ photoDataUri, height: heightCm });

    if (!result) {
      return NextResponse.json({ detail: "Failed to extract measurements from the image." }, { status: 500 });
    }

    // Map Genkit output to matching frontend UI keys
    const mappedMeasurements = {
      "Height": result.height || heightCm,
      "Shoulder Width": result.shoulder,
      "Chest": result.chest,
      "Waist": result.waist,
      "Hip Width": result.hip,
      "Arm Length": result.sleeveLength,
      "Leg Length": result.inseam,
      "Neck Circumference": result.neckSize,
      "Weight": result.weight,
      "Body Shape": result.bodyShape
    };

    const recommendedSize = recommendSize(
      mappedMeasurements["Height"],
      mappedMeasurements["Shoulder Width"],
      mappedMeasurements["Hip Width"],
      mappedMeasurements["Neck Circumference"]
    );

    // Estimate a mock scale factor since Gemini calculates measurements semantically
    const scaleCmPerPx = heightCm / 700;

    return NextResponse.json({
      success: true,
      measurements: mappedMeasurements,
      recommended_size: recommendedSize,
      scale_cm_per_px: scaleCmPerPx
    });
    
  } catch (error: any) {
    console.error("Measurement API Error:", error);
    return NextResponse.json(
      { detail: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
