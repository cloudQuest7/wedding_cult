import groq from 'groq';

export const allPostsQuery = groq`*[_type == "post"]{
  _id,
  title,
  slug,
  body
}`;
