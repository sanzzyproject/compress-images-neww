'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadArea from '@/components/UploadArea';
import SliderQuality from '@/components/SliderQuality';
import ImagePreview from '@/components/ImagePreview';
import { Loader2, Zap, Shield, Smartphone, ChevronRight } from 'lucide-react';

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
      if (!response.ok) throw new Error((await response.json()).error || 'Gagal');

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
    <main className="min-h-screen flex flex-col bg-slate-50/50">
      <Header />

      <section className="flex-grow max-w-4xl mx-auto w-full px-4 pt-24 pb-12">
        
        {/* Compact Hero */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
            Kompres Foto <span className="text-brand-600">Kilat</span>
          </h1>
          <p className="text-sm md:text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
            Kecilkan ukuran foto tanpa pecah. Aman, gratis, tanpa simpan data.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 p-5 md:p-8">
          
          <UploadArea onFileSelect={handleFileSelect} />

          {file && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 mt-6">
              <SliderQuality quality={quality} setQuality={setQuality} disabled={isLoading} />
              
              <div className="mt-6">
                <button
                  onClick={handleCompress}
                  disabled={isLoading}
                  className="w-full bg-slate-900 hover:bg-black text-white text-base font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 disabled:opacity-70"
                >
                  {isLoading ? (
                    <> <Loader2 className="animate-spin" size={18} /> Memproses... </>
                  ) : (
                    <> Kompres Sekarang <ChevronRight size={18} /> </>
                  )}
                </button>
              </div>
              
              {error && <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center border border-red-100">{error}</div>}

              <ImagePreview originalFile={file} compressedImage={compressedImage} compressedSize={compressedSize} />
            </div>
          )}
        </div>

        {/* Mini Features (Grid 3 di Desktop, Scroll Horizontal di Mobile) */}
        <div className="mt-10 grid grid-cols-3 gap-3 md:gap-6">
           <MiniFeature icon={<Zap size={16} />} title="Cepat" desc="Proses Instan" />
           <MiniFeature icon={<Shield size={16} />} title="Aman" desc="Tanpa Database" />
           <MiniFeature icon={<Smartphone size={16} />} title="Ringan" desc="Mobile First" />
        </div>

        {/* Documentation / Info Compact */}
        <div className="mt-12 pt-8 border-t border-slate-200">
           <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Spesifikasi</h3>
           <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-2 text-xs md:text-sm text-slate-600">
              <div className="flex justify-between"><span>Framework</span> <span className="font-semibold">Next.js 14 App Router</span></div>
              <div className="flex justify-between"><span>Engine</span> <span className="font-semibold">Sharp (Serverless)</span></div>
              <div className="flex justify-between"><span>Privacy</span> <span className="font-semibold">RAM Processing Only</span></div>
           </div>
        </div>

      </section>
      
      <Footer />
    </main>
  );
}

function MiniFeature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-3 md:p-4 rounded-xl border border-slate-100 text-center shadow-sm">
       <div className="mx-auto w-8 h-8 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-2">{icon}</div>
       <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
       <p className="text-[10px] md:text-xs text-slate-400 hidden md:block">{desc}</p>
    </div>
  )
}
