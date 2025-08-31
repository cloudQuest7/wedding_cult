// src/lib/sanity.ts
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID as string,
  dataset: import.meta.env.VITE_SANITY_DATASET as string,
  apiVersion: "2023-08-30", // can set to today's date for freshest API
  useCdn: true, // `true` = faster, cached results | `false` = real-time
});
