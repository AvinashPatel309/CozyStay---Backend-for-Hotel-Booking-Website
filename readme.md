# Hotel Booking Website Backend

## Overview

This is the backend API for a **Hotel Booking Website**. It provides endpoints for managing hotels, rooms, bookings, and users. Built using **Node.js**, **Express.js**, and **MongoDB**, it is designed to be scalable, secure, and easy to integrate with a frontend application.

---

## Features

- **User Authentication & Authorization**
  - Register, login, and manage user accounts
  - Role-based access (admin, user)
- **Hotel Management**
  - Add, update, delete, and view hotels
  - Upload images for hotels
- **Room Management**
  - Add, update, delete, and view rooms
  - Manage room availability
- **Booking System**
  - Users can book available rooms
  - Admin can view all bookings
- **Search & Filtering**
  - Search hotels by location, price, and rating
  - Filter rooms by type, availability, and amenities
- **Secure APIs**
  - Password hashing
  - JWT-based authentication
  - Input validation

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (or PostgreSQL/MySQL depending on configuration)
- **Authentication:** JWT
- **Validation:** Joi (or express-validator)
- **Environment Management:** dotenv

---

## API Documentation

### Auth

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/register` | Register a new user      |
| POST   | `/api/auth/login`    | Login user and get token |

### Hotels

| Method | Endpoint          | Description                    |
| ------ | ----------------- | ------------------------------ |
| GET    | `/api/hotels`     | Get all hotels                 |
| GET    | `/api/hotels/:id` | Get hotel by ID                |
| POST   | `/api/hotels`     | Add a new hotel (Admin only)   |
| PUT    | `/api/hotels/:id` | Update hotel info (Admin only) |
| DELETE | `/api/hotels/:id` | Delete a hotel (Admin only)    |

### Rooms

| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- |
| GET    | `/api/rooms`     | Get all rooms                 |
| GET    | `/api/rooms/:id` | Get room by ID                |
| POST   | `/api/rooms`     | Add new room (Admin only)     |
| PUT    | `/api/rooms/:id` | Update room info (Admin only) |
| DELETE | `/api/rooms/:id` | Delete room (Admin only)      |

### Bookings

| Method | Endpoint            | Description                   |
| ------ | ------------------- | ----------------------------- |
| GET    | `/api/bookings`     | Get all bookings (Admin only) |
| POST   | `/api/bookings`     | Create a new booking          |
| GET    | `/api/bookings/:id` | Get booking by ID             |
| DELETE | `/api/bookings/:id` | Cancel a booking              |

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/hotel-booking-backend.git
cd hotel-booking-backend
```
