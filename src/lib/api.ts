export async function fetchOffers() {
  const baseUrl = import.meta.env.VITE_API_URL; // from .env
  const res = await fetch(`${baseUrl}/api/offers?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch offers");
  const data = await res.json();
  return data.data; // Strapi always nests inside data
}
