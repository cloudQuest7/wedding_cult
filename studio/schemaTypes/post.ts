import { defineType } from "sanity";

export default defineType({
  name: "post",
  type: "document",
  title: "Post",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "body",
      type: "text",
      title: "Body",
    },
    {
      name: "image",
      type: "image",
      title: "Image",
    },
  ],
});
