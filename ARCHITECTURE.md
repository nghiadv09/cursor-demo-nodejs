# Repository Pattern Architecture

## Overview
This project has been refactored to use the Repository Pattern, which provides a clean separation of concerns and makes the code more maintainable and testable.

## Architecture Layers

### 1. Controllers (`/controllers`)
- Handle HTTP requests and responses
- Validate input data
- Call appropriate services
- Handle HTTP-specific errors and status codes
- **No direct database operations**

### 2. Services (`/services`)
- Contain business logic
- Orchestrate operations between repositories
- Handle business rule validation
- **No direct database operations**

### 3. Repositories (`/repositories`)
- Handle all database operations
- Provide a clean interface for data access
- Abstract away database implementation details
- **Only layer that interacts with database**

### 4. Models (`/models`)
- Define data structure and relationships
- Handle data validation and hooks
- **No business logic**

## File Structure

```
demo-nodejs/
├── controllers/
│   └── authController.js      # HTTP request handling
├── services/
│   ├── index.js              # Service exports
│   └── AuthService.js        # Authentication business logic
├── repositories/
│   ├── index.js              # Repository exports
│   ├── BaseRepository.js     # Common CRUD operations
│   └── UserRepository.js     # User-specific database operations
├── models/
│   └── User.js               # User data model
└── config/
    └── database.js           # Database configuration
```

## Benefits of This Architecture

### 1. **Separation of Concerns**
- Controllers only handle HTTP logic
- Services contain business rules
- Repositories handle data access
- Models define data structure

### 2. **Testability**
- Each layer can be tested independently
- Easy to mock repositories for service testing
- Easy to mock services for controller testing

### 3. **Maintainability**
- Changes to database logic only affect repositories
- Business logic changes only affect services
- HTTP logic changes only affect controllers

### 4. **Reusability**
- BaseRepository provides common CRUD operations
- Services can be reused across different controllers
- Repositories can be reused across different services

### 5. **Flexibility**
- Easy to switch database implementations
- Easy to add new features without affecting existing code
- Clear interfaces between layers

## Usage Examples

### Controller Example
```javascript
const { AuthService } = require('../services');
const authService = new AuthService();

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    // Handle errors
  }
};
```

### Service Example
```javascript
class AuthService {
  async register(userData) {
    // Business logic here
    const user = await this.userRepository.create(userData);
    const token = this.generateToken(user);
    return { user, token };
  }
}
```

### Repository Example
```javascript
class UserRepository extends BaseRepository {
  async findByEmail(email) {
    return await this.model.findOne({ where: { email } });
  }
}
```

## Best Practices

1. **Controllers should be thin** - only handle HTTP concerns
2. **Services should contain business logic** - no database operations
3. **Repositories should only handle data access** - no business rules
4. **Use dependency injection** for better testability
5. **Handle errors appropriately** at each layer
6. **Keep methods focused** and single-purpose
7. **Use TypeScript interfaces** for better type safety (if applicable)

## Error Handling

- **Repository errors**: Database-specific errors
- **Service errors**: Business logic errors
- **Controller errors**: HTTP-specific errors

Each layer should catch errors from the layer below and transform them appropriately.

## Testing Strategy

1. **Unit tests** for each layer independently
2. **Integration tests** for service-repository interaction
3. **End-to-end tests** for complete workflows
4. **Mock repositories** when testing services
5. **Mock services** when testing controllers
