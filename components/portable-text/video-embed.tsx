/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ReactPlayer from "react-player";

interface VideoEmbedProps {
  value: {
    url: string;
    caption?: string;
    autoplay?: boolean;
    controls?: boolean;
  };
}

export function VideoEmbed({ value }: VideoEmbedProps) {
  const { url, caption, autoplay = false, controls = true } = value;

  const playerConfig = {
    youtube: {
      playerVars: {
        rel: 0,
        modestbranding: 1,
        host: "https://www.youtube-nocookie.com",
      },
    },
    vimeo: {
      playerOptions: {
        responsive: true,
      },
    },
    file: {
      attributes: {
        crossOrigin: "anonymous",
      },
    },
  };

  return (
    <div className="my-8">
      <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
        <ReactPlayer
          src={url}
          width="100%"
          height="100%"
          playing={autoplay}
          controls={controls}
          config={playerConfig as any}
          fallback={
            <div className="flex items-center justify-center h-full text-neutral-500 dark:text-neutral-400">
              <div className="text-center">
                <div className="h-12 w-12 mx-auto mb-4 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0z" />
                    <path d="m6.5 7.5 3 2-3 2V7.5z" />
                  </svg>
                </div>
                <p className="text-sm">Unable to load video</p>
              </div>
            </div>
          }
        />
      </div>
      {caption && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 text-center">
          {caption}
        </p>
      )}
    </div>
  );
}
