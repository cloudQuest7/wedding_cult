interface FeedbackField {
    name: string;
    title: string;
    type: string;
    validation?: (Rule: any) => any;
    options?: {
        list: { title: string; value: string }[];
        layout: string;
    };
}

interface FeedbackSchema {
    name: string;
    title: string;
    type: string;
    fields: FeedbackField[];
}

const feedbackSchema: FeedbackSchema = {
    name: 'feedback',
    title: 'Feedback',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'message',
            title: 'Message',
            type: 'text',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule: any) => Rule.required().min(1).max(5)
        },
        {
            name: 'dateSubmitted',
            title: 'Date Submitted',
            type: 'datetime',
            validation: (Rule: any) => Rule.required()
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
                layout: 'radio'
            },
            validation: (Rule: any) => Rule.required()
        }
    ]
};

export default feedbackSchema;
