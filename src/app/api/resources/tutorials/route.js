import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tutorials = [
      {
        id: 1,
        title: "HTML & CSS Full Course - Beginner to Pro",
        youtubeEmbedUrl: "https://www.youtube.com/embed/mU6anWqZJcc",
        instructor: "SuperSimpleDev",
        category: "Web Development",
        duration: "4 hours",
        level: "Beginner",
        description: "Learn HTML and CSS from scratch with real-world examples"
      },
      {
        id: 2,
        title: "JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour",
        youtubeEmbedUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
        instructor: "Programming with Mosh",
        category: "Programming",
        duration: "1 hour",
        level: "Beginner",
        description: "Master the fundamentals of JavaScript programming"
      },
      {
        id: 3,
        title: "React Tutorial for Beginners",
        youtubeEmbedUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        instructor: "Programming with Mosh",
        category: "React",
        duration: "2 hours",
        level: "Beginner",
        description: "Build interactive UIs with React library"
      },
      {
        id: 4,
        title: "Node.js and Express.js - Full Course",
        youtubeEmbedUrl: "https://www.youtube.com/embed/Oe421EPjeBE",
        instructor: "freeCodeCamp.org",
        category: "Backend Development",
        duration: "8 hours",
        level: "Intermediate",
        description: "Complete guide to building servers with Node.js and Express"
      },
      {
        id: 5,
        title: "Tailwind CSS Full Course",
        youtubeEmbedUrl: "https://www.youtube.com/embed/3m3j-0d3j-U",
        instructor: "Developedbyed",
        category: "CSS Framework",
        duration: "3 hours",
        level: "Beginner",
        description: "Learn utility-first CSS with Tailwind CSS"
      },
      {
        id: 6,
        title: "MongoDB Complete Guide",
        youtubeEmbedUrl: "https://www.youtube.com/embed/ofme2o7iNL8",
        instructor: "Academind",
        category: "Database",
        duration: "6 hours",
        level: "Intermediate",
        description: "Master MongoDB and NoSQL database design"
      },
      {
        id: 7,
        title: "Next.js 14 Complete Guide",
        youtubeEmbedUrl: "https://www.youtube.com/embed/0fONBSYfwkU",
        instructor: "Academind",
        category: "Web Development",
        duration: "5 hours",
        level: "Intermediate",
        description: "Build full-stack applications with Next.js"
      },
      {
        id: 8,
        title: "TypeScript Masterclass",
        youtubeEmbedUrl: "https://www.youtube.com/embed/jBmWLCMSUZo",
        instructor: "Academind",
        category: "Programming",
        duration: "4 hours",
        level: "Intermediate",
        description: "Advanced TypeScript concepts and best practices"
      }
    ];

    return NextResponse.json({ tutorials }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tutorials:", error);
    return NextResponse.json(
      { error: "Failed to fetch tutorials" },
      { status: 500 }
    );
  }
}
