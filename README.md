# Movie Collection Application

## About the application

Movie Collection Application is a full-stack application where users can manage a collection of movies, genres, and loans.

The application allows users to:

- View all movies, genres, and loans.
- Add new movies, genres, and loans.
- Edit existing information.
- Delete movies, genres, and loans.
- Connect movies to genres.

The project consists of an ASP.NET Core Web API backend, a React frontend, and a separate xUnit test project.

---

# Technologies

## Backend

- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQL Server LocalDB
- Repository Pattern
- Generic Repository
- Dependency Injection
- DTOs
- Async/Await
- Swagger

## Frontend

- React
- Vite
- JavaScript
- HTML
- CSS
- Fetch API

## Testing

- xUnit
- NSubstitute

---

# How to run the project

## Backend

1. Clone the repository.
2. Open the solution in Visual Studio.
3. Update the database by running:

```powershell
Update-Database
```

4. Start the API.
5. Swagger opens automatically.

## Frontend

Open a terminal in the React project folder.

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

Open the URL shown in the terminal.

---

# API Endpoints

## Movies

- GET `/api/movies`
- GET `/api/movies/{id}`
- POST `/api/movies`
- PUT `/api/movies/{id}`
- DELETE `/api/movies/{id}`

## Genres

- GET `/api/genres`
- GET `/api/genres/{id}`
- POST `/api/genres`
- PUT `/api/genres/{id}`
- DELETE `/api/genres/{id}`

## Loans

- GET `/api/loans`
- GET `/api/loans/{id}`
- POST `/api/loans`
- PUT `/api/loans/{id}`
- DELETE `/api/loans/{id}`

---

# How the frontend communicates with the API

The React frontend communicates with the ASP.NET Core Web API using the Fetch API.

The frontend sends HTTP requests to the API:

- GET retrieves data.
- POST creates data.
- PUT updates data.
- DELETE removes data.

The API processes the request, communicates with the database through the service and repository layers, and returns JSON data to the frontend.

---

# Unit Tests

The project includes unit tests created with xUnit and NSubstitute.

The tests verify:

- Get all movies
- Get movie by ID
- Return null when a movie does not exist
- Add a movie
- Update a movie
- Return false when updating a non-existing movie
- Delete a movie

---

# Reflection

This project helped me understand how a full-stack application is built using React and ASP.NET Core Web API.

The CRUD functionality and communication between the frontend and backend worked well. One of the biggest challenges was understanding how the different layers communicate with each other and configuring CORS so the React application could connect to the API.

I also learned how to use interfaces, dependency injection, the repository pattern, DTOs, asynchronous methods, and unit testing with xUnit and NSubstitute.
