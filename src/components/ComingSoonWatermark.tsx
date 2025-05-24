import React from 'react';

export function ComingSoonWatermark() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/80 z-50">
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center">
        COMING SOON
      </h1>
    </div>
  );
}