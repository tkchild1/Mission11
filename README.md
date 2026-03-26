# Bookstore Application

This is a full-stack web application for managing and browsing a bookstore catalog. It consists of a backend API built with ASP.NET Core and a frontend built with React and TypeScript.

## Tech Stack

### Backend
- **Framework**: ASP.NET Core Web API (.NET 10.0)
- **Language**: C#
- **Database**: SQLite with Entity Framework Core
- **ORM**: Entity Framework Core
- **API**: RESTful API with OpenAPI/Swagger support
- **CORS**: Enabled for frontend development (localhost:3000)

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Bootstrap 5
- **Linting**: ESLint with Prettier
- **Package Manager**: npm

## Project Structure

```
Mission11/
├── backend/
│   └── WebApplication1/
│       ├── WebApplication1/
│       │   ├── Controllers/
│       │   │   ├── BookController.cs    # API endpoints for books
│       │   │   └── WeatherForecastController.cs  # Default template controller
│       │   ├── Data/
│       │   │   ├── Book.cs              # Book entity model
│       │   │   └── BookstoreContext.cs  # EF Core DbContext
│       │   ├── Program.cs               # Application entry point and configuration
│       │   ├── appsettings.json         # Configuration (includes SQLite connection)
│       │   └── WebApplication1.csproj   # Project file
│       └── WebApplication1.slnx         # Solution file
└── frontend/
    ├── src/
    │   ├── App.tsx                     # Main React component
    │   ├── Bookstore.tsx               # Bookstore component with pagination and sorting
    │   ├── main.tsx                    # React app entry point
    │   ├── types/
    │   │   └── Book.ts                 # TypeScript interface for Book
    │   └── assets/                     # Static assets
    ├── package.json                    # Frontend dependencies and scripts
    ├── vite.config.ts                  # Vite configuration
    ├── tsconfig.json                   # TypeScript configuration
    └── eslint.config.js                # ESLint configuration
```

## Architecture and Patterns

### Backend Architecture
- **MVC Pattern**: Controllers handle HTTP requests and responses
- **Repository Pattern**: Entity Framework Core serves as the data access layer
- **Dependency Injection**: Services (like DbContext) are injected into controllers
- **RESTful API Design**: Standard HTTP methods for CRUD operations
- **Configuration Management**: appsettings.json for environment-specific settings

### Frontend Architecture
- **Component-Based Architecture**: React components for UI modularity
- **Hooks Pattern**: useState and useEffect for state management and side effects
- **TypeScript**: Strong typing for better code reliability
- **Functional Components**: Modern React approach without class components

### Data Flow
1. Frontend makes HTTP requests to backend API endpoints
2. Backend queries SQLite database using Entity Framework Core
3. Data is returned as JSON to frontend
4. Frontend renders data using React components

## Key Features

### Backend Features
- **Book Management API**: GET endpoint for retrieving paginated book lists
- **Sorting**: Sort books by title (ascending/descending)
- **Pagination**: Configurable page size and page navigation
- **CORS Support**: Cross-origin requests enabled for frontend
- **OpenAPI Documentation**: Swagger UI available in development

### Frontend Features
- **Book Display**: Card-based layout showing book details
- **Pagination Controls**: Previous/Next buttons and page number buttons
- **Sorting Toggle**: Sort by title with visual indicators
- **Page Size Selection**: Dropdown to choose results per page (5, 10, 20)
- **Responsive Design**: Bootstrap for mobile-friendly layout

## Data Model

### Book Entity
```csharp
public class Book
{
    public int BookID { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public required string Publisher { get; set; }
    public required string ISBN { get; set; }
    public required string Classification { get; set; }
    public required string Category { get; set; }
    public int PageCount { get; set; }
    public decimal Price { get; set; }
}
```

## API Endpoints

### GET /api/Book
Retrieves a paginated list of books with optional sorting.

**Query Parameters:**
- `pageSize` (int): Number of books per page
- `pageNum` (int): Page number (1-based)
- `sortOrder` (string): "asc" or "desc" for title sorting

**Response:**
```json
{
  "books": [
    {
      "bookID": 1,
      "title": "Sample Book",
      "author": "Author Name",
      "publisher": "Publisher",
      "isbn": "1234567890",
      "classification": "Fiction",
      "category": "Novel",
      "pageCount": 300,
      "price": 19.99
    }
  ],
  "totalNumBooks": 100
}
```

## Development Setup

### Prerequisites
- .NET 10.0 SDK
- Node.js and npm
- SQLite (included with .NET)

### Backend Setup
1. Navigate to `backend/WebApplication1/WebApplication1/`
2. Run `dotnet restore`
3. Run `dotnet run` (starts on https://localhost:7122)

### Frontend Setup
1. Navigate to `frontend/`
2. Run `npm install`
3. Run `npm run dev` (starts on http://localhost:3000)

### Database
- SQLite database file `Bookstore.sqlite` is created automatically
- Entity Framework migrations are not used; database schema is created at runtime

## Configuration

### Backend Configuration
- **Database**: Connection string in `appsettings.json`
- **CORS**: Origins configured in `Program.cs`
- **HTTPS**: Enabled by default in development

### Frontend Configuration
- **API URL**: Hardcoded to `https://localhost:7122/api/Book`
- **Build**: Vite configuration in `vite.config.ts`
- **TypeScript**: Configuration in `tsconfig.json`

## Patterns and Conventions

### Backend Patterns
- **Controller Naming**: PascalCase with "Controller" suffix
- **Route Conventions**: RESTful routes with attribute routing
- **Dependency Injection**: Constructor injection for services
- **Async/Await**: Used for database operations
- **LINQ**: Query syntax for database operations

### Frontend Patterns
- **Component Naming**: PascalCase
- **File Organization**: Feature-based organization in `src/`
- **Type Definitions**: Separate `types/` directory for interfaces
- **Event Handling**: Inline arrow functions for event handlers
- **State Management**: Local component state with useState
- **Side Effects**: useEffect for API calls and state updates

### Code Style
- **C#**: Standard .NET conventions (PascalCase for public members)
- **TypeScript**: Standard React/TypeScript conventions
- **Naming**: Consistent camelCase for variables, PascalCase for types/classes
- **Comments**: Descriptive comments explaining component purpose

## Build and Deployment

### Backend Build
```bash
cd backend/WebApplication1/WebApplication1
dotnet build
dotnet publish -c Release
```

### Frontend Build
```bash
cd frontend
npm run build
```

### Development Commands
- Backend: `dotnet run` or `dotnet watch run`
- Frontend: `npm run dev` (with hot reload)
- Linting: `npm run lint`

## Future Enhancements

Potential areas for expansion:
- Full CRUD operations (Create, Update, Delete books)
- User authentication and authorization
- Search functionality
- Book categories and filtering
- Shopping cart functionality
- Admin panel for book management
- Database migrations for schema versioning
- API versioning
- Error handling and logging improvements
- Unit and integration tests</content>
<parameter name="filePath">c:\Users\tanne\OneDrive\Desktop\Mission11\README.md