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
        relative w-full h-48 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3 overflow-hidden group
        ${isDragging 
          ? 'bg-blue-50 border-blue-500 scale-[0.98]' 
          : 'bg-white/50 border-gray-200 hover:border-gray-300 hover:bg-white'
        }
      `}
    >
      <input type="file" className="hidden" ref={inputRef} onChange={handleChange} accept="image/png, image/jpeg, image/webp" />
      
      <div className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform">
         <Plus size={20} className="text-gray-600" />
      </div>

      <div className="text-center">
        <h3 className="text-sm font-bold text-gray-800">Upload Foto</h3>
        <p className="text-[10px] text-gray-400 mt-1">JPG, PNG, WEBP (Max 20MB)</p>
      </div>
    </div>
  );
}
