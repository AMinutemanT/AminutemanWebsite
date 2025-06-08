import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-black text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
    </div>
  );
};
