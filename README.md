# SecureExam

Online examination platform with role-based dashboards, analytics, and secure authentication.

---

## Overview

SecureExam is a full-stack exam management system with **Admin, Instructor, and Student roles**.
It supports exam creation, user management, analytics, and secure authentication.

 <img src="https://i.postimg.cc/1zZXnBLp/exam.png" alt="secureexam" width="400px" />

 ## Live

https://online-secure-exam-one.vercel.app/

---

## Features

* Role-based dashboards (Admin / Instructor / Student)
* User management with status control (Active, Inactive, Deleted)
* Exam creation and participation system
* Analytics & reports (performance, exams, batches, courses)
* Secure authentication (JWT + OAuth)
* Payment integration (Stripe)
* Email notifications (password reset, alerts)
* Fully responsive UI

---

## Tech Stack

**Frontend**

* Next.js
* React
* Tailwind CSS

**Backend**

* Next.js API Routes
* MongoDB
* NextAuth.js
* JWT, Bcrypt

**Services**

* Stripe
* Cloudinary
* Resend / Nodemailer
* Vercel

---

## ⚙️ Setup

```bash
git clone https://github.com/abir-11/online-secure-exam.git
cd online-secure-exam
npm install
npm run dev
```

Create `.env.local` and add:

```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_key
```

---

⭐ Star the repo if you find it useful
