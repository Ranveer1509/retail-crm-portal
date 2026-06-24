# Retail CRM Portal

Production-ready full-stack web application inspired by Zoho CRM for the retail industry.

## Tech stack

Backend:

- Java 17
- Spring Boot 3
- Spring Security
- Spring Data JPA
- JWT authentication
- OAuth2 Google login
- BCrypt password hashing
- MySQL

Frontend:

- React.js with Vite
- React Router
- Axios
- Bootstrap 5
- Context API

## Project structure

```text
assignment/
  backend/
    pom.xml
    src/main/java/com/ranveer/retailcrm/
      controller/
      dto/
      entity/
      exception/
      repository/
      security/
      service/
      RetailCrmPortalApplication.java
    src/main/resources/
      application.properties
      schema.sql
  frontend/
    package.json
    vite.config.js
    src/
      components/
      context/
      pages/
      services/
      App.jsx
      main.jsx
      styles.css
```

## Implemented requirements

- Signup using username, email, and password
- Login using email and password
- Google OAuth2 login
- JWT-based API authentication
- Password encryption using BCrypt
- `User` entity with `id`, `username`, `email`, `password`, `provider`, `createdAt`
- `Profile` entity with `id`, `userId`, `fullName`, `photoUrl`, `address`, `education`
- One-to-one relationship between `User` and `Profile`
- APIs:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/profile`
  - `POST /api/profile`
  - `PUT /api/profile`
- React pages:
  - Login
  - Signup
- Profile dashboard
- Computer photo upload with stored image preview
- Bootstrap dashboard UI with blue accents, cards, navbar, logout button, and polished CRM profile card

## Backend setup

1. Install requirements:

```text
Java 17
Maven
MySQL Server
```

2. Run immediately for demo/testing.

This project now starts with the `local` profile by default. It uses H2 so you do not get blocked by MySQL password errors while testing.

```powershell
cd "C:\Users\ranve\OneDrive\Documents\New project\assignment\backend"
mvn spring-boot:run
```

Or double-click/run:

```text
backend/run-local.bat
```

The local database is created at:

```text
backend/data/retail_crm_portal.mv.db
```

3. Create the MySQL database for final MySQL mode:

```sql
CREATE DATABASE retail_crm_portal;
```

You can also run:

```sql
SOURCE backend/src/main/resources/schema.sql;
```

Spring Boot is configured with `spring.jpa.hibernate.ddl-auto=update`, so it can create/update tables automatically after the database exists. The MySQL profile fixes this error once you provide your real MySQL password:

```text
Access denied for user 'root'@'localhost'
```

4. Configure MySQL and JWT values for the required MySQL mode.

Open:

```text
backend/src/main/resources/application-mysql.properties
```

Default local values:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/retail_crm_portal?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
app.jwt.secret=change-this-development-secret-change-this-development-secret
```

For a cleaner local setup, set environment variables instead:

```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
$env:JWT_SECRET="replace-with-at-least-64-random-characters-for-production"
$env:SPRING_PROFILES_ACTIVE="mysql"
```

Then run:

```powershell
cd "C:\Users\ranve\OneDrive\Documents\New project\assignment\backend"
mvn spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

## VS Code Java warning fix

If VS Code still shows:

```text
Project is missing required source folder: /src
```

that is stale Java extension workspace metadata from the older simple Java version. The project now uses Maven under `backend/src/main/java`.

Fix it in VS Code:

1. Press `Ctrl+Shift+P`.
2. Run `Java: Clean Java Language Server Workspace`.
3. Click `Restart and delete`.
4. Reopen the `assignment` folder.

I also added a root `pom.xml` and `.vscode/settings.json` so VS Code imports the backend as a Maven module.

## Frontend setup

1. Install dependencies:

```powershell
cd "C:\Users\ranve\OneDrive\Documents\New project\assignment\frontend"
npm install
```

2. Create `.env` from `.env.example`:

```properties
VITE_API_BASE_URL=http://localhost:8080
```

3. Run React:

```powershell
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Google OAuth2 configuration

1. Open Google Cloud Console.
2. Create or select a project.
3. Go to `APIs & Services > Credentials`.
4. Create `OAuth client ID`.
5. Choose application type `Web application`.
6. Add this authorized redirect URI:

```text
http://localhost:8080/login/oauth2/code/google
```

7. Copy the generated client ID and client secret.
8. Set them in PowerShell before running the backend:

```powershell
$env:GOOGLE_CLIENT_ID="your-google-client-id"
$env:GOOGLE_CLIENT_SECRET="your-google-client-secret"
$env:FRONTEND_URL="http://localhost:5173"
```

Without real Google credentials, normal email/password signup and login still work. The Google button needs the real client ID and secret.

The React Google button redirects to:

```text
http://localhost:8080/oauth2/authorization/google
```

After successful Google login, Spring redirects back to:

```text
http://localhost:5173/oauth2/redirect?token=JWT_TOKEN
```

## Application flow

1. User opens React app.
2. User signs up using username, email, and password.
3. Backend hashes password with BCrypt.
4. Backend saves user in MySQL.
5. Backend returns JWT.
6. React stores JWT in local storage.
7. User is redirected to profile page.
8. User enters photo URL, full name, address, and education.
9. React sends profile data with `Authorization: Bearer <token>`.
10. Backend saves profile in MySQL.
11. User logs out.
12. User logs in again.
13. Existing profile data automatically loads from MySQL.

## Important files

- Backend entry point: `backend/src/main/java/com/ranveer/retailcrm/RetailCrmPortalApplication.java`
- Security config: `backend/src/main/java/com/ranveer/retailcrm/security/SecurityConfig.java`
- JWT service: `backend/src/main/java/com/ranveer/retailcrm/security/JwtService.java`
- Auth controller: `backend/src/main/java/com/ranveer/retailcrm/controller/AuthController.java`
- Profile controller: `backend/src/main/java/com/ranveer/retailcrm/controller/ProfileController.java`
- Photo upload storage: `backend/src/main/java/com/ranveer/retailcrm/service/FileStorageService.java`
- React routes: `frontend/src/App.jsx`
- Auth context: `frontend/src/context/AuthContext.jsx`
- Axios setup: `frontend/src/services/api.js`
- Profile page: `frontend/src/pages/ProfilePage.jsx`

## Photo upload

The profile page supports uploading a photo from your computer.

- Endpoint: `POST /api/profile/photo`
- Request type: `multipart/form-data`
- Field name: `photo`
- Allowed formats: JPG, PNG, WEBP
- Max size: 2 MB
- Stored folder: `backend/uploads/`
- Public URL format: `http://localhost:8080/uploads/<file-name>`

After selecting a photo, the frontend uploads it immediately, shows the preview, and saves the returned photo URL with the profile.

If the backend was already running before this feature was added, stop it and start it again:

```powershell
cd "C:\Users\ranve\OneDrive\Documents\New project\assignment\backend"
mvn spring-boot:run
```

## Notes for assessment presentation

This version is stronger than a basic form app because it demonstrates a realistic enterprise structure: layered Spring Boot architecture, JWT security, OAuth2 login, BCrypt hashing, JPA relationships, DTO validation, centralized exception handling, protected React routes, Axios interceptors, and a responsive Bootstrap dashboard.
