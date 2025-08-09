import { client } from './client'

// Gallery API functions
export async function getAllGalleryImages() {
  return client.fetch(`
    *[_type == "gallery"] | order(order asc) {
      _id,
      title,
      "imageUrl": image.asset->url,
      category,
      description,
      date,
      featured,
      tags
    }
  `)
}

export async function getFeaturedGalleryImages() {
  return client.fetch(`
    *[_type == "gallery" && featured == true] | order(order asc) {
      _id,
      title,
      "imageUrl": image.asset->url,
      category,
      description
    }
  `)
}

// Feedback API functions
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

export async function getApprovedFeedback() {
  return client.fetch(`
    *[_type == "feedback" && status == "approved"] | order(dateSubmitted desc) {
      _id,
      name,
      rating,
      message,
      dateSubmitted
    }
  `)
}

// Types
export interface GalleryImage {
  _id: string
  title: string
  imageUrl: string
  category: string
  description?: string
  date?: string
  featured: boolean
  tags?: string[]
}

export interface Feedback {
  _id: string
  name: string
  rating: number
  message: string
  dateSubmitted: string
}
