import { Rule } from "sanity"

export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Image Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true // Enables the hotspot functionality for image cropping
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wedding', value: 'wedding' },
          { title: 'Pre-Wedding', value: 'pre-wedding' },
          { title: 'Engagement', value: 'engagement' },
          { title: 'Reception', value: 'reception' }
        ]
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'date'
    },
    {
      name: 'featured',
      title: 'Featured Image',
      type: 'boolean',
      initialValue: false,
      description: 'Set this to true to feature this image on the homepage'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used to control the order of images in the gallery'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    },
    {
      title: 'Event Date',
      name: 'dateDesc',
      by: [
        { field: 'date', direction: 'desc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category'
    },
    prepare({ title, media, category }: { title: string; media: unknown; category: string }) {
      return {
        title,
        subtitle: category,
        media
      }
    }
  }
}
