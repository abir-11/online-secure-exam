import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apis = [
      {
        id: 1,
        name: "Get User Profile",
        endpoint: "GET /api/user/profile",
        method: "GET",
        category: "User",
        description: "Retrieve the authenticated user's profile information including name, email, role, and account details.",
        parameters: [
          {
            name: "Authorization",
            type: "header",
            required: true,
            description: "Bearer token for authentication"
          }
        ],
        responseExample: `{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}`
      },
      {
        id: 2,
        name: "Create Exam",
        endpoint: "POST /api/instructor/exams",
        method: "POST",
        category: "Exams",
        description: "Create a new exam with questions and settings. Only accessible by instructors.",
        parameters: [
          {
            name: "title",
            type: "string",
            required: true,
            description: "Title of the exam"
          },
          {
            name: "duration",
            type: "number",
            required: true,
            description: "Exam duration in minutes"
          },
          {
            name: "totalQuestions",
            type: "number",
            required: true,
            description: "Total number of questions in the exam"
          },
          {
            name: "passingScore",
            type: "number",
            required: true,
            description: "Minimum passing score percentage"
          }
        ],
        responseExample: `{
  "success": true,
  "examId": "507f1f77bcf86cd799439012",
  "message": "Exam created successfully"
}`
      },
      {
        id: 3,
        name: "Submit Exam",
        endpoint: "POST /api/student/exam/submit",
        method: "POST",
        category: "Exams",
        description: "Submit completed exam answers and calculations. Automatically triggers evaluation.",
        parameters: [
          {
            name: "examId",
            type: "string",
            required: true,
            description: "ID of the exam being submitted"
          },
          {
            name: "answers",
            type: "array",
            required: true,
            description: "Array of answer objects with questionId and answer"
          },
          {
            name: "timeSpent",
            type: "number",
            required: true,
            description: "Time spent on exam in seconds"
          }
        ],
        responseExample: `{
  "success": true,
  "attemptId": "507f1f77bcf86cd799439013",
  "score": 85,
  "percentage": 85,
  "status": "completed"
}`
      },
      {
        id: 4,
        name: "Get Exam Results",
        endpoint: "GET /api/student/results/:examId",
        method: "GET",
        category: "Results",
        description: "Fetch detailed results including score, answers, and feedback for a specific exam attempt.",
        parameters: [
          {
            name: "examId",
            type: "string",
            required: true,
            description: "ID of the exam to get results for"
          }
        ],
        responseExample: `{
  "success": true,
  "result": {
    "examId": "507f1f77bcf86cd799439012",
    "score": 85,
    "totalQuestions": 10,
    "correctAnswers": 8,
    "percentage": 80,
    "status": "passed",
    "submittedAt": "2024-01-15T14:30:00Z"
  }
}`
      },
      {
        id: 5,
        name: "Process Payment",
        endpoint: "POST /api/payments/create-checkout",
        method: "POST",
        category: "Payments",
        description: "Process course payment and enroll student. Handles payment validation and enrollment.",
        parameters: [
          {
            name: "courseId",
            type: "string",
            required: true,
            description: "ID of the course to purchase"
          },
          {
            name: "amount",
            type: "number",
            required: true,
            description: "Payment amount in cents"
          },
          {
            name: "cardNumber",
            type: "string",
            required: true,
            description: "Card number (test: 4242 4242 4242 4242)"
          }
        ],
        responseExample: `{
  "success": true,
  "transactionId": "txn_1234567890",
  "message": "Payment processed successfully"
}`
      },
      {
        id: 6,
        name: "Get Payment History",
        endpoint: "GET /api/payments/history",
        method: "GET",
        category: "Payments",
        description: "Retrieve all payment transactions for the authenticated user.",
        parameters: [
          {
            name: "Authorization",
            type: "header",
            required: true,
            description: "Bearer token for authentication"
          }
        ],
        responseExample: `{
  "success": true,
  "payments": [
    {
      "id": "pay_1",
      "courseId": "507f1f77bcf86cd799439014",
      "amount": 4999,
      "status": "completed",
      "transactionId": "txn_abc123",
      "createdAt": "2024-01-10T10:30:00Z"
    }
  ]
}`
      },
      {
        id: 7,
        name: "Register User",
        endpoint: "POST /api/auth/register",
        method: "POST",
        category: "Authentication",
        description: "Create a new user account with email and credentials.",
        parameters: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Full name of the user"
          },
          {
            name: "email",
            type: "string",
            required: true,
            description: "Email address (must be unique)"
          },
          {
            name: "password",
            type: "string",
            required: true,
            description: "Password (minimum 8 characters)"
          },
          {
            name: "role",
            type: "string",
            required: true,
            description: "User role: student, instructor, or admin"
          }
        ],
        responseExample: `{
  "success": true,
  "userId": "507f1f77bcf86cd799439015",
  "message": "User registered successfully"
}`
      },
      {
        id: 8,
        name: "Upload Profile Picture",
        endpoint: "POST /api/upload-profile",
        method: "POST",
        category: "Profile",
        description: "Upload and update user profile picture. Supports JPG, PNG formats.",
        parameters: [
          {
            name: "file",
            type: "file",
            required: true,
            description: "Image file (max 5MB)"
          }
        ],
        responseExample: `{
  "success": true,
  "imageUrl": "https://cdn.example.com/uploads/profile-123.jpg",
  "message": "Profile picture updated"
}`
      },
      {
        id: 9,
        name: "Create Forum Post",
        endpoint: "POST /api/forum/posts",
        method: "POST",
        category: "Community",
        description: "Create a new discussion forum post in the community section.",
        parameters: [
          {
            name: "title",
            type: "string",
            required: true,
            description: "Title of the forum post"
          },
          {
            name: "content",
            type: "string",
            required: true,
            description: "Content of the post (supports markdown)"
          },
          {
            name: "category",
            type: "string",
            required: true,
            description: "Forum category (general, help, feedback)"
          }
        ],
        responseExample: `{
  "success": true,
  "postId": "507f1f77bcf86cd799439016",
  "createdAt": "2024-01-15T15:30:00Z"
}`
      },
      {
        id: 10,
        name: "Get Admin Analytics",
        endpoint: "GET /api/admin/analytics/stats",
        method: "GET",
        category: "Admin",
        description: "Retrieve platform-wide analytics including users, exams, and revenue data.",
        parameters: [
          {
            name: "Authorization",
            type: "header",
            required: true,
            description: "Bearer token (admin only)"
          }
        ],
        responseExample: `{
  "success": true,
  "stats": {
    "totalUsers": 5000,
    "totalExams": 1200,
    "totalRevenue": 125000,
    "activeStudents": 3500,
    "completedExams": 950
  }
}`
      }
    ];

    return NextResponse.json({ apis }, { status: 200 });
  } catch (error) {
    console.error("Error fetching API documentation:", error);
    return NextResponse.json(
      { error: "Failed to fetch API documentation" },
      { status: 500 }
    );
  }
}
