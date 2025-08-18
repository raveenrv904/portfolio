import { useGithubStats } from "@/hooks/use-github-data";
import React, { useEffect, useMemo, useRef } from "react";
import BaseWidget from "./base-widget";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import gsap from "gsap";

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // yellow
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#f97316", // orange
  "#6b7280", // gray
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: { name: string; value: number };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tooltipRef.current) return;

    if (active) {
      gsap.fromTo(
        tooltipRef.current,
        { opacity: 0, scale: 0.9, y: 5 },
        { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [active]);

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        ref={tooltipRef}
        className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg p-3 will-change-transform"
      >
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {data.value} repositories
        </p>
      </div>
    );
  }
  return null;
}

const LanguageChart = () => {
  const { stats, loading, error } = useGithubStats();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);

  const chartData = useMemo(
    () =>
      stats?.languages
        ? Object.entries(stats.languages)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 8)
            .map(([name, value]) => ({ name, value }))
        : [],
    [stats?.languages]
  );

  useEffect(() => {
    if (!chartContainerRef.current || chartData.length === 0) return;

    const tl = gsap.timeline();

    gsap.set([pieChartRef.current, legendRef.current], {
      opacity: 0,
    });

    tl.fromTo(
      chartContainerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    )
      .to(
        pieChartRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .to(
        legendRef.current,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );

    const legendItems = legendRef.current?.children;
    if (legendItems) {
      gsap.fromTo(
        Array.from(legendItems),
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.6,
          ease: "power2.out",
        }
      );
    }

    return () => {
      tl.kill();
    };
  }, [chartData]);

  return (
    <BaseWidget
      title="Programming Languages"
      description="Distribution of languages across your repositories"
      loading={loading}
      error={error}
      className="h-full"
    >
      {chartData?.length > 0 ? (
        <div
          ref={chartContainerRef}
          className="h-[370px] flex flex-col opacity-0"
        >
          <div
            className="flex-1 min-h-0 opacity-0 will-change-transform"
            ref={pieChartRef}
          >
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="none"
                  animationDuration={800}
                  animationBegin={400}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div
            ref={legendRef}
            className="flex flex-wrap gap-2 justify-center mt-4 px-6 md:px-2 pb-2 opacity-0"
          >
            {chartData.map((entry, index) => (
              <div
                key={entry.name}
                className="flex items-center gap-1 text-xs mb-1 opacity-0 will-change-transform"
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-neutral-700 dark:text-neutral-300 truncate max-w-24">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[480px]">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            No language data available
          </p>
        </div>
      )}
    </BaseWidget>
  );
};

export default LanguageChart;
