import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-96 px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <svg
            className="w-20 h-20 mx-auto text-neutral-300 dark:text-neutral-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
          No Projects Found
        </h2>

        <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
          We couldn&apos;t find any projects matching your current filters or
          search criteria. Try adjusting your search terms or clearing some
          filters to discover more projects.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
