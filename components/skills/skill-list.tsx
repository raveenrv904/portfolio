/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import SkillCard from "./skill-card";
import gsap from "gsap";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type Skill = {
  _id: string;
  name: string;
  category: string;
  description?: string;
  featured?: boolean;
  icon?: any;
  relatedProjects?: { _id: string; title: string; slug: { current: string } }[];
  relatedExperience?: { _id: string; role: string; company: string }[];
};

type SortBy = "name" | "category" | "featured";

const SkillList: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState<SortBy>("category");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories = ["all", ...new Set(skills.map((skill) => skill.category))];

  const filteredAndSortedSkills = skills
    .filter((skill) => {
      const matchesCategory =
        selectedCategory === "all" || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.description &&
          skill.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFeatured = !showFeaturedOnly || skill.featured;

      return matchesCategory && matchesSearch && matchesFeatured;
    })
    .sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
      }
      if (sortBy === "category") {
        if (a.category !== b.category)
          return a.category.localeCompare(b.category);
      }
      return a.name.localeCompare(b.name);
    });

  const groupedSkills = filteredAndSortedSkills.reduce(
    (acc, skill) => {
      (acc[skill.category] = acc[skill.category] || []).push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-skill-category]",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out",
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [groupedSkills]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize text-xs sm:text-sm"
              >
                {category}
                {category !== "all" && (
                  <span className="ml-1 text-xs opacity-75">
                    ({skills.filter((s) => s.category === category).length})
                  </span>
                )}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:ml-auto">
            <Button
              variant={showFeaturedOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className="text-xs sm:text-sm"
            >
              ⭐ Featured Only
            </Button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="px-3 py-1.5 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            >
              <option value="category">Sort by Category</option>
              <option value="name">Sort by Name</option>
              <option value="featured">Sort by Featured</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          Showing {filteredAndSortedSkills.length} of {skills.length} skills
          {searchQuery && ` for "${searchQuery}"`}
          {selectedCategory !== "all" && ` in ${selectedCategory}`}
          {showFeaturedOnly && ` (featured only)`}
        </div>
      </div>

      <section ref={containerRef}>
        {selectedCategory === "all" ? (
          <div className="space-y-8 sm:space-y-12">
            {Object.entries(groupedSkills).map(([category, skillList]) => (
              <div key={category} data-skill-category>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold capitalize text-neutral-800 dark:text-neutral-200">
                    {category}
                  </h2>
                  <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs rounded-full">
                    {skillList.length}
                  </span>
                </div>

                <div
                  className={
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                  }
                >
                  {skillList.map((skill, index) => (
                    <SkillCard key={skill._id} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div data-skill-category>
            <div
              className={
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              }
            >
              {filteredAndSortedSkills.map((skill, index) => (
                <SkillCard key={skill._id} skill={skill} index={index} />
              ))}
            </div>
          </div>
        )}

        {filteredAndSortedSkills.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              No skills found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setShowFeaturedOnly(false);
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default SkillList;
