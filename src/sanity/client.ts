import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: "9qn1vlpn",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN // Add your token in .env file
});