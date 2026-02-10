import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, FileUp } from 'lucide-react';

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
    e.preventDefault();
    if (e.target.files?.[0]) validate(e.target.files[0]);
  };

  const validate = (file: File) => {
    if (file.size > 20 * 1024 * 1024) return alert("Ukuran file terlalu besar! Maksimal 20MB.");
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return alert("Format tidak didukung. Gunakan JPG, PNG, atau WEBP.");
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
        group relative w-full h-80 rounded-[2rem] border-3 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden
        ${isDragging 
          ? 'border-brand-500 bg-brand-50/50 scale-[1.02] shadow-2xl shadow-brand-500/20' 
          : 'border-slate-200 hover:border-brand-400 hover:bg-slate-50/50 hover:shadow-xl hover:shadow-slate-200/50'
        }
      `}
    >
      <input type="file" className="hidden" ref={inputRef} onChange={handleChange} accept="image/png, image/jpeg, image/webp" />
      
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none"></div>
      
      <div className={`relative z-10 p-6 rounded-full mb-5 transition-all duration-500 ${isDragging ? 'bg-white shadow-lg rotate-12 scale-110' : 'bg-brand-50 group-hover:bg-white group-hover:shadow-md group-hover:-rotate-6 group-hover:scale-105'}`}>
        {isDragging ? (
          <FileUp className="h-12 w-12 text-brand-600 animate-bounce" strokeWidth={1.5} />
        ) : (
          <UploadCloud className="h-12 w-12 text-brand-500 group-hover:text-brand-600 transition-colors" strokeWidth={1.5} />
        )}
      </div>
      
      <h3 className="text-2xl font-bold text-slate-800 mb-2 transition-colors group-hover:text-brand-700">
        {isDragging ? 'Lepaskan Gambar di Sini' : 'Upload Gambar Anda'}
      </h3>
      
      <p className="text-slate-500 font-medium px-8 text-center max-w-md leading-relaxed group-hover:text-slate-600 transition-colors">
        Drag & drop file Anda atau <span className="text-brand-600 underline decoration-2 underline-offset-2">klik untuk menjelajah</span>.
      </p>

      <div className="mt-6 flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-wider bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-100/50">
        <span className="flex items-center gap-1.5"><ImageIcon size={14} className="text-blue-500" /> JPG</span>
        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
        <span className="flex items-center gap-1.5"><ImageIcon size={14} className="text-purple-500" /> PNG</span>
        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
        <span className="flex items-center gap-1.5"><ImageIcon size={14} className="text-green-500" /> WEBP</span>
        <span className="w-px h-4 bg-slate-200 mx-2"></span>
        <span className="text-brand-600">MAX 20MB</span>
      </div>
    </div>
  );
}
