import {defineField, defineType} from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Image Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true // Enables the hotspot functionality for image cropping
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Wedding', value: 'wedding'},
          {title: 'Pre-Wedding', value: 'pre-wedding'},
          {title: 'Engagement', value: 'engagement'},
          {title: 'Reception', value: 'reception'}
        ]
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Image',
      type: 'boolean',
      initialValue: false,
      description: 'Set this to true to feature this image on the homepage'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used to control the order of images in the gallery'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    })
  ]
})
