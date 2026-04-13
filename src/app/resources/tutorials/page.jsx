"use client";

import { useState } from "react";

export default function TutorialsPage() {
  // --- Tutorial Data ---
  const tutorialsData = [
    {
      id: 1,
      category: "React",
      tutorials: [
        {
          id: 1,
          title: "React Basics",
          description: "Learn components, state, and props in React.",
          videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
          thumbnail: "https://img.youtube.com/vi/dGcsHMXbSOA/0.jpg",
        },
        {
          id: 2,
          title: "React Hooks",
          description: "Explore useState, useEffect, and custom hooks.",
          videoUrl: "https://www.youtube.com/embed/f687hBjwFcM",
          thumbnail: "https://img.youtube.com/vi/f687hBjwFcM/0.jpg",
        },
      ],
    },
    {
      id: 2,
      category: "Next.js",
      tutorials: [
        {
          id: 1,
          title: "Next.js Introduction",
          description: "Build SEO-friendly apps using Next.js.",
          videoUrl: "https://www.youtube.com/embed/IkOVe40Sy0U",
          thumbnail: "https://img.youtube.com/vi/IkOVe40Sy0U/0.jpg",
        },
        {
          id: 2,
          title: "Next.js API Routes",
          description: "Learn backend routes inside Next.js apps.",
          videoUrl: "https://www.youtube.com/watch?v=gEB3ckYeZF4",
          thumbnail: "https://img.youtube.com/vi/gEB3ckYeZF4/0.jpg",
        },
      ],
    },
    {
      id: 3,
      category: "Firebase",
      tutorials: [
        {
          id: 1,
          title: "Firebase Authentication",
          description: "Implement Google, Email, and Social login.",
          videoUrl: "https://www.youtube.com/watch?v=p9pgI3Mg-So&t=1125s",
          thumbnail: "https://img.youtube.com/vi/p9pgI3Mg-So/0.jpg",
        },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Flatten all tutorials for the default view
  const allTutorials = tutorialsData.flatMap((cat) =>
    cat.tutorials.map((tut) => ({ ...tut, category: cat.category })),
  );

  // Function to open tutorial in new tab
  const openTutorial = (videoUrl) => {
    const youtubeLink = videoUrl.replace("/embed/", "/watch?v=");
    window.open(youtubeLink, "_blank");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#064e3b", // emerald-950
        color: "#f0fdf4",
        padding: "60px 20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          fontSize: "2.5rem",
          color: "#bbf7d0",
        }}
      >
        Tutorials
      </h1>

      {/* Categories */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "40px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {tutorialsData.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "12px 25px",
              borderRadius: "25px",
              border: "none",
              cursor: "pointer",
              backgroundColor:
                selectedCategory?.id === cat.id ? "#22c55e" : "#065f46",
              color: "#f0fdf4",
              fontWeight: "bold",
              transition: "all 0.3s",
              boxShadow:
                selectedCategory?.id === cat.id
                  ? "0 5px 15px rgba(34,197,94,0.3)"
                  : "none",
            }}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Tutorials Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {(selectedCategory ? selectedCategory.tutorials : allTutorials).map(
          (tut) => (
            <div
              key={tut.videoUrl}
              onClick={() => openTutorial(tut.videoUrl)}
              style={{
                background: "#065f46",
                padding: "15px",
                borderRadius: "20px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
                color: "#f0fdf4",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 30px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0,0,0,0.08)";
              }}
            >
              <img
                src={tut.thumbnail}
                alt={tut.title}
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  marginBottom: "15px",
                }}
              />
              <h3
                style={{
                  marginBottom: "12px",
                  fontSize: "1.2rem",
                  color: "#bbf7d0",
                }}
              >
                {tut.title}
              </h3>
              <p style={{ color: "#d1fae5", fontSize: "0.9rem" }}>
                {tut.category}
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
