// // "use client";

// // import { useState } from "react";
// // import { FiSearch, FiMessageCircle, FiThumbsUp, FiSend } from "react-icons/fi";

// // export default function ForumPage() {
// //   const [posts, setPosts] = useState([
// //     {
// //       id: 1,
// //       title: "How does AI proctoring work?",
// //       content: "Can someone explain how SecureExam detects cheating?",
// //       author: "Student",
// //       likes: 12,
// //       replies: 4,
// //     },
// //     {
// //       id: 2,
// //       title: "Exam submission issue",
// //       content: "My exam auto-submitted before time. Why?",
// //       author: "User123",
// //       likes: 5,
// //       replies: 2,
// //     },
// //   ]);

// //   const [search, setSearch] = useState("");
// //   const [newPost, setNewPost] = useState({
// //     title: "",
// //     content: "",
// //   });

// //   const handlePost = () => {
// //     if (!newPost.title || !newPost.content) return;

// //     const post = {
// //       id: Date.now(),
// //       title: newPost.title,
// //       content: newPost.content,
// //       author: "You",
// //       likes: 0,
// //       replies: 0,
// //     };

// //     setPosts([post, ...posts]);
// //     setNewPost({ title: "", content: "" });
// //   };

// //   const filteredPosts = posts.filter((post) =>
// //     post.title.toLowerCase().includes(search.toLowerCase()),
// //   );

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022c22] text-white px-4 sm:px-6 lg:px-12 py-16">
// //       {/* Header */}
// //       <div className="max-w-4xl mx-auto text-center">
// //         <h1 className="text-4xl md:text-5xl font-bold">
// //           Community <span className="text-emerald-400">Forum</span>
// //         </h1>
// //         <p className="mt-4 text-gray-300">
// //           Ask questions, share ideas, and connect with other SecureExam users.
// //         </p>

// //         {/* Search */}
// //         <div className="mt-8 flex items-center bg-white/10 border border-white/20 rounded-lg px-4 py-2 backdrop-blur">
// //           <FiSearch />
// //           <input
// //             type="text"
// //             placeholder="Search discussions..."
// //             className="bg-transparent outline-none ml-2 w-full text-white placeholder-gray-400"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //         </div>
// //       </div>

// //       {/* Create Post */}
// //       <div className="max-w-4xl mx-auto mt-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
// //         <h2 className="text-lg font-semibold mb-4 text-emerald-400">
// //           Create a Post
// //         </h2>

// //         <input
// //           type="text"
// //           placeholder="Post title..."
// //           value={newPost.title}
// //           onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
// //           className="input input-bordered w-full mb-4 bg-white/10 border-white/20 text-white"
// //         />

// //         <textarea
// //           placeholder="Write your question or idea..."
// //           value={newPost.content}
// //           onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
// //           className="textarea textarea-bordered w-full h-24 bg-white/10 border-white/20 text-white"
// //         ></textarea>

// //         <button
// //           onClick={handlePost}
// //           className="mt-4 px-6 py-2 bg-emerald-500 text-black rounded-lg hover:scale-105 transition flex items-center gap-2"
// //         >
// //           Post <FiSend />
// //         </button>
// //       </div>

// //       {/* Posts */}
// //       <div className="max-w-4xl mx-auto mt-10 space-y-6">
// //         {filteredPosts.length > 0 ? (
// //           filteredPosts.map((post) => (
// //             <div
// //               key={post.id}
// //               className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:scale-[1.02] transition"
// //             >
// //               <h3 className="text-xl font-semibold">{post.title}</h3>

// //               <p className="text-gray-300 mt-2 text-sm">{post.content}</p>

// //               <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
// //                 <span>Posted by {post.author}</span>

// //                 <div className="flex items-center gap-4">
// //                   <span className="flex items-center gap-1">
// //                     <FiThumbsUp /> {post.likes}
// //                   </span>
// //                   <span className="flex items-center gap-1">
// //                     <FiMessageCircle /> {post.replies}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <p className="text-center text-gray-400 mt-10">
// //             No discussions found.
// //           </p>
// //         )}
// //       </div>

// //       {/* CTA */}
// //       <div className="text-center mt-20">
// //         <h2 className="text-2xl font-semibold">Need Help Fast?</h2>
// //         <p className="text-gray-300 mt-2">
// //           Use our AI chatbot or support page.
// //         </p>

// //         <button className="mt-6 px-6 py-3 bg-emerald-500 text-black rounded-lg hover:scale-105 transition">
// //           Go to Support
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// //...

// "use client";

// import { useEffect, useState } from "react";
// import { FiSearch, FiMessageCircle, FiThumbsUp, FiSend } from "react-icons/fi";
// import Swal from "sweetalert2";

// export default function Page() {
//   const [posts, setPosts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [newPost, setNewPost] = useState({
//     title: "",
//     content: "",
//   });

//   // ✅ Load posts from DB
//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const res = await fetch("/api/forum");
//       const data = await res.json();
//       setPosts(data);
//     } catch (error) {
//       console.error("Failed to load posts");
//     }
//   };

