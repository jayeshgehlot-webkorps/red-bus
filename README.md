# 🚌 Bus Booking System (MERN Stack)

## 📌 Project Overview

* Developed a full-stack bus booking system using the MERN stack.
* Implemented secure user authentication with JWT and role-based access.
* Built dynamic seat selection system with real-time availability handling.
* Integrated Razorpay for secure online payments with verification flow.
* Designed booking management system with ticket download (PDF) feature.
* Created admin panel for managing buses, bookings, and users.
* Focused on user experience with loaders, error handling, and responsive UI.

---

## ⚙️ Tech Stack

Frontend:
- React.js
- Redux
- Tailwind CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB (Mongoose)

Payment:
- Razorpay

---

## 🚀 Installation

1. Clone the repository  
git clone https://github.com/jayeshgehlot-webkorps/red-bus.git

2. Setup Backend  
cd backend  
npm install  
npm start  

3. Setup Frontend  
cd frontend  
npm install  
npm run dev  

---

## 🔐 Authentication & Authorization (Flow)

1. User signs up → data stored in database (password hashed using bcrypt)  
2. User logs in → backend verifies credentials  
3. Backend generates JWT token and sends it to frontend  
4. Frontend stores token (localStorage)  
5. For protected routes, frontend sends token in headers  
6. Backend verifies JWT token before allowing access  
7. Role-based access controls admin and user permissions  

### 🔐 Role-Based Access (Flow)

1. Each user is assigned a role (User / Admin / Super Admin) during signup or by admin  
2. Role is stored in database and included in JWT token  
3. Backend middleware checks user role for protected routes  
4. Access is granted based on role:
   - User → can book tickets and view bookings  
   - Admin → can manage buses and bookings  
   - Super Admin → can manage users and assign roles  

---

## 👤 2. User Features

### 🚌 Bus Search & Listing (Flow)

1. User enters source and destination  
2. Frontend sends request to backend with search parameters  
3. Backend queries database to find matching buses  
4. Filters are applied (AC / Non-AC, Sleeper / Seater)  
5. Filtered bus list is returned to frontend  
6. User views available buses with details  

---
<img width="1892" height="1080" alt="image" src="https://github.com/user-attachments/assets/d081536f-2af0-4751-bcb9-e5482fd3642b" />

### 💺 Seat Selection (Flow)

1. User selects a bus from the listing  
2. Frontend displays seat layout with available and booked seats  
3. User selects multiple available seats  
4. Selected seats are stored in frontend state  
5. Already booked seats are disabled to prevent selection  
6. Selected seat data is sent to backend during booking

   <img width="1920" height="802" alt="image" src="https://github.com/user-attachments/assets/2fa18e5a-9fa0-43f4-a80b-2bb5f381adaa" />

---

### 💳 Payment Integration (Step-by-Step Flow)

1. User selects seats and clicks on "Pay Now"
2. Frontend sends a request to backend to create a payment order
3. Backend generates an order using Razorpay API and returns:
   * Order ID
   * Amount
   * Currency
4. Frontend initializes Razorpay using the received order details
5. Razorpay payment gateway opens for the user
6. User completes payment OR cancels the payment
7. After successful payment:
   * Razorpay returns payment response (payment_id, order_id, signature)
8. Frontend sends this response to backend for **payment verification**
9. Backend verifies the payment using Razorpay signature
10. If verification is successful:
    * Booking is stored in database
    * Seats are marked as booked
    * User is shown **Payment Success screen**
11. If payment fails or verification fails:
    * Error message is shown to user
    * No booking is created
12. If user cancels payment:
    * Payment process is stopped
    * User remains on the same page with cancel message

---

### 🎟️ Ticket Confirmation (Flow)

1. After successful payment, frontend receives confirmation  
2. Frontend sends booking data (bus, seats, user info) to backend  
3. Backend stores booking details in database  
4. Selected seats are marked as booked  
5. Backend responds with booking confirmation  
6. Frontend shows success screen with booked seat details  

---
<img width="1920" height="835" alt="image" src="https://github.com/user-attachments/assets/a9cd92ef-b103-427d-bad6-2cee44cd91c2" />

### 📄 My Bookings (Flow)

1. User navigates to "My Bookings" page  
2. Frontend sends request to backend to fetch user's bookings  
3. Backend retrieves booking data from database  
4. Booking details include:
   - Bus information  
   - Selected seats  
   - Travel date  
   - Total price  
5. Backend sends booking list to frontend  
6. Frontend displays all bookings to the user  

---

### ❌ Cancel Booking (Flow)

1. User selects a booking from "My Bookings"  
2. User clicks on "Cancel Booking"  
3. Frontend sends cancel request to backend with booking ID  
4. Backend updates booking status to "cancelled"  
5. Backend updates seat availability (marks seats as available again)  
6. Backend sends confirmation response  
7. Frontend updates UI and shows cancellation message  

---

## 🧑‍💼 3. Admin Features

### 📊 Admin Dashboard (Flow)

1. Admin navigates to dashboard page  
2. Frontend sends request to backend to fetch data  
3. Backend retrieves:
   - All buses  
   - All bookings  
4. Backend sends dashboard data to frontend  
5. Frontend displays overview of buses and bookings  

---

