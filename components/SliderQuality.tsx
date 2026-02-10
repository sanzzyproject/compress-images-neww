import React from 'react';

interface SliderProps {
  quality: number;
  setQuality: (val: number) => void;
  disabled: boolean;
}

export default function SliderQuality({ quality, setQuality, disabled }: SliderProps) {
  return (
    <div className="w-full bg-white border border-slate-100 p-5 rounded-2xl mt-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm font-bold text-slate-700">Kualitas</label>
        <span className="text-lg font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-lg">{quality}%</span>
      </div>
      
      <input
        type="range"
        min="1"
        max="100"
        value={quality}
        disabled={disabled}
        onChange={(e) => setQuality(Number(e.target.value))}
        className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-brand-600"
      />
      
      <div className="flex justify-between mt-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase">Ukuran Kecil</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase">Detail HD</span>
      </div>
    </div>
  );
}
