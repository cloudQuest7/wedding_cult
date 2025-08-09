import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '9qn1vlpn',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  perspective: 'published',
  stega: false,
  token: process.env.SANITY_TOKEN
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Fetch gallery images
export async function getGalleryImages(category?: string) {
  const query = category 
    ? `*[_type == "gallery" && category == $category] | order(order asc) {
        _id,
        title,
        image,
        category,
        description,
        date,
        featured,
        tags
      }`
    : `*[_type == "gallery"] | order(order asc) {
        _id,
        title,
        image,
        category,
        description,
        date,
        featured,
        tags
      }`
  
  return client.fetch(query, { category })
}

// Fetch featured feedback
export async function getFeaturedFeedback() {
  const query = `*[_type == "feedback" && status == "approved" && featured == true] | order(dateSubmitted desc) {
    _id,
    name,
    rating,
    message,
    dateSubmitted
  }`
  
  return client.fetch(query)
}

// Submit new feedback
export async function submitFeedback(data: {
  name: string
  email: string
  rating: number
  message: string
}) {
  return client.create({
    _type: 'feedback',
    ...data,
    dateSubmitted: new Date().toISOString(),
    status: 'pending'
  })
}
