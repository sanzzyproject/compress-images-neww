'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import UploadArea from '@/components/UploadArea';
import SliderQuality from '@/components/SliderQuality';
import ImagePreview from '@/components/ImagePreview';
import { Loader2, Smartphone, Zap, Shield, FileCheck, X, Code, Terminal, Server } from 'lucide-react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(70);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State untuk Modal Info Teknis
  const [showInfo, setShowInfo] = useState(false);

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
    <main className="min-h-screen pb-10 relative selection:bg-green-100">
      
      {/* HEADER MANUAL (Agar efek blur maksimal) */}
      <nav className="fixed top-0 left-0 w-full z-40 header-glass transition-all">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center gap-3">
          <div className="bg-black text-white p-1.5 rounded-xl shadow-lg">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            CompressImage
          </span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-28 pb-6 px-5 max-w-lg mx-auto text-center relative z-10">
        
        {/* Floating Badges (Elemen Dekoratif "Rame") */}
        <div className="absolute top-20 left-4 animate-float -z-10 opacity-60">
           <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 transform -rotate-12">
              <Shield size={20} className="text-blue-500" />
           </div>
        </div>
        <div className="absolute top-24 right-6 animate-float-delay -z-10 opacity-60">
           <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 transform rotate-6">
              <span className="text-[10px] font-bold text-green-600">Max 20MB</span>
           </div>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-bold text-gray-600 tracking-wide uppercase">System V1.0 Online</span>
        </div>
        
        {/* Headline FIX Spasi */}
        <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
          Kompresi Gambar <br/>
          seperti 
          {/* Wrapper ini memastikan teks nempel */}
          <span className="typewriter-wrapper ml-2 align-bottom">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 typewriter-text px-1">
              Magic
            </span>
          </span>
        </h1>
        
        <p className="text-sm text-gray-500 max-w-xs mx-auto mb-8 leading-relaxed font-medium">
          Optimalkan visual Anda dengan cepat. Tanpa ribet, tanpa antrian, privasi terjaga 100%.
        </p>

        {/* Tombol Navigasi */}
        <div className="flex justify-center gap-3">
          <button 
            onClick={() => document.getElementById('upload-area')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-gray-200 hover:scale-105 transition-transform"
          >
            Mulai Kompres
          </button>
          <button 
            onClick={() => setShowInfo(true)}
            className="px-6 py-2.5 bg-white text-gray-700 font-bold rounded-full border border-gray-200 text-sm hover:bg-gray-50 transition-colors shadow-sm"
          >
            Info Teknis
          </button>
        </div>
      </section>

      {/* DASHBOARD AREA */}
      <section id="upload-area" className="px-4 max-w-md mx-auto relative">
        
        {/* Dekorasi Tambahan di belakang Card */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>

        <div className="flex flex-col gap-4">
          
          {/* Upload Card */}
          <div className="card-clean p-1.5 relative group">
             {/* Badge "Free" nempel di ujung */}
             <div className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-lg z-20 shadow-lg transform group-hover:scale-110 transition-transform">
               FREE
             </div>
             <UploadArea onFileSelect={handleFileSelect} />
          </div>
          
          {/* Slider */}
          {file && (
            <div className="card-clean animate-in fade-in slide-in-from-bottom-4 duration-500">
               <SliderQuality quality={quality} setQuality={setQuality} disabled={isLoading} />
            </div>
          )}

          {/* Action Button & Result */}
          <div className="card-clean p-5 text-center bg-white relative overflow-hidden shadow-lg border-b-4 border-gray-100">
             {!file ? (
               <div className="flex flex-col items-center justify-center py-4 gap-2 opacity-40">
                  <Smartphone size={24} />
                  <p className="text-xs font-bold text-gray-400">Siap untuk Mobile</p>
               </div>
             ) : (
               <div className="z-10 relative">
                  <div className="h-48 w-full bg-[#f8fafc] rounded-2xl mb-4 overflow-hidden border border-gray-100 relative group">
                    <img 
                      src={compressedImage || URL.createObjectURL(file)} 
                      className="w-full h-full object-contain p-2" 
                      alt="Preview"
                    />
                    {compressedImage && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <FileCheck size={12} /> Selesai
                      </div>
                    )}
                  </div>

                  <button
                     onClick={handleCompress}
                     disabled={isLoading}
                     className="w-full bg-black text-white font-bold py-3.5 rounded-2xl text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-200"
                   >
                     {isLoading ? <Loader2 className="animate-spin" size={18}/> : <Zap size={18} className="text-yellow-400 fill-current" />}
                     {isLoading ? "Sedang Memproses..." : (compressedImage ? "Download Hasil Gambar" : "Kompres Sekarang")}
                   </button>
                  
                  {compressedImage && (
                     <a href={compressedImage} download={`compressed-${file.name}`} className="hidden" id="download-link"></a>
                  )}
                  {error && <p className="text-red-500 text-xs mt-2 font-semibold bg-red-50 p-2 rounded-lg">{error}</p>}
               </div>
             )}
          </div>

          {/* Stats */}
          {file && compressedImage && (
             <div className="card-clean p-5 animate-in fade-in slide-in-from-bottom-6 border-l-4 border-l-green-500">
                <ImagePreview originalFile={file} compressedImage={compressedImage} compressedSize={compressedSize} />
             </div>
          )}
        </div>
      </section>

      <footer className="text-center mt-12 text-[10px] text-gray-400 font-medium">
        © 2026 Sann404 Forum. All rights reserved.
      </footer>

      {/* --- MODAL INFO TEKNIS --- */}
      {showInfo && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center px-4 pb-4 md:pb-0">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            onClick={() => setShowInfo(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 relative z-10 animate-in slide-in-from-bottom-10 md:zoom-in-95 shadow-2xl">
            <button 
              onClick={() => setShowInfo(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={18} className="text-gray-600" />
            </button>

            <div className="mb-6">
               <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                 <Terminal size={20} className="text-black" /> Info Teknis
               </h3>
               <p className="text-xs text-gray-500 mt-1">Dokumentasi penggunaan & spesifikasi.</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                   <Code size={16} className="text-blue-500" /> Teknologi
                </h4>
                <ul className="text-xs text-gray-600 space-y-1 ml-1">
                   <li>• Framework: <b>Next.js 14 App Router</b></li>
                   <li>• Engine: <b>Sharp</b> (Serverless Image Processing)</li>
                   <li>• Language: <b>TypeScript</b> (Full Strict)</li>
                   <li>• Style: <b>Tailwind CSS</b></li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                   <Server size={16} className="text-green-500" /> Cara Kerja
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Gambar diupload ke RAM Server (bukan penyimpanan permanen), dikompres oleh library Sharp, lalu dikembalikan ke browser Anda secara instan. 100% Privasi terjaga.
                </p>
              </div>

              <div className="text-center mt-6 pt-4 border-t border-gray-100">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Developed By</p>
                 <p className="text-sm font-black text-black">SANN404 FORUM</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowInfo(false)}
              className="w-full bg-black text-white font-bold py-3 rounded-xl mt-6 text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
