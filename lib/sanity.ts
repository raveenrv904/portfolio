/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "co4313sn",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-08-01",
});

const builder = ImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export const sanityLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `${src}?w=${width}&q=${quality || 75}&auto=format`;
};

export default client;
