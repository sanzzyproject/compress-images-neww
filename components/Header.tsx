import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl transition-all">
      {/* UPDATE: Menggunakan max-w-md dan px-5 agar lurus sejajar dengan konten page.tsx */}
      <div className="max-w-md mx-auto px-5 h-16 flex items-center justify-between">
        
        {/* LOGO & TITLE */}
        <div className="flex items-center gap-2.5">
          <div className="bg-black text-white p-1.5 rounded-lg shadow-sm">
            <Sparkles size={18} fill="currentColor" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            CompressImage
          </span>
        </div>

        {/* Kanan Kosong (Layout Balancer) */}
        <div></div>
        
      </div>
    </nav>
  );
}
