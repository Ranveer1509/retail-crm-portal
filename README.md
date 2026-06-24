# Retail CRM Portal

Production-ready full-stack web application inspired by Zoho CRM for the retail industry.

## Live Demo

Frontend Deployment (Vercel)

https://retail-crm-portal-4giw4sopb-rsm15.vercel.app

## GitHub Repository

https://github.com/Ranveer1509/retail-crm-portal

## Project Overview

Retail CRM Portal is a customer profile management application inspired by Zoho CRM. It enables users to register, log in, manage their profile information, upload profile photos, and maintain education records. The application follows a modern full-stack architecture using Spring Boot, React, JWT Authentication, and MySQL.

## Tech Stack

### Backend

* Java 17
* Spring Boot 3
* Spring Security
* Spring Data JPA
* JWT Authentication
* OAuth2 Google Login
* BCrypt Password Hashing
* MySQL
* H2 Database (Local Development)

### Frontend

* React.js with Vite
* React Router DOM
* Axios
* Bootstrap 5
* Context API

## Features

### Authentication

* User Signup
* User Login
* JWT Authentication
* Password Encryption using BCrypt
* Google OAuth2 Login
* Protected Routes

### Profile Management

* Create Profile
* Update Profile
* View Profile
* Upload Profile Photo
* Address Management
* Education Details Management
* Persistent User Data

### Education Management

* Degree Information
* Field of Study
* University/College Name
* Education Address
* Start Date
* End Date
* CGPA

### Security

* Spring Security
* JWT Token Validation
* Protected API Endpoints
* Password Hashing
* Authentication Context

## Project Structure

```text
assignment/
│
├── backend/
│   ├── pom.xml
│   ├── src/main/java/com/ranveer/retailcrm/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── exception/
│   │   ├── repository/
│   │   ├── security/
│   │   ├── service/
│   │   └── RetailCrmPortalApplication.java
│   │
│   └── src/main/resources/
│       ├── application.properties
│       ├── application-local.properties
│       ├── application-mysql.properties
│       └── schema.sql
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
│
└── README.md
```

## Database Design

### User Entity

```text
id
username
email
password
provider
googleId
createdAt
```

### Profile Entity

```text
id
userId
fullName
photoUrl
address
```

### Education Entity

```text
id
userId
degree
stream
collegeName
educationAddress
startDate
endDate
cgpa
```

## Implemented Requirements

### Assignment Requirements

✔ Signup (Username, Password)

✔ Login (Username/Email, Password)

✔ Google Login

✔ Profile Page

✔ Profile Photo Upload

✔ Full Name

✔ Address

✔ Education Details

✔ Store Data in Database

✔ Display Existing Data After Logout/Login

✔ Modern CRM Dashboard UI

## REST APIs

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google-demo
GET  /api/auth/google/status
```

### Profile

```http
GET  /api/profile
POST /api/profile
PUT  /api/profile
POST /api/profile/photo
```

## Backend Setup

### Requirements

```text
Java 17
Maven 3+
MySQL Server
```

### Run Backend

```powershell
cd backend
mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

### Alternative

Run:

```text
backend/run-local.bat
```

## Local Database

For local development, the application uses H2 Database.

Database location:

```text
backend/data/retail_crm_portal.mv.db
```

## MySQL Setup

Create database:

```sql
CREATE DATABASE retail_crm_portal;
```

Optional:

```sql
SOURCE backend/src/main/resources/schema.sql;
```

Configure:

```text
backend/src/main/resources/application-mysql.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/retail_crm_portal
spring.datasource.username=root
spring.datasource.password=your_password

app.jwt.secret=your_jwt_secret
```

Run using MySQL profile:

```powershell
$env:SPRING_PROFILES_ACTIVE="mysql"
mvn spring-boot:run
```

## Frontend Setup

Install dependencies:

```powershell
cd frontend
npm install
```

Create:

```text
frontend/.env
```

```properties
VITE_API_BASE_URL=http://localhost:8080
```

Run:

```powershell
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Google OAuth2 Configuration

1. Open Google Cloud Console
2. Create OAuth Client ID
3. Select Web Application
4. Add Authorized Redirect URI:

```text
http://localhost:8080/login/oauth2/code/google
```

5. Set environment variables:

```powershell
$env:GOOGLE_CLIENT_ID="your_client_id"
$env:GOOGLE_CLIENT_SECRET="your_client_secret"
```

6. Run backend again.

Google Login Endpoint:

```text
http://localhost:8080/oauth2/authorization/google
```

OAuth Redirect:

```text
http://localhost:5173/oauth2/redirect?token=JWT_TOKEN
```

## Application Workflow

1. User opens application
2. User signs up
3. Password is encrypted using BCrypt
4. User record is stored in database
5. JWT token is generated
6. User is redirected to Profile Page
7. User enters profile details
8. User uploads photo
9. Education details are saved
10. Data is stored in database
11. User logs out
12. User logs in again
13. Existing profile information loads automatically

## Photo Upload

Supported Formats:

```text
JPG
PNG
WEBP
```

Maximum Size:

```text
2 MB
```

Storage Location:

```text
backend/uploads/
```

Public URL:

```text
http://localhost:8080/uploads/<filename>
```

## Important Files

### Backend

```text
backend/src/main/java/com/ranveer/retailcrm/RetailCrmPortalApplication.java
backend/src/main/java/com/ranveer/retailcrm/security/SecurityConfig.java
backend/src/main/java/com/ranveer/retailcrm/security/JwtService.java
backend/src/main/java/com/ranveer/retailcrm/controller/AuthController.java
backend/src/main/java/com/ranveer/retailcrm/controller/ProfileController.java
backend/src/main/java/com/ranveer/retailcrm/service/FileStorageService.java
```

### Frontend

```text
frontend/src/App.jsx
frontend/src/context/AuthContext.jsx
frontend/src/services/api.js
frontend/src/pages/ProfilePage.jsx
frontend/src/pages/ProfileEditPage.jsx
frontend/src/pages/LoginPage.jsx
frontend/src/pages/SignupPage.jsx
```

## Notes for Assessment Presentation

This project demonstrates:

* Enterprise-level Spring Boot Architecture
* Layered Backend Design
* JWT Authentication
* OAuth2 Authentication
* BCrypt Password Encryption
* DTO Validation
* Exception Handling
* React Protected Routes
* Context API State Management
* Axios API Integration
* Image Upload Functionality
* Responsive CRM Dashboard Design
* MySQL Database Integration

The application fulfills all assignment requirements and showcases a practical CRM-style customer profile management system suitable for retail businesses.

## Author

Ranveer Singh

B.Tech Information Technology (2026)

Chandigarh University
