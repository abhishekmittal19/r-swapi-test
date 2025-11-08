import React from "react";

export default function Loader({ size = 12 }) {
  return (
    <div className="flex justify-center py-8">
      <div className={`animate-spin rounded-full h-${size} w-${size} border-t-4 border-b-4 border-yellow-400`} />
    </div>
  );
}
