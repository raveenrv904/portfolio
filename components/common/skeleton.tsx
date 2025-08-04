import React from "react";

const Skeleton = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`h-64 bg-neutral-100 dark:bg-neutral-800 rounded-lg animate-pulse ${
            i === 0 || i === 4 ? "col-span-2" : ""
          } ${i === 5 ? "col-span-3" : ""}`}
        />
      ))}
    </div>
  );
};

export default Skeleton;
