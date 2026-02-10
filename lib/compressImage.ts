import sharp from "sharp";

export async function processImage(
  buffer: Buffer,
  mimeType: string,
  quality: number
): Promise<{ buffer: Buffer; contentType: string }> {
  let processedBuffer: Buffer;
  let contentType = mimeType;

  // Pastikan quality di rentang 1-100
  const q = Math.max(1, Math.min(100, quality));

  try {
    if (mimeType === "image/png") {
      // PNG compression level (0-9) di-map dari quality slider
      // Namun sharp PNG 'quality' option memerlukan palette (lossy)
      // Kita gunakan pendekatan hybrid
      processedBuffer = await sharp(buffer)
        .png({ quality: q, compressionLevel: 8, palette: true })
        .toBuffer();
    } else if (mimeType === "image/webp") {
      processedBuffer = await sharp(buffer)
        .webp({ quality: q })
        .toBuffer();
    } else {
      // Default JPG
      processedBuffer = await sharp(buffer)
        .jpeg({ quality: q, mozjpeg: true })
        .toBuffer();
      contentType = "image/jpeg";
    }

    return { buffer: processedBuffer, contentType };
  } catch (error) {
    throw new Error("Failed to process image via Sharp");
  }
}
