// src/lib/sanity.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID as string,
  dataset: import.meta.env.VITE_SANITY_DATASET as string,
  apiVersion: "2025-30-08", // use latest date
  useCdn: false,
  perspective: "published",
  stega: false,
  token: import.meta.env.VITE_SANITY_TOKEN as string | undefined, // ✅ FIX
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Example fetch (gallery)
export async function getGalleryImages(category?: string) {
  const query = category
    ? `*[_type == "gallery" && category == $category]{
        _id,
        title,
        image,
        category,
        description,
        date,
        featured,
        tags
      }`
    : `*[_type == "gallery"] | order(_createdAt desc){
        _id,
        title,
        image,
        category,
        description,
        date,
        featured,
        tags
      }`;

  return client.fetch(query, category ? { category } : {});
}
