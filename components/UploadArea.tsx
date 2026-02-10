import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, ArrowUpRight } from 'lucide-react';

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
        group relative w-full aspect-[4/3] md:aspect-video rounded-[2rem] border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center p-6
        ${isDragging 
          ? 'bg-gray-50 border-gray-300 scale-[0.99]' 
          : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-lg'
        }
      `}
    >
      <input type="file" className="hidden" ref={inputRef} onChange={handleChange} accept="image/png, image/jpeg, image/webp" />
      
      {/* Decorative Icon Circle similar to reference cards */}
      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
         <UploadCloud className="text-black" size={32} strokeWidth={1.5} />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Image</h3>
      <p className="text-gray-500 max-w-xs mx-auto mb-6">
        Drag & drop or click to upload. Supports JPG, PNG, WEBP up to 20MB.
      </p>

      {/* Fake UI Element to match reference button style */}
      <div className="inline-flex items-center gap-2 px-5 py-2 bg-black text-white rounded-full text-sm font-semibold group-hover:bg-gray-800 transition-colors">
        Choose File <ArrowUpRight size={16} />
      </div>
    </div>
  );
}
