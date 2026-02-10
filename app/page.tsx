'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadArea from '@/components/UploadArea';
import SliderQuality from '@/components/SliderQuality';
import ImagePreview from '@/components/ImagePreview';
import { Loader2, Zap, Shield, Smartphone } from 'lucide-react';

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
    
    // Cleanup previous object URL to avoid memory leaks
    if (compressedImage) URL.revokeObjectURL(compressedImage);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('quality', quality.toString());

    try {
      const response = await fetch('/api/compress-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Gagal memproses gambar');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const size = parseInt(response.headers.get('X-Compressed-Size') || '0');

      setCompressedImage(url);
      setCompressedSize(size || blob.size);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col pt-20">
      <Header />

      <section className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Kompres Foto <span className="text-brand-600">Tanpa Ribet</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Web ini digunakan untuk mengompres gambar secara online menggunakan teknologi serverless. 
            Semua file diproses sementara dan tidak disimpan untuk menjaga privasi.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 md:p-8">
          <UploadArea onFileSelect={handleFileSelect} />

          {file && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SliderQuality quality={quality} setQuality={setQuality} disabled={isLoading} />
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleCompress}
                  disabled={isLoading}
                  className="bg-brand-600 hover:bg-brand-700 text-white text-lg font-semibold px-10 py-3 rounded-xl transition-all shadow-lg shadow-brand-500/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" /> Memproses...
                    </>
                  ) : (
                    <>
                      <Zap size={20} fill="currentColor" /> Kompres Sekarang
                    </>
                  )}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-center text-sm border border-red-100">
                  {error}
                </div>
              )}

              <ImagePreview 
                originalFile={file} 
                compressedImage={compressedImage} 
                compressedSize={compressedSize}
              />
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <Feature icon={<Zap className="text-amber-500" />} title="Cepat & Ringan" desc="Proses instan tanpa antrian server." />
          <Feature icon={<Shield className="text-brand-600" />} title="Aman & Privat" desc="File dihapus otomatis setelah diproses." />
          <Feature icon={<Smartphone className="text-emerald-500" />} title="Mobile Friendly" desc="Tampilan responsif di semua perangkat." />
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <div className="mb-4 bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  );
}
