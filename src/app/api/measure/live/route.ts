import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST() {
  try {
    const pythonScriptPath = path.join(process.cwd(), "ai", "app.py");
    const pythonCmd = process.platform === "win32" ? "python" : "python3";
    
    // We use spawn in detached mode so it opens the window independently
    // without blocking the API response or crashing if the API timeouts.
    const child = spawn(pythonCmd, [pythonScriptPath], {
      detached: true,
      stdio: "ignore", // Don't pipe output to prevent blocking
      cwd: path.join(process.cwd(), "ai") // Ensure it runs in the ai folder so it finds the csv
    });

    child.unref(); // Allow the parent process to exit independently

    return NextResponse.json({ success: true, detail: "Live capturing started." });
  } catch (error: any) {
    console.error("Live Camera API Error:", error);
    return NextResponse.json(
      { detail: error.message || "Failed to start live camera" },
      { status: 500 }
    );
  }
}
