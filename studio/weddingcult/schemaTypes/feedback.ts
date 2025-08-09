import {defineField, defineType} from 'sanity'

export const feedbackType = defineType({
  name: 'feedback',
  title: 'Customer Feedback',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'message',
      title: 'Feedback Message',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dateSubmitted',
      title: 'Submission Date',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Approved', value: 'approved'},
          {title: 'Rejected', value: 'rejected'}
        ],
      },
      initialValue: 'pending'
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Website',
      type: 'boolean',
      initialValue: false
    })
  ]
})
