import React from "react";

const GridSkeleton = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-96 bg-neutral-100 dark:bg-neutral-800 rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
};

export default GridSkeleton;
