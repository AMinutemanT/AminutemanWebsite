import React from 'react';

export function ComingSoonWatermark() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-black/80 z-50 gap-5">
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center">
        COMING SOON
      </h1>
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
        Shaping the Deterrence 
      </h2>
    </div>
  );
}