import React from 'react';

interface SliderProps {
  quality: number;
  setQuality: (val: number) => void;
  disabled: boolean;
}

export default function SliderQuality({ quality, setQuality, disabled }: SliderProps) {
  return (
    <div className="w-full glass-card p-8 rounded-[2rem] mt-8 transition-all hover:shadow-xl hover:shadow-brand-500/10 border border-white/40">
      <div className="flex justify-between items-end mb-6">
        <div>
          <label className="text-lg font-bold text-slate-800 block mb-1">Kualitas Kompresi</label>
          <p className="text-sm text-slate-500 font-medium">Atur keseimbangan antara ukuran file dan kualitas gambar.</p>
        </div>
        <div className="flex items-baseline bg-brand-50 px-5 py-2.5 rounded-2xl border border-brand-100/50 shadow-sm">
          <span className="text-4xl font-extrabold text-brand-600 tracking-tight">{quality}</span>
          <span className="text-lg font-bold text-brand-400 ml-1">%</span>
        </div>
      </div>
      
      <div className="relative py-2">
        <input
          type="range"
          min="1"
          max="100"
          value={quality}
          disabled={disabled}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-500/20 transition-shadow"
          style={{
            backgroundImage: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${quality}%, #e2e8f0 ${quality}%, #e2e8f0 100%)`
          }}
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-150 ease-out"
          style={{ left: `calc(${quality}% + (${8 - quality * 0.15}px))` }}
        >
           <div className="h-6 w-6 bg-white rounded-full shadow-[0_2px_8px_rgba(59,130,246,0.5)] border-4 border-brand-500"></div>
        </div>
      </div>

      <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-400 rounded-full"></span>Ukuran Kecil</span>
        <span className="flex items-center gap-1">Kualitas Terbaik<span className="w-2 h-2 bg-green-400 rounded-full"></span></span>
      </div>
    </div>
  );
}
