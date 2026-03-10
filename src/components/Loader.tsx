import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-black text-white gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white animate-spin" style={{ animationDuration: '0.8s' }} />
      </div>
      <span className="text-sm text-white/40 tracking-widest uppercase">Loading</span>
    </div>
  );
};
