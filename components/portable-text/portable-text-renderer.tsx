/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { CodeBlock } from "./code-block";
import { ImageGallery } from "./image-gallery";
import { VideoEmbed } from "./video-embed";

const components = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || "Project image"}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 text-center">
            {value.caption}
          </p>
        )}
      </div>
    ),
    code: CodeBlock,
    imageGallery: ImageGallery,
    videoEmbed: VideoEmbed,
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold tracking-tight mt-12 mb-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-semibold tracking-tight mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-neutral-700 dark:text-neutral-300 leading-7 mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary-500 pl-6 my-6 italic text-neutral-600 dark:text-neutral-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-neutral-700 dark:text-neutral-300">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-neutral-700 dark:text-neutral-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 dark:text-primary-400 hover:underline cursor-pointer"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
};

interface PortableTextRendererProps {
  content: any[];
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  return <PortableText value={content} components={components} />;
}
