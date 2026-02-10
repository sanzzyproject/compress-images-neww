import React from 'react';
import { Layers } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* KIRI: Logo / Profile (Tanpa Batas Bundar, Transparan Support) */}
          <div className="flex items-center">
            <div className="relative h-10 w-10 md:h-12 md:w-12 hover:opacity-80 transition-opacity cursor-pointer">
              <Image 
                src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" // Ganti URL ini dengan Logo Anda nanti
                alt="Profile Logo"
                fill
                className="object-contain" // Agar logo tidak terpotong
                priority
              />
            </div>
          </div>
          
          {/* KANAN: Brand Name */}
          <div className="flex items-center gap-2">
            <div className="text-right hidden xs:block">
              <span className="block font-bold text-lg text-slate-800 leading-none tracking-tight">
                SANN<span className="text-brand-600">404</span>
              </span>
              <span className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                Image Tools
              </span>
            </div>
            <div className="bg-brand-50 p-1.5 rounded-lg text-brand-600">
               <Layers size={20} />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
