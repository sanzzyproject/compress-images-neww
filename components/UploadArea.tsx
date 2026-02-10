import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
}

export default function UploadArea({ onFileSelect }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle Drag Events (Visual Effect)
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  // Handle Drop File (Saat dilepas)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    // Cek apakah ada file yang didrop
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validate(e.dataTransfer.files[0]);
    }
  };

  // Handle Click Upload (Saat pilih manual) - INI YANG TADI HILANG
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      validate(e.target.files[0]);
    }
  };

  // Validasi File
  const validate = (file: File) => {
    // 1. Validasi Ukuran (20MB)
    if (file.size > 20 * 1024 * 1024) {
      alert("Ukuran file terlalu besar! Maksimal 20MB.");
      return;
    }
    // 2. Validasi Tipe File
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert("Format tidak didukung. Gunakan JPG, PNG, atau WEBP.");
      return;
    }
    // Kirim ke parent (page.tsx)
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
        relative w-full h-60 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300
        ${isDragging 
          ? 'border-brand-500 bg-brand-50 scale-[1.01] shadow-lg' 
          : 'border-slate-300 hover:border-brand-400 hover:bg-slate-50'
        }
      `}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={inputRef} 
        onChange={handleChange} 
        accept="image/png, image/jpeg, image/webp" 
      />
      
      <div className={`p-4 rounded-full mb-3 transition-colors duration-300 ${isDragging ? 'bg-white' : 'bg-slate-100'}`}>
        {isDragging ? (
          <ImageIcon className="h-8 w-8 text-brand-600 animate-bounce" />
        ) : (
          <UploadCloud className="h-8 w-8 text-slate-400" />
        )}
      </div>
      
      <p className="text-lg font-semibold text-slate-700">
        {isDragging ? 'Lepaskan Gambar Sekarang' : 'Klik atau Drag gambar ke sini'}
      </p>
      <p className="text-sm text-slate-400 mt-2">
        Max 20MB (JPG, PNG, WEBP)
      </p>
    </div>
  );
}
