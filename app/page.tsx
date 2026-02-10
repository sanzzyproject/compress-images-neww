'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import UploadArea from '@/components/UploadArea';
import SliderQuality from '@/components/SliderQuality';
import ImagePreview from '@/components/ImagePreview';
import { Loader2, Smartphone, Zap } from 'lucide-react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(70);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setCompressedImage(null);
    setCompressedSize(null);
    setError(null);
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    if (compressedImage) URL.revokeObjectURL(compressedImage);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('quality', quality.toString());

    try {
      const response = await fetch('/api/compress-image', { method: 'POST', body: formData });
      if (!response.ok) throw new Error((await response.json()).error || 'Failed');

      const blob = await response.blob();
      setCompressedImage(URL.createObjectURL(blob));
      setCompressedSize(parseInt(response.headers.get('X-Compressed-Size') || '0') || blob.size);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pb-10">
      <Header />

      {/* HERO SECTION */}
      <section className="pt-24 pb-6 px-5 max-w-lg mx-auto text-center">
        
        {/* Badge Kecil */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-100 shadow-sm mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-bold text-gray-600 tracking-wide uppercase">V1.0 Live</span>
        </div>
        
        {/* Headline dengan Typing Effect */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
          Kompresi Gambar <br/>
          seperti <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 typewriter-text">Magic</span>
        </h1>
        
        <p className="text-sm text-gray-500 max-w-xs mx-auto mb-8 leading-relaxed">
          Optimalkan visual Anda dengan cepat. Tanpa ribet, tanpa antrian, privasi terjaga.
        </p>

        {/* Tombol yang lebih proporsional */}
        <div className="flex justify-center gap-3">
          <button 
            onClick={() => document.getElementById('upload-area')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary px-6 py-2.5 shadow-lg shadow-gray-200 hover:shadow-xl"
          >
            Mulai Kompres
          </button>
          <button className="px-6 py-2.5 bg-white text-gray-700 font-semibold rounded-full border border-gray-200 text-sm hover:bg-gray-50 transition-colors">
            Info Teknis
          </button>
        </div>
      </section>

      {/* DASHBOARD AREA */}
      <section id="upload-area" className="px-4 max-w-md mx-auto">
        <div className="flex flex-col gap-4">
          
          {/* Upload Card */}
          <div className="card-clean p-1.5">
             <UploadArea onFileSelect={handleFileSelect} />
          </div>
          
          {/* Slider (Muncul setelah file dipilih) */}
          {file && (
            <div className="card-clean animate-in fade-in slide-in-from-bottom-4 duration-500">
               <SliderQuality quality={quality} setQuality={setQuality} disabled={isLoading} />
            </div>
          )}

          {/* Action Button & Result */}
          <div className="card-clean p-5 text-center bg-white relative overflow-hidden">
             {!file ? (
               <div className="flex flex-col items-center justify-center py-4 gap-2 opacity-50">
                  <Smartphone size={24} />
                  <p className="text-xs font-medium">Siap untuk Mobile</p>
               </div>
             ) : (
               <div className="z-10 relative">
                  {/* Preview Kecil */}
                  <div className="h-40 w-full bg-gray-50 rounded-xl mb-4 overflow-hidden border border-gray-100 relative">
                    <img 
                      src={compressedImage || URL.createObjectURL(file)} 
                      className="w-full h-full object-contain" 
                      alt="Preview"
                    />
                    {compressedImage && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        Selesai
                      </div>
                    )}
                  </div>

                  <button
                     onClick={handleCompress}
                     disabled={isLoading}
                     className="w-full bg-black text-white font-bold py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                   >
                     {isLoading ? <Loader2 className="animate-spin" size={16}/> : <Zap size={16} />}
                     {isLoading ? "Memproses..." : (compressedImage ? "Download Hasil" : "Kompres Sekarang")}
                   </button>
                  
                  {compressedImage && (
                     <a href={compressedImage} download={`compressed-${file.name}`} className="hidden" id="download-link"></a>
                  )}
                  {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
               </div>
             )}
          </div>

          {/* Detailed Stats (Only visible if compressed) */}
          {file && compressedImage && (
             <div className="card-clean p-5 animate-in fade-in slide-in-from-bottom-6">
                <ImagePreview originalFile={file} compressedImage={compressedImage} compressedSize={compressedSize} />
             </div>
          )}
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="text-center mt-10 text-[10px] text-gray-400">
        © 2026 Sann404. Serverless Tech.
      </footer>
    </main>
  );
}
