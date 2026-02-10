import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl transition-all">
      <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
        
        {/* LOGO & TITLE */}
        <div className="flex items-center gap-2">
          <div className="bg-black text-white p-1.5 rounded-lg">
            <Sparkles size={16} fill="currentColor" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            CompressImage
          </span>
        </div>

        {/* KANAN KOSONG (SESUAI REQUEST) */}
        <div></div>
        
      </div>
    </nav>
  );
}
