"use client";

import { useState, useEffect } from "react";
import CourseCard from "@/components/CourseCard";
import PaymentModal from "@/components/PaymentModal";

export default function OnlineCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = (course) => {
    setSelectedCourse(course);
    setShowPaymentModal(true);
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <main className="p-6">
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-gray-600">Loading courses...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-2">Online Courses & Exams</h1>
      <p className="text-gray-600 mb-8">
        Explore and purchase our online courses to enhance your learning
      </p>

      {courses.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 text-lg">No courses available at the moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>
      )}

      {showPaymentModal && selectedCourse && (
        <PaymentModal
          course={selectedCourse}
          onClose={handlePaymentClose}
        />
      )}
    </main>
  );
}
