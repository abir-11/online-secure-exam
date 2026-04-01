// import { blogs } from "../data";
// import Link from "next/link";

// export default function BlogDetails({ params }) {
//   const blog = blogs.find((b) => b.id === params.id);

//   if (!blog) {
//     return <div className="text-white text-center mt-20">Blog not found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white px-6 py-16">
//       <div className="max-w-3xl mx-auto">
//         {/* Back Button */}
//         <Link href="/community/blog">
//           <button className="mb-6 text-emerald-400 hover:underline">
//             ← Back to Blogs
//           </button>
//         </Link>

//         {/* Image */}
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="w-full h-72 object-cover rounded-xl mb-6"
//         />

//         {/* Title */}
//         <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

//         {/* Content */}
//         <p className="text-emerald-200 leading-relaxed">{blog.content}</p>
//       </div>
//     </div>
//   );
// }

import { blogs } from "../data";
import Link from "next/link";

export default async function BlogDetails({ params }) {
  const { id } = await params; // ✅ FIX HERE

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return <div className="text-white text-center mt-20">Blog not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/community/blog">
          <button className="mb-6 text-emerald-400 hover:underline">
            ← Back to Blogs
          </button>
        </Link>

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

        <p className="text-emerald-200 leading-relaxed">{blog.content}</p>
      </div>
    </div>
  );
}
