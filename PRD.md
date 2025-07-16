# Product Requirements Document: Edueme

## 1. Introduction

This document outlines the product requirements for Edueme, a comprehensive online educational platform. Edueme aims to provide an engaging and interactive learning experience for students, offering a variety of courses, events, and resources. The platform is built using modern web technologies to ensure scalability, performance, and a rich user interface.

## 2. Product Overview

Edueme is a web-based application designed to facilitate online education. It serves as a central hub for students to discover and enroll in courses, participate in events, access learning materials, and track their progress. Educators can use the platform to create and manage courses, host events, and interact with students. Administrators have overarching control over user, course, and event management, as well as data export functionalities.

## 3. Goals

*   To provide a user-friendly and intuitive platform for online learning.
*   To offer a diverse range of educational content, including structured courses with chapters and classes, and various events.
*   To enable seamless and secure user authentication and management for different roles (Student, Teacher, Admin).
*   To support secure payment processing for course enrollments via Razorpay.
*   To provide comprehensive tools for educators to manage their course content (chapters, classes) and class links.
*   To provide administrative capabilities for managing users, courses, chapters, events, and data exports.
*   To ensure a visually appealing and responsive user interface across various devices.

## 4. Target Audience

*   **Students:** Individuals seeking to learn new skills, enroll in courses, and participate in educational events.
*   **Educators/Instructors:** Professionals and experts who want to share their knowledge by creating and teaching courses, managing class content, and providing live class links.
*   **Administrators:** Personnel responsible for overall platform management, including user, course, chapter, and event administration, and data reporting.

## 5. Key Features

### 5.1. User Management & Authentication
*   **User Roles:** Support for Student, Teacher, and Super Admin roles.
*   **Registration & Login:** Separate registration flows for students and teachers; unified login for all roles.
*   **Profile Management:** Users can view and potentially update their profiles.
*   **Password Management:** Forgot password and reset password functionalities.
*   **Session Management:** Secure user sessions using NextAuth.js with JWT strategy.

### 5.2. Course & Learning Management
*   **Course Catalog:** Publicly accessible page to browse and view available courses.
*   **Course Details:** Dedicated pages for each course displaying description, associated teacher, and chapters.
*   **Course Structure:** Courses are composed of Chapters, and Chapters contain Classes (lessons/videos).
*   **Student Course Access:** Students are enrolled in one course at a time and can access its chapters and classes.
*   **Teacher Course Management:** Teachers can manage chapters and classes within their assigned course, including adding/updating/deleting classes and updating chapter completion status.
*   **Admin Course Management:** Administrators can create, view, update, and delete courses and chapters.
*   **Class Links:** Teachers can provide live class links associated with their courses.

### 5.3. Event Management
*   **Event Listing:** Display upcoming events with details like title, description, venue, date, registration fee, and link.
*   **Event Details:** Dedicated pages for individual events.
*   **Admin Event Management:** Administrators can create, view, update, and delete upcoming events.

### 5.4. Payment & Enrollment
*   **Secure Checkout:** Integration with Razorpay for processing course payments.
*   **Order Creation & Verification:** Backend APIs for creating payment orders and verifying payment signatures.
*   **Enrollment Logic:** Upon successful payment, students are enrolled in the selected course, and their `courseID` is updated in the database.
*   **Receipt Generation:** Functionality to download payment receipts (PDF).

### 5.5. Dashboard Functionality
*   **Student Dashboard:** View enrolled course, access chapters and classes, view profile.
*   **Teacher Dashboard:** Manage assigned course, chapters, classes, and class links.
*   **Admin Dashboard:** Manage teachers, students, courses, chapters, events, and download data (teachers, students).

### 5.6. Content & Information Display
*   **Landing Pages:** Dynamic landing pages showcasing features, testimonials, academic year information, and announcements.
*   **Blogs:** Section for displaying blog posts.
*   **Gallery:** Pages for displaying images from tech, expo, and classroom events.
*   **About Us:** Detailed information about the organization, including journey, core values, and recognition.
*   **Contact Us:** Page with contact information.

### 5.7. Reporting & Data Export
*   **Data Download:** Admin functionality to export lists of teachers and students (likely in Excel format).

### 5.8. Interactive & Visual Elements
*   **3D Models:** Integration of 3D models (e.g., `mini_robot.glb`) for enhanced visual experiences.
*   **Animations:** Use of Framer Motion and GSAP for engaging UI animations.
*   **Confetti Effect:** Visual feedback for successful payment.

## 6. Technical Stack

*   **Frontend:** Next.js, React, TypeScript, Tailwind CSS, DaisyUI
*   **Backend:** Next.js API Routes, Prisma (ORM for MongoDB), NextAuth.js (Authentication).
*   **Database:** MongoDB (via Prisma).
*   **Payment Gateway:** Razorpay.
*   **Email Service:** Nodemailer.
*   **Hashing:** bcryptjs.
*   **Data Export:** ExcelJS, PDFKit.

## 7. Future Considerations / Roadmap (Potential Enhancements)

*   **Live Classes/Webinars:** Deeper integration with video conferencing tools beyond just providing a link.
*   **Certifications:** Automated certificate generation upon course completion.
*   **Discussion Forums/Community Features:** Enable interaction between students and educators within the platform.
*   **Personalized Learning Paths:** Recommend courses based on user interests and progress.
*   **Mobile Application:** Native or cross-platform mobile app development.
*   **Advanced Analytics Dashboard:** More in-depth insights for educators and administrators.
*   **Multi-language Support:** Internationalization (i18n).

## 8. Open Questions

*   Specific requirements for course content hosting and streaming (e.g., video platform integration).
*   Detailed user flows for different roles (Student, Educator, Admin) beyond what's currently implemented.
*   Exact reporting needs and data points to be tracked for comprehensive analytics.
*   Strategy for handling user-generated content (e.g., reviews, forum posts, assignment submissions).