import React from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';

interface PreviewProps {
  originalFile: File | null;
  compressedImage: string | null;
  compressedSize: number | null;
}

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function ImagePreview({ originalFile, compressedImage, compressedSize }: PreviewProps) {
  if (!originalFile) return null;

  const originalUrl = URL.createObjectURL(originalFile);
  const reduction = compressedSize 
    ? ((originalFile.size - compressedSize) / originalFile.size * 100).toFixed(1)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full">
      {/* Original Image */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold uppercase">Original</span>
          <span className="text-xs font-medium text-slate-500">{formatSize(originalFile.size)}</span>
        </div>
        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-[url('/transparent-bg.png')] bg-repeat">
           {/* Note: Gunakan CSS pattern checkerboard untuk transparan di project real, di sini pakai bg-slate-50 sbg fallback */}
           <div className="absolute inset-0 bg-slate-50/50" />
           <Image src={originalUrl} alt="Original" fill className="object-contain" unoptimized />
        </div>
      </div>

      {/* Compressed Image */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-brand-100">
        {compressedImage ? (
          <>
            <div className="flex justify-between items-center mb-3">
              <span className="bg-brand-50 text-brand-600 px-2 py-1 rounded text-xs font-bold uppercase">Result</span>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-800 block">{formatSize(compressedSize || 0)}</span>
                <span className="text-[10px] text-green-600 font-bold block">-{reduction}% Size</span>
              </div>
            </div>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-50">
              <Image src={compressedImage} alt="Compressed" fill className="object-contain" unoptimized />
            </div>
            <a 
              href={compressedImage} 
              download={`sann404-compressed-${originalFile.name}`}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-xl transition-all font-medium shadow-lg shadow-brand-500/20 active:scale-95"
            >
              <Download size={18} /> Download Image
            </a>
          </>
        ) : (
          <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-lg border-2 border-dashed border-slate-100">
            <p className="text-sm">Menunggu proses...</p>
          </div>
        )}
      </div>
    </div>
  );
}
