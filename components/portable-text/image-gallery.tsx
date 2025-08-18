/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";

interface ImageGalleryProps {
  value: {
    images: any[];
    caption?: string;
    layout?: "grid" | "carousel";
  };
}

export function ImageGallery({ value }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { images, caption, layout = "grid" } = value;

  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxImageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    if (lightboxRef.current && overlayRef.current) {
      gsap.to([lightboxRef.current, overlayRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          setSelectedIndex(null);
        },
      });
    } else {
      setSelectedIndex(null);
    }
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedIndex === null || !lightboxImageRef.current) return;

    const currentImage = lightboxImageRef.current;

    gsap.to(currentImage, {
      x: direction === "prev" ? 100 : -100,
      opacity: 0,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        if (direction === "prev") {
          setSelectedIndex(
            selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
          );
        } else {
          setSelectedIndex(
            selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
          );
        }
        gsap.fromTo(
          currentImage,
          {
            x: direction === "prev" ? -100 : 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          }
        );
      },
    });
  };

  useEffect(() => {
    if (
      selectedIndex !== null &&
      lightboxRef.current &&
      overlayRef.current &&
      lightboxImageRef.current
    ) {
      const tl = gsap.timeline();

      gsap.set([lightboxRef.current, overlayRef.current], { opacity: 0 });
      gsap.set(lightboxImageRef.current, { scale: 0.8, opacity: 0 });

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          lightboxRef.current,
          { opacity: 1, duration: 0.3, ease: "power2.out" },
          "-=0.2"
        )
        .to(
          lightboxImageRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.2)",
          },
          "-=0.1"
        );
    }
  }, [selectedIndex]);

  if (layout === "carousel") {
    return (
      <div className="my-12">
        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
            {images.map((image, index) => (
              <div
                key={index}
                className="group flex-shrink-0 cursor-pointer relative"
                onClick={() => openLightbox(index)}
              >
                <div className="relative w-80 h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <Image
                    src={urlFor(image).width(320).height(192).url()}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Maximize2 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {caption && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-6 text-center font-medium">
            {caption}
          </p>
        )}
        {renderLightbox()}
      </div>
    );
  }

  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={urlFor(image).width(500).height(375).url()}
              alt={image.alt || `Gallery image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-white/20 backdrop-blur-md rounded-full p-3 border border-white/20">
                <Maximize2 className="h-5 w-5 text-white" />
              </div>
            </div>
            {image.alt && (
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <p className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                  {image.alt}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {caption && (
        <p className="text-neutral-600 dark:text-neutral-400 mt-8 text-center font-medium text-lg">
          {caption}
        </p>
      )}
      {renderLightbox()}
    </div>
  );

  function renderLightbox() {
    if (selectedIndex === null) return null;

    return (
      <>
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        />
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 text-white hover:bg-white/20 z-10 rounded-full backdrop-blur-sm bg-black/30 border border-white/20 h-12 w-12"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10 rounded-full backdrop-blur-sm bg-black/30 border border-white/20 h-12 w-12"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("prev");
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10 rounded-full backdrop-blur-sm bg-black/30 border border-white/20 h-12 w-12"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("next");
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          <div
            ref={lightboxImageRef}
            className="relative max-w-6xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urlFor(images[selectedIndex]).width(1200).height(900).url()}
              alt={
                images[selectedIndex].alt ||
                `Gallery image ${selectedIndex + 1}`
              }
              fill
              className="object-contain rounded-lg shadow-2xl"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <div className="text-white text-sm font-medium text-center">
              <span className="text-lg font-semibold">{selectedIndex + 1}</span>
              <span className="text-white/70 mx-2">of</span>
              <span>{images.length}</span>
            </div>
          </div>

          {images[selectedIndex].alt && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 max-w-2xl">
              <p className="text-white text-center bg-black/50 backdrop-blur-md rounded-lg px-6 py-3 border border-white/20 font-medium">
                {images[selectedIndex].alt}
              </p>
            </div>
          )}
        </div>
      </>
    );
  }
}
