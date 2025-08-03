"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore, type Theme } from "@/store/ui-store";

const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: "light", label: "Light", icon: <Sun className="h-4 w-4" /> },
  { value: "dark", label: "Dark", icon: <Moon className="h-4 w-4" /> },
  { value: "system", label: "System", icon: <Monitor className="h-4 w-4" /> },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useUIStore();

  const currentTheme = themes.find((t) => t.value === theme) || themes[2];

  const handleThemeChange = () => {
    const currentIndex = themes.findIndex((t) => t.value === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeChange}
      title={`Switch to ${themes[
        (themes.findIndex((t) => t.value === theme) + 1) % themes.length
      ].label.toLowerCase()} theme`}
      className="relative h-9 w-9"
    >
      {currentTheme.icon}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
