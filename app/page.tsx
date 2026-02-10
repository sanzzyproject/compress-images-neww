'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadArea from '@/components/UploadArea';
import SliderQuality from '@/components/SliderQuality';
import ImagePreview from '@/components/ImagePreview';
import { Loader2, Zap, Shield, Smartphone, Code, Server, Lock, CheckCircle2 } from 'lucide-react';

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
      if (!response.ok) throw new Error((await response.json()).error || 'Gagal memproses gambar');

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
    <main className="min-h-screen flex flex-col bg-[#f8fafc] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-200/30 blur-[120px] mix-blend-multiply animate-blob"></div>
         <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-200/30 blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"></div>
         <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-pink-200/30 blur-[120px] mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <Header />

      <section className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Kompres Foto, <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">Tanpa Kompromi Kualitas.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Platform kompresi gambar generasi berikutnya. Cepat, aman, dan sepenuhnya gratis.
            Didukung oleh teknologi serverless yang canggih untuk privasi maksimal Anda.
          </p>
        </div>

        {/* Main App Card */}
        <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 p-8 md:p-12 relative overflow-hidden">
          {/* Card Decor */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 via-brand-500 to-purple-500"></div>

          <UploadArea onFileSelect={handleFileSelect} />

          {file && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-forwards mt-10">
              <SliderQuality quality={quality} setQuality={setQuality} disabled={isLoading} />
              
              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleCompress}
                  disabled={isLoading}
                  className="relative group bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white text-xl font-bold px-12 py-5 rounded-2xl transition-all shadow-[0_10px_30px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.6)] flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  {isLoading ? (
                    <> <Loader2 className="animate-spin" size={26} /> Sedang Memproses... </>
                  ) : (
                    <> <Zap size={26} fill="currentColor" className="text-yellow-300" /> Kompres Sekarang </>
                  )}
                </button>
              </div>
              
              {error && <div className="mt-6 p-4 bg-red-50/80 backdrop-blur-sm text-red-600 rounded-2xl text-center font-medium border border-red-100">{error}</div>}

              <ImagePreview originalFile={file} compressedImage={compressedImage} compressedSize={compressedSize} />
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <FeatureCard icon={<Zap className="text-white" size={28} />} title="Instan & Cepat" desc="Diproses dalam milidetik menggunakan arsitektur serverless modern tanpa antrian." color="from-yellow-400 to-orange-500" />
          <FeatureCard icon={<Shield className="text-white" size={28} />} title="Privasi Terjamin" desc="File Anda diproses di RAM dan langsung dihapus. Tidak ada penyimpanan permanen." color="from-brand-500 to-cyan-500" />
          <FeatureCard icon={<Smartphone className="text-white" size={28} />} title="Desain Responsif" desc="Pengalaman pengguna yang mulus di desktop, tablet, dan perangkat seluler." color="from-green-400 to-emerald-500" />
        </div>

        {/* Documentation Section (BARU) */}
        <div className="mt-32" id="docs">
          <div className="text-center mb-12">
             <span className="text-brand-600 font-bold tracking-wider uppercase text-sm mb-3 block">Dokumentasi Teknis</span>
             <h2 className="text-4xl font-extrabold text-slate-900">Tentang Platform Ini</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
             {/* Tech Stack Card */}
             <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-lg">
                <h3 className="flex items-center gap-3 text-2xl font-bold text-slate-800 mb-6">
                   <div className="p-2 bg-brand-100 rounded-lg"><Code className="text-brand-600" size={24} /></div>
                   Teknologi yang Digunakan
                </h3>
                <ul className="space-y-4">
                   <DocItem icon={<CheckCircle2 size={20} className="text-brand-500" />} title="Framework" desc="Next.js 14 (App Router) untuk performa dan SEO optimal." />
                   <DocItem icon={<CheckCircle2 size={20} className="text-brand-500" />} title="Bahasa" desc="TypeScript penuh untuk keamanan tipe data dan kode yang robust." />
                   <DocItem icon={<CheckCircle2 size={20} className="text-brand-500" />} title="Styling" desc="Tailwind CSS untuk desain modern dan responsif yang cepat." />
                   <DocItem icon={<CheckCircle2 size={20} className="text-brand-500" />} title="Backend" desc="Next.js Route Handlers (Serverless API Functions)." />
                   <DocItem icon={<CheckCircle2 size={20} className="text-brand-500" />} title="Kompresi" desc="Library 'sharp' yang berkinerja tinggi untuk pemrosesan gambar." />
                   <DocItem icon={<CheckCircle2 size={20} className="text-brand-500" />} title="Deployment" desc="Vercel untuk hosting global yang cepat dan scalable." />
                </ul>
             </div>
             
             {/* How it Works Card */}
             <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-lg">
                <h3 className="flex items-center gap-3 text-2xl font-bold text-slate-800 mb-6">
                   <div className="p-2 bg-purple-100 rounded-lg"><Server className="text-purple-600" size={24} /></div>
                   Cara Kerja & Keamanan
                </h3>
                <ul className="space-y-4">
                   <DocItem icon={<Lock size={20} className="text-purple-500" />} title="Upload Aman" desc="Gambar diunggah langsung ke serverless function melalui koneksi terenkripsi (HTTPS)." />
                   <DocItem icon={<Server size={20} className="text-purple-500" />} title="Pemrosesan di Memori" desc="File tidak pernah disimpan ke disk (hard drive). Semua proses terjadi di RAM server (Buffer)." />
                   <DocItem icon={<Zap size={20} className="text-purple-500" />} title="Kompresi Real-time" desc="Sharp memproses buffer gambar sesuai kualitas yang Anda pilih dalam hitungan detik." />
                   <DocItem icon={<CheckCircle2 size={20} className="text-purple-500" />} title="Pemusnahan Otomatis" desc="Setelah hasil dikirimkan kembali ke browser Anda, data di RAM server langsung hilang." />
                   <DocItem icon={<Shield size={20} className="text-purple-500" />} title="Tanpa Jejak" desc="Tidak ada database yang menyimpan riwayat, metadata, atau file Anda. Privasi 100%." />
                </ul>
             </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

// Helper Components untuk UI Baru
function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
  return (
    <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      <div className={`mb-6 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${color} shadow-md group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function DocItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <li className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/50 transition-colors">
       <div className="mt-1">{icon}</div>
       <div>
          <h4 className="font-bold text-slate-800 text-lg">{title}</h4>
          <p className="text-slate-600 text-sm font-medium leading-relaxed">{desc}</p>
       </div>
    </li>
  )
}
