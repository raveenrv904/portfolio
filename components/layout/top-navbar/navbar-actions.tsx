"use client";

import { memo, useState, useCallback } from "react";
import { Download, Mail, ExternalLink } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useResponsive } from "@/hooks/use-responsive";

export const NavbarActions = memo(() => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const { isMobile } = useResponsive();

  const handleDownloadResume = useCallback(async () => {
    setIsDownloading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Raveen-RV-Resume.pdf";
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  const handleContact = useCallback(async () => {
    setIsContactLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      window.location.href = "mailto:raveenrv92@gmail.com";
    } finally {
      setIsContactLoading(false);
    }
  }, []);

  return (
    <div className="flex items-center space-x-2 md:space-x-3">
      {!isMobile && (
        <AnimatedButton
          variant="ghost"
          size="sm"
          onClick={handleContact}
          icon={Mail}
          isLoading={isContactLoading}
          className="hover:text-primary-600 dark:hover:text-primary-400"
        >
          Contact
        </AnimatedButton>
      )}

      <AnimatedButton
        variant="outline"
        size="sm"
        onClick={handleDownloadResume}
        icon={Download}
        isLoading={isDownloading}
        className="border-primary-200 hover:border-primary-300 hover:bg-primary-50 dark:border-primary-800 dark:hover:border-primary-700 dark:hover:bg-primary-950"
      >
        Resume
      </AnimatedButton>

      <ThemeSwitcher />

      {!isMobile && (
        <AnimatedButton
          variant="default"
          size="sm"
          onClick={() =>
            window.open("https://github.com/raveenrv904", "_blank")
          }
          icon={ExternalLink}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl"
        >
          GitHub
        </AnimatedButton>
      )}
    </div>
  );
});

NavbarActions.displayName = "NavbarActions";