//   // ✅ Create post
//   const handlePost = async () => {
//     if (!newPost.title || !newPost.content) {
//       return Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill all fields",
//         confirmButtonColor: "#10b981",
//       });
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("/api/forum", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: newPost.title,
//           content: newPost.content,
//           author: "You",
//         }),
//       });

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Posted!",
//           text: "Your post has been published.",
//           confirmButtonColor: "#10b981",
//         });

//         setNewPost({ title: "", content: "" });
//         fetchPosts();
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to post",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Server error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredPosts = posts.filter((post) =>
//     post.title?.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022c22] text-white px-4 sm:px-6 lg:px-12 py-16">
//       {/* HEADER */}
//       <div className="max-w-4xl mx-auto text-center">
//         <h1 className="text-4xl font-bold">
//           Community <span className="text-emerald-400">Forum</span>
//         </h1>
//         <p className="mt-3 text-gray-300">
//           Ask questions and share ideas with others.
//         </p>

//         {/* SEARCH */}
//         <div className="mt-6 flex items-center bg-white/10 border border-white/20 rounded-lg px-4 py-2 backdrop-blur">
//           <FiSearch />
//           <input
//             type="text"
//             placeholder="Search posts..."
//             className="bg-transparent outline-none ml-2 w-full text-white"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* CREATE POST */}
//       <div className="max-w-4xl mx-auto mt-10 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg">
//         <h2 className="text-lg font-semibold text-emerald-400 mb-4">
//           Create a Post
//         </h2>

//         <input
//           type="text"
//           placeholder="Post title..."
//           value={newPost.title}
//           onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//           className="input input-bordered w-full mb-4 bg-white/10 border-white/20 text-white"
//         />

//         <textarea
//           placeholder="Write your question..."
//           value={newPost.content}
//           onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//           className="textarea textarea-bordered w-full h-24 bg-white/10 border-white/20 text-white"
//         ></textarea>

//         <button
//           onClick={handlePost}
//           disabled={loading}
//           className="mt-4 px-6 py-2 bg-emerald-500 text-black rounded-lg hover:scale-105 transition flex items-center gap-2"
//         >
//           {loading ? "Posting..." : "Post"} <FiSend />
//         </button>
//       </div>

//       {/* POSTS */}
//       <div className="max-w-4xl mx-auto mt-10 space-y-6">
//         {filteredPosts.length > 0 ? (
//           filteredPosts.map((post) => (
//             <div
//               key={post._id}
//               className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:scale-[1.02] transition"
//             >
//               <h3 className="text-xl font-semibold">{post.title}</h3>

//               <p className="text-gray-300 mt-2 text-sm">{post.content}</p>

//               <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
//                 <span>Posted by {post.author}</span>

//                 <div className="flex gap-4">
//                   <span className="flex items-center gap-1">
//                     <FiThumbsUp /> {post.likes}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <FiMessageCircle /> {post.replies}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-400 mt-10">No posts found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { FiSearch, FiMessageCircle, FiThumbsUp, FiSend } from "react-icons/fi";
import Swal from "sweetalert2";

// ✅ STATIC POSTS (keep forever)
const staticPosts = [
  {
    _id: "static-1",
    title: "How does AI proctoring work?",
    content: "Can someone explain how SecureExam detects cheating?",
    author: "Student",
    likes: 12,
    replies: 4,
  },
  {
    _id: "static-2",
    title: "Exam submission issue",
    content: "My exam auto-submitted before time. Why?",
    author: "User123",
    likes: 5,
    replies: 2,
  },
];

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });

  // ✅ Load DB + merge with static
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/forum");
      const dbPosts = await res.json();

      // 🔥 Merge static + DB
      setPosts([...staticPosts, ...dbPosts]);
    } catch (error) {
      console.error("Failed to load posts");

      // fallback → show static only
      setPosts(staticPosts);
    }
  };

  // ✅ Create post
  const handlePost = async () => {
    if (!newPost.title || !newPost.content) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields",
        confirmButtonColor: "#10b981",
      });
    }

    setLoading(true);

    try {
      const res = await fetch("/api/forum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          author: "You",
        }),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Posted!",
          text: "Your post has been published.",
          confirmButtonColor: "#10b981",
        });

        setNewPost({ title: "", content: "" });
        fetchPosts(); // reload (keeps static + new)
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to post",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022c22] text-white px-4 sm:px-6 lg:px-12 py-16">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold">
          Community <span className="text-emerald-400">Forum</span>
        </h1>

        <div className="mt-6 flex items-center bg-white/10 border border-white/20 rounded-lg px-4 py-2 backdrop-blur">
          <FiSearch />
          <input
            type="text"
            placeholder="Search posts..."
            className="bg-transparent outline-none ml-2 w-full text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* CREATE POST */}
      <div className="max-w-4xl mx-auto mt-10 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg">
        <h2 className="text-lg font-semibold text-emerald-400 mb-4">
          Create a Post
        </h2>

        <input
          type="text"
          placeholder="Post title..."
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="input input-bordered w-full mb-4 bg-white/10 border-white/20 text-white"
        />

        <textarea
          placeholder="Write your question..."
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="textarea textarea-bordered w-full h-24 bg-white/10 border-white/20 text-white"
        ></textarea>

        <button
          onClick={handlePost}
          disabled={loading}
          className="mt-4 px-6 py-2 bg-emerald-500 text-black rounded-lg hover:scale-105 transition flex items-center gap-2"
        >
          {loading ? "Posting..." : "Post"} <FiSend />
        </button>
      </div>

      {/* POSTS */}
      <div className="max-w-4xl mx-auto mt-10 space-y-6">
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:scale-[1.02] transition"
          >
            <h3 className="text-xl font-semibold">{post.title}</h3>

            <p className="text-gray-300 mt-2 text-sm">{post.content}</p>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
              <span>Posted by {post.author}</span>

              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <FiThumbsUp /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <FiMessageCircle /> {post.replies}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