### 🚌 Bus Management (Flow)

1. Admin navigates to bus management panel  
2. Admin can perform actions:
   - Add new bus  
   - Update existing bus details  
   - Delete bus  
   - Activate / Deactivate bus  
3. Frontend sends request to backend based on action  
4. Backend performs database operation (create, update, delete)  
5. Backend sends response after successful operation  
6. Frontend updates UI with latest bus data  

---

### 💺 Seat Management (Flow)

1. Admin navigates to seat management section  
2. Frontend displays seat layout for selected bus  
3. Admin can:
   - View seat availability  
   - Block specific seats if required  
4. Frontend sends update request to backend  
5. Backend updates seat status in database  
6. Backend sends response after update  
7. Frontend reflects updated seat availability  

---

### 👥 User Management (Flow)

1. Super Admin navigates to user management section  
2. Frontend fetches all users from backend  
3. Super Admin can perform actions:
   - Promote user to admin  
   - Remove admin role  
4. Frontend sends role update request to backend  
5. Backend updates user role in database  
6. Backend sends confirmation response  
7. Frontend updates user list with new roles  

---

## 🗄️ 4. Database Design (MongoDB)

### Collections

1. users → stores user information and roles  
2. buses → stores bus details and seat layout  
3. bookings → stores booking records with user and bus reference  
4. payments → stores payment transaction details  

---

### Relationship Mapping (Flow)
1. Each booking is linked to a user using userId  
2. Each booking is linked to a bus using busId  
3. One user can have multiple bookings (1:N)  
4. One bus can have multiple bookings (1:N)  
5. Booking collection acts as a bridge between users and buses  

---

## ⚙️ Backend Features (Node.js + Express)

1. Frontend sends API requests to backend (RESTful APIs)  
2. Requests pass through middleware:
   - Authentication middleware verifies JWT token  
   - Error handling middleware manages errors  
3. Backend checks if route is protected (secure routes)  
4. If authorized, backend processes request logic  
5. Backend performs database operations using Mongoose  
6. Backend sends response back to frontend  

---

## 🎨 Frontend Features (React)

1. User interacts with responsive UI across devices  
2. Application state is managed using Redux  
3. User actions trigger UI updates and API calls  
4. Loader system is used:
   - Global loader for full-screen processes (e.g., payment)  
   - Button loader for small actions  
5. Toast notifications provide feedback:
   - Success messages  
   - Error messages  
6. UI updates dynamically based on API responses  

---

## ⚠️ Error Handling & UX

1. User performs an action (API call or interaction)  
2. Frontend shows loader while request is in progress  
3. Buttons are disabled to prevent multiple requests  
4. If request is successful:
   - Success toast message is shown  
5. If request fails:
   - Error toast message is displayed  
6. Payment failures are handled gracefully with proper user feedback  
7. UI updates based on success or failure response  

---

## 🔒 Security Features

1. User passwords are hashed using bcrypt before storing in database  
2. During login, entered password is compared with hashed password  
3. After successful login, JWT token is generated  
4. Frontend sends JWT token in headers for protected requests  
5. Backend verifies JWT token before allowing access to secure routes  
6. Input data is validated before processing to prevent invalid or harmful data 
7. Unauthorized requests are blocked from accessing protected resources  

---

## 🎁 Ticket Management

1. User navigates to ticket or booking details page  
2. Frontend fetches booking information from backend  
3. Backend retrieves ticket details from database  
4. Ticket details include:
   - Bus information  
   - Seats  
   - Travel date  
   - Total price  
5. Backend sends ticket data to frontend  
6. Frontend displays ticket details to user  
7. User can download ticket as PDF  

---

## 📸 10. Screenshots
Login 
<img width="1920" height="812" alt="image" src="https://github.com/user-attachments/assets/7617cda7-8601-4ae8-b29d-91acb22f8195" />

Home page
<img width="1892" height="1080" alt="image" src="https://github.com/user-attachments/assets/d081536f-2af0-4751-bcb9-e5482fd3642b" />

My Bookings 
<img width="1901" height="1080" alt="image" src="https://github.com/user-attachments/assets/a2095bbc-83f9-4f1d-8dc2-86bc8e1441b0" />

Add New Bus
<img width="1893" height="1080" alt="image" src="https://github.com/user-attachments/assets/e2676488-8ac2-46b1-a676-2702b2e38733" />

Remove Bus
<img width="1898" height="1080" alt="image" src="https://github.com/user-attachments/assets/585f82d3-23f3-4785-8b81-4c49706346f6" />

Make Admin
<img width="1897" height="847" alt="image" src="https://github.com/user-attachments/assets/194e750e-941a-4b86-8c95-51e66a9fbfd4" />

Remove Admin
<img width="1901" height="790" alt="image" src="https://github.com/user-attachments/assets/fb67d224-0c53-453c-a1c3-dea09af9f383" />


Payment Page
<img width="1920" height="785" alt="image" src="https://github.com/user-attachments/assets/4b1df0fa-2d3f-4556-83ce-0929f2413cb3" />

Payment Gateway (Razor Pay)
<img width="1920" height="864" alt="image" src="https://github.com/user-attachments/assets/f8960d68-c6e6-489b-8aa0-38875a3b7e36" />


---

