"use client";

import { useEffect, useState } from "react";
import { FiSearch, FiMessageCircle, FiThumbsUp, FiSend } from "react-icons/fi";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

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

export default function ForumPage() {
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
        background: "#022c22",
        color: "#fff",
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
          background: "#022c22",
          color: "#fff",
        });

        setNewPost({ title: "", content: "" });
        fetchPosts(); // reload (keeps static + new)
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to post",
        confirmButtonColor: "#10b981",
        background: "#022c22",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(search.toLowerCase()),
  );

  // --- Framer Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-white px-4 sm:px-6 lg:px-12 py-20 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-sm">
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Forum</span>
          </h1>
          <p className="text-emerald-100/70 mb-8 font-medium">Join the discussion, ask questions, and share insights.</p>

          {/* Search Bar */}
          <div className="flex items-center bg-emerald-900/40 border border-emerald-700/50 rounded-2xl px-4 py-3 backdrop-blur-md shadow-inner focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400/50 transition-all max-w-2xl mx-auto">
            <FiSearch className="text-emerald-400 text-xl" />
            <input
              type="text"
              placeholder="Search discussions..."
              className="bg-transparent outline-none ml-3 w-full text-white placeholder-emerald-300/50 font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        {/* CREATE POST */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 bg-emerald-900/40 backdrop-blur-xl border border-emerald-700/50 rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_rgb(0,0,0,0.3)]"
        >
          <h2 className="text-xl font-bold text-emerald-300 mb-6 flex items-center gap-2">
            <FiMessageCircle /> Create a Discussion
          </h2>

          <input
            type="text"
            placeholder="Discussion title..."
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full bg-emerald-950/60 border border-emerald-700/60 rounded-xl px-4 py-3 mb-4 text-white placeholder-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 transition-all shadow-inner"
          />

          <textarea
            placeholder="What's on your mind? Write your question or thought here..."
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="w-full bg-emerald-950/60 border border-emerald-700/60 rounded-xl px-4 py-3 h-32 text-white placeholder-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 transition-all shadow-inner resize-none"
          ></textarea>

          <div className="flex justify-end mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePost}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold rounded-xl shadow-md hover:from-emerald-400 hover:to-teal-300 transition-all flex items-center gap-2 disabled:opacity-70 border border-emerald-400/30"
            >
              {loading ? "Posting..." : "Publish Post"} <FiSend />
            </motion.button>
          </div>
        </motion.div>

        {/* POSTS LIST */}
        <div className="mt-12 space-y-6">
          <AnimatePresence>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.div
                  key={post._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-emerald-900/30 backdrop-blur-lg border border-emerald-700/40 rounded-2xl p-6 shadow-lg hover:shadow-emerald-900/50 transition-all group"
                >
                  <h3 className="text-2xl font-bold text-emerald-100 group-hover:text-emerald-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-emerald-50/80 mt-3 text-base leading-relaxed">
                    {post.content}
                  </p>

                  {/* Commented out section (styled beautifully if you want to uncomment it later) */}
                  {/* <div className="flex flex-wrap justify-between items-center mt-6 pt-4 border-t border-emerald-700/30 text-sm text-emerald-300/70 font-medium">
                    <span className="bg-emerald-950/50 px-3 py-1 rounded-lg">Posted by <span className="text-emerald-200">{post.author || "Anonymous"}</span></span>

                    <div className="flex gap-4 mt-3 sm:mt-0">
                      <span className="flex items-center gap-1.5 hover:text-emerald-400 cursor-pointer transition-colors">
                        <FiThumbsUp /> {post.likes || 0}
                      </span>
                      <span className="flex items-center gap-1.5 hover:text-emerald-400 cursor-pointer transition-colors">
                        <FiMessageCircle /> {post.replies || 0}
                      </span>
                    </div>
                  </div> */}
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-10 text-emerald-300/60 font-medium"
              >
                No discussions found matching "{search}"
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}