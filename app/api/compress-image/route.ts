import { NextRequest, NextResponse } from "next/server";
import { processImage } from "@/lib/compressImage";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const quality = formData.get("quality");

    // 1. Validasi Keberadaan File
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 2. Validasi Ukuran (Hard Limit Backend 20MB)
    const MAX_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 20MB." },
        { status: 413 }
      );
    }

    // 3. Validasi Tipe File
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file format. Only JPG, PNG, WEBP allowed." },
        { status: 400 }
      );
    }

    // 4. Proses Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const qualityInt = quality ? parseInt(quality.toString()) : 70;

    const result = await processImage(buffer, file.type, qualityInt);

    // 5. Return Result Stream
    return new NextResponse(result.buffer, {
      status: 200,
      headers: {
        "Content-Type": result.contentType,
        "Content-Length": result.buffer.length.toString(),
        "X-Original-Size": file.size.toString(),
        "X-Compressed-Size": result.buffer.length.toString(),
      },
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error during compression" },
      { status: 500 }
    );
  }
}
