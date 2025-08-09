import groq from 'groq';

export const allPostsQuery = groq`*[_type == "post"]{
  _id,
  title,
  slug,
  body
}`;

export const feedbacksQuery = groq`{
  "reviews": *[_type == "feedback" && approved == true] | order(_createdAt desc) {
    names,
    location,
    review,
    rating
  },
  "stats": {
    "totalReviews": count(*[_type == "feedback" && approved == true]),
    "averageRating": avg(*[_type == "feedback" && approved == true].rating)
  }
}`;
