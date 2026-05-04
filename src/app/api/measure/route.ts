import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import os from "os";

const execAsync = promisify(exec);

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

    // Save the file to a temporary location
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create a temp file path
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `upload_${Date.now()}_${file.name}`);
    
    fs.writeFileSync(tempFilePath, buffer);

    // Path to the python script
    const pythonScriptPath = path.join(process.cwd(), "ai", "cli.py");
    
    // Check if python is available
    const pythonCmd = process.platform === "win32" ? "python" : "python3";
    
    // Execute the python script
    const { stdout, stderr } = await execAsync(`"${pythonCmd}" "${pythonScriptPath}" "${tempFilePath}" ${heightCm}`);
    
    // Cleanup temp file
    try {
      fs.unlinkSync(tempFilePath);
    } catch (e) {
      console.warn("Failed to delete temp file:", e);
    }

    // Parse the JSON output from python
    let result;
    try {
      result = JSON.parse(stdout.trim());
    } catch (e) {
      console.error("Failed to parse python output:", stdout);
      console.error("Python stderr:", stderr);
      return NextResponse.json({ detail: "Failed to process image." }, { status: 500 });
    }

    if (result.error) {
      return NextResponse.json({ detail: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
    
  } catch (error: any) {
    console.error("Measurement API Error:", error);
    return NextResponse.json(
      { detail: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
