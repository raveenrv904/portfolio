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
    <div className="mb-4">
      <div className="">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p
          className={`text-neutral-600 dark:text-neutral-400 mt-1 ${className}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default TitleCard;
