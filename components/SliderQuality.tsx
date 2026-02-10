import React from 'react';
import { Settings2 } from 'lucide-react';

interface SliderProps {
  quality: number;
  setQuality: (val: number) => void;
  disabled: boolean;
}

export default function SliderQuality({ quality, setQuality, disabled }: SliderProps) {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm h-full flex flex-col justify-center">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-full">
            <Settings2 size={20} className="text-gray-700" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Compression Level</h4>
            <p className="text-xs text-gray-500">Balance quality vs size</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
          {quality}%
        </div>
      </div>

      <div className="relative w-full h-10 flex items-center">
        <input
          type="range"
          min="1"
          max="100"
          value={quality}
          disabled={disabled}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full z-10"
        />
        {/* Track Background Visual */}
        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-100 rounded-full -translate-y-1/2 pointer-events-none overflow-hidden">
           <div 
             className="h-full bg-black transition-all" 
             style={{ width: `${quality}%` }}
           ></div>
        </div>
      </div>

      <div className="flex justify-between mt-2 text-xs font-semibold text-gray-400">
        <span>Max Compression</span>
        <span>Best Quality</span>
      </div>
    </div>
  );
}
