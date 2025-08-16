"use client";
import React, { useEffect, useRef, useState } from "react";
import { FilterProps } from "@/types/filter";
import { Search, Filter as FilterIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const Filter: React.FC<FilterProps> = ({
  searchPlaceholder = "Search...",
  totalItems,
  filteredCount,
  sections,
  filters,
  setFilter,
  clearFilters,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.search as string || "");
  const filterRef = useRef<HTMLDivElement>(null);

  // 🔹 Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter("search", searchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue, setFilter]);

  // 🔹 Animate on expand/collapse
  useEffect(() => {
    if (filterRef.current) {
      if (showAdvanced) {
        gsap.to(filterRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(filterRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
      }
    }
  }, [showAdvanced]);

  const hasActiveFilters =
    filters.search ||
    Object.values(filters).some(
      (val) => Array.isArray(val) ? val.length > 0 : val !== null && val !== ""
    );

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
      {/* Search + Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          />
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant={showAdvanced ? "default" : "outline"}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <FilterIcon className="h-4 w-4 mr-2" />
            Filters
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={() => {
                clearFilters();
                setSearchValue("");
                setShowAdvanced(false);
              }}
              className="text-neutral-600 dark:text-neutral-400"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        {filteredCount === totalItems
          ? `Showing all ${totalItems} items`
          : `Showing ${filteredCount} of ${totalItems} items`}
      </p>

      {/* Expandable filter sections */}
      <div ref={filterRef} className="overflow-hidden h-0 opacity-0 space-y-6 border-t pt-6 border-neutral-200 dark:border-neutral-700">
        {sections.map((section) => (
          <div key={section.key}>
            <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
              {section.title}
            </h4>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {section.options.map((opt) => {
                const isSelected = Array.isArray(filters[section.key])
                  ? Array.isArray(filters[section.key]) && (filters[section.key] as string[]).includes(opt.value)
                  : filters[section.key] === opt.value;

                return (
                  <Button
                    key={opt.value}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (Array.isArray(filters[section.key])) {
                        setFilter(
                          section.key,
                          isSelected
                            ? (filters[section.key] as string[]).filter((val) => val !== opt.value)
                            : [...(filters[section.key] as string[]), opt.value]
                        );
                      } else {
                        setFilter(section.key, isSelected ? null : opt.value);
                      }
                    }}
                  >
                    {opt.icon && <span className="mr-2">{opt.icon}</span>}
                    {opt.label}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
