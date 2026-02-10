'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import UploadArea from '@/components/UploadArea';
import SliderQuality from '@/components/SliderQuality';
import ImagePreview from '@/components/ImagePreview';
import { Loader2, Check, Zap, Lock, Smartphone } from 'lucide-react';

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
    <main className="min-h-screen bg-[#FAFAFA] selection:bg-green-100">
      <Header />

      {/* HERO SECTION MATCHING REFERENCE */}
      <section className="pt-32 pb-10 px-4 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white mb-6 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-black"></span>
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">Image Tool V1.0</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
          Image compression that <br className="hidden md:block" />
          works like <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Magic</span>
        </h1>
        
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Great visuals deserve a system that optimizes them fast. From huge raw files to smooth web-ready images in seconds.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <button className="btn-black px-8 py-3.5 text-base shadow-xl shadow-gray-200">
            Start Compressing
          </button>
          <button className="px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
            View Source
          </button>
        </div>
      </section>

      {/* DASHBOARD GRID LAYOUT (The "Dashboard" in reference) */}
      <section className="px-4 pb-20 max-w-6xl mx-auto">
        {/* Main Container mimicking the big image in reference */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Upload or Control */}
          <div className="md:col-span-7 flex flex-col gap-6">
            {/* Upload Card */}
            <div className="card-clean p-1">
               <UploadArea onFileSelect={handleFileSelect} />
            </div>
            
            {/* Control Slider (Only show if file selected) */}
            {file && (
              <div className="card-clean animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <SliderQuality quality={quality} setQuality={setQuality} disabled={isLoading} />
              </div>
            )}
          </div>

          {/* Right Column: Features or Preview */}
          <div className="md:col-span-5 flex flex-col gap-6">
             {/* Info Cards (Mocking the "Step 1/2" cards) */}
             <div className="grid grid-cols-2 gap-4">
                <InfoCard label="Privacy" value="100%" sub="Local RAM" icon={<Lock size={16}/>} />
                <InfoCard label="Speed" value="0.2s" sub="Serverless" icon={<Zap size={16}/>} />
             </div>

             {/* Action / Preview Area */}
             <div className="card-clean p-6 flex-grow flex flex-col justify-center items-center text-center bg-gray-900 text-white min-h-[250px] relative overflow-hidden">
                {!file ? (
                  <div className="z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="text-white" />
                    </div>
                    <h3 className="font-bold text-lg">Mobile Ready</h3>
                    <p className="text-gray-400 text-sm mt-2">Optimized for all your devices.</p>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col z-10">
                     <div className="flex-grow relative w-full rounded-xl overflow-hidden mb-4 bg-gray-800">
                        {/* Simple Preview if not compressed yet */}
                        <img 
                          src={URL.createObjectURL(file)} 
                          className={`w-full h-full object-contain ${compressedImage ? 'opacity-50' : 'opacity-100'}`} 
                        />
                        {compressedImage && (
                          <img 
                            src={compressedImage} 
                            className="absolute inset-0 w-full h-full object-contain" 
                          />
                        )}
                     </div>
                     <button
                        onClick={handleCompress}
                        disabled={isLoading}
                        className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? "Processing..." : (compressedImage ? "Download Again" : "Compress Now")}
                      </button>
                     {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                  </div>
                )}
                
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 blur-[60px] rounded-full pointer-events-none"></div>
             </div>
          </div>
        </div>
        
        {/* Full Width Preview Section (If Compressed) */}
        {file && compressedImage && (
           <div className="mt-6 card-clean p-6 md:p-8 animate-in fade-in slide-in-from-bottom-8">
              <h3 className="font-bold text-xl mb-6">Result Comparison</h3>
              <ImagePreview originalFile={file} compressedImage={compressedImage} compressedSize={compressedSize} />
           </div>
        )}
      </section>

      {/* FOOTER BLACK ROUNDED */}
      <footer className="px-4 pb-4">
        <div className="bg-[#111] rounded-[2.5rem] p-8 md:p-16 text-white text-center md:text-left">
           <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="md:col-span-2">
                 <h2 className="text-2xl font-bold mb-4">Start Simplifying Your<br/>Images Today!</h2>
                 <div className="flex gap-4 justify-center md:justify-start">
                    <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm">Get Started</button>
                    <button className="border border-white/20 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white/10">Contact</button>
                 </div>
              </div>
              <div>
                 <h4 className="font-bold mb-4 text-gray-400 text-sm uppercase">Platform</h4>
                 <ul className="space-y-2 text-sm text-gray-300">
                    <li>Next.js</li>
                    <li>Vercel</li>
                    <li>Sharp</li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-bold mb-4 text-gray-400 text-sm uppercase">Legal</h4>
                 <ul className="space-y-2 text-sm text-gray-300">
                    <li>Privacy</li>
                    <li>Terms</li>
                    <li>© 2026 Sann404</li>
                 </ul>
              </div>
           </div>
        </div>
      </footer>
    </main>
  );
}

function InfoCard({ label, value, sub, icon }: any) {
  return (
    <div className="bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm flex flex-col justify-between h-28">
       <div className="flex justify-between items-start">
          <span className="text-gray-500 text-xs font-semibold uppercase">{label}</span>
          <div className="p-1.5 bg-gray-50 rounded-full text-black">{icon}</div>
       </div>
       <div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-xs text-green-600 font-medium">{sub}</div>
       </div>
    </div>
  )
}
