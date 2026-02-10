import React from 'react';
import { Layers } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 glass transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-brand-600 p-2 rounded-lg shadow-sm">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">
              SANN<span className="text-brand-600">404</span> FORUM
            </span>
          </div>
          <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Image Tools v1.0
          </div>
        </div>
      </div>
    </header>
  );
}
