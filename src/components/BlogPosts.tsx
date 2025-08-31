import { useEffect, useState } from "react";
import { client } from "../sanity"; // adjust path if needed
import type { Post } from "../types/offer";

const BlogPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    client
  .fetch<Post[]>(`*[_type == "post"]{_id, title, body, image{asset->{url}}}`)
  .then((data) => {
    console.log("Fetched posts:", data);
    setPosts(data);
  })
  .catch(console.error);

  }, []);

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-900">
        ✨ Wedding Cult Blog
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article
            key={p._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {p.image?.asset?.url && (
              <img
                src={p.image.asset.url}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-5 flex flex-col">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                {p.title}
              </h2>
              <p className="text-gray-600 text-sm md:text-base line-clamp-3">
                {p.body}
              </p>

              <button className="mt-4 inline-block self-start text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors">
                Read More →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogPosts;
