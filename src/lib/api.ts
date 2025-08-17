export async function fetchOffers() {
  const res = await fetch("http://localhost:1337/api/offers?populate=*");
  if (!res.ok) throw new Error("Failed to fetch offers");
  const data = await res.json();
  return data.data; // Strapi returns inside `data`
}
