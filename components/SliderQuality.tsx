import React from 'react';

interface SliderProps {
  quality: number;
  setQuality: (val: number) => void;
  disabled: boolean;
}

export default function SliderQuality({ quality, setQuality, disabled }: SliderProps) {
  return (
    <div className="w-full glass-card p-6 rounded-xl mt-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <label className="text-sm font-bold text-slate-700 block">Kualitas Kompresi</label>
          <span className="text-xs text-slate-400">Geser untuk mengatur tingkat kompresi</span>
        </div>
        <span className="text-2xl font-bold text-brand-600">{quality}%</span>
      </div>
      <input
        type="range"
        min="1"
        max="100"
        value={quality}
        disabled={disabled}
        onChange={(e) => setQuality(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
        <span>Low Quality</span>
        <span>High Quality</span>
      </div>
    </div>
  );
}
