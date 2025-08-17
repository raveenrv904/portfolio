import React from "react";

const TitleCard = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
          {title}
        </h1>
        <p
          className={`text-neutral-600 dark:text-neutral-400 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg leading-relaxed ${className}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default TitleCard;
