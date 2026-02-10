import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Plus } from 'lucide-react';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
}

export default function UploadArea({ onFileSelect }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) validate(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) validate(e.target.files[0]);
  };

  const validate = (file: File) => {
    if (file.size > 20 * 1024 * 1024) return alert("File max 20MB!");
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return alert("Format: JPG, PNG, WEBP");
    onFileSelect(file);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`
        relative w-full h-52 md:h-64 rounded-2xl border border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-200
        ${isDragging 
          ? 'border-brand-500 bg-brand-50 shadow-inner' 
          : 'border-slate-300 bg-slate-50/50 hover:bg-white hover:border-brand-400'
        }
      `}
    >
      <input type="file" className="hidden" ref={inputRef} onChange={handleChange} accept="image/png, image/jpeg, image/webp" />
      
      <div className={`p-3 rounded-xl mb-3 transition-transform duration-200 ${isDragging ? 'scale-110 bg-white' : 'bg-white shadow-sm border border-slate-100'}`}>
        {isDragging ? (
          <Plus className="h-6 w-6 text-brand-600" />
        ) : (
          <UploadCloud className="h-6 w-6 text-slate-400" />
        )}
      </div>
      
      <h3 className="text-sm md:text-base font-semibold text-slate-700 text-center">
        {isDragging ? 'Lepaskan File' : 'Klik / Drag Foto'}
      </h3>
      
      <p className="text-xs text-slate-400 mt-1">Max 20MB (JPG/PNG/WEBP)</p>
    </div>
  );
}
