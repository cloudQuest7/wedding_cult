import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "zpzkzcwp",  // 👈 get from studio/sanity.config.ts
  dataset: "production",         // or the dataset you chose
  apiVersion: "2023-08-30",      // today’s date is good practice
  useCdn: true,                  // `false` if you need fresh data always
});
