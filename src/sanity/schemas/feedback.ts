import { Rule } from 'sanity';

export default {
  name: 'feedback',
  title: 'Customer Feedback',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().email()
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: Rule) => Rule.required().min(1).max(5)
    },
    {
      name: 'message',
      title: 'Feedback Message',
      type: 'text',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'dateSubmitted',
      title: 'Submission Date',
      type: 'datetime',
      readOnly: true,
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' }
        ],
      },
      initialValue: 'pending'
    },
    {
      name: 'featured',
      title: 'Feature on Website',
      type: 'boolean',
      initialValue: false
    }
  ]
}
