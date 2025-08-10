import { Rule } from 'sanity';

export default {
  name: 'feedback',
  title: 'Couple Feedback',
  type: 'document',
  fields: [
    {
      name: 'names',
      title: 'Couple Names',
      type: 'string',
      description: 'Names of the couple (e.g., "Kavita & Raj")',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Location of the couple',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'review',
      title: 'Review',
      type: 'text',
      description: 'The feedback/review from the couple',
      validation: (Rule: Rule) => Rule.required().min(10).max(200)
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5',
      validation: (Rule: Rule) => Rule.required().min(1).max(5)
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Only approved feedback will be shown on the website',
      initialValue: false
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'When was this feedback given',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'featured',
      title: 'Feature on Website',
      type: 'boolean',
      initialValue: false
    }
  ]
}
