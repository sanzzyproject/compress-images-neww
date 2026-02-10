import React from 'react';
import { Download, FileImage } from 'lucide-react';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Original */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-2">
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-gray-300"></span>
             <span className="text-sm font-bold text-gray-600">Original</span>
           </div>
           <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{formatSize(originalFile.size)}</span>
        </div>
        <div className="aspect-video bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden relative">
           <img src={originalUrl} className="w-full h-full object-contain" alt="Original" />
        </div>
      </div>

      {/* Result */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-2">
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-sm font-bold text-gray-900">Compressed</span>
           </div>
           <span className="text-xs font-bold text-green-600">-{reduction}%</span>
        </div>
        <div className="aspect-video bg-gray-50 rounded-2xl border border-green-200 overflow-hidden relative ring-2 ring-green-500/20">
           {compressedImage ? (
             <img src={compressedImage} className="w-full h-full object-contain" alt="Compressed" />
           ) : (
             <div className="flex items-center justify-center h-full text-gray-300">Processing...</div>
           )}
        </div>
        
        {compressedImage && (
          <a 
            href={compressedImage} 
            download={`compressed-${originalFile.name}`}
            className="block w-full text-center bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            Download Result ({formatSize(compressedSize || 0)})
          </a>
        )}
      </div>
    </div>
  );
}
