import React from 'react';
import { Layers, UserCircle } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 group cursor-default">
            <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-2.5 rounded-xl shadow-lg shadow-brand-500/30 transition-transform group-hover:scale-105">
              <Layers className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 leading-none">
                SANN<span className="text-brand-600">404</span>
              </span>
              <span className="text-xs font-medium text-slate-500 tracking-widest uppercase">Image Tools Pro</span>
            </div>
          </div>
          
          {/* User Profile / Menu */}
          <div className="flex items-center gap-4">
             <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-full transition-colors border border-slate-200">
                <UserCircle size={18} />
                Sign In
             </button>
            <div className="relative h-10 w-10 rounded-full ring-2 ring-brand-500/30 ring-offset-2 p-0.5 cursor-pointer hover:ring-brand-600 transition-all">
              {/* GANTI DENGAN FOTO PROFIL USER NANTINYA */}
              <Image 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                alt="User Profile"
                fill
                className="rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-400"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
