# backend

You can start the server in terminal:
`npm start`

## UserModel

`UserModel` defines the schema and model for user data in MongoDB using Mongoose.

### Schema Fields

- **`nickname`**: `String`, required  
  The unique nickname of the user.

- **`password`**: `String`, required  
  The hashed password of the user.

- **`type`**: `Number`, required, default: 1  
  Indicates the user's role:

  - `1` for regular users
  - `2` for admins

- **`lvl`**: `Number`, default: 3  
  User's level:

  - For regular users: Levels 1 and 2
  - For admins: Levels 1 to 3

- **`balance`**: `Number`, default: 0  
  The user's account balance.

### Model

The model is named `User` and is based on the defined schema, used for interacting with the `users` collection in MongoDB.

## Routes

- **POST /registration** - Requires registration data in body (handled by `MiddlewareRegistration`)
- **POST /login** - Requires login credentials in body (handled by `MiddlewareAuthorization`)
- **GET /users** - Retrieves all users (requires authentication, handled by `authMiddleware` and `MiddlewareUser1_1`)
- **GET /users/:id** - Retrieves a specific user by ID (requires authentication, handled by `authMiddleware`, `MiddlewareUser2_1`, and `MiddlewareUser1_2`)
- **PUT /users/:id** - Updates a specific user by ID (requires authentication, handled by `authMiddleware`, `MiddlewareUser2_2`, `MiddlewareUser1_3`, and `MiddlewareUpdateUser`)
- **GET /users/:id/balance** - Retrieves balance of a specific user by ID (requires authentication, handled by `authMiddleware`, `MiddlewareUser2_1`, and `MiddlewareUser1_2`)

And error handling over there

- Catches errors and returns appropriate response:
  - If an `ApiError`, returns error message and status
  - Otherwise, returns a generic 500 error message

## Middlewares

- **authMiddleware** - General authentication middleware
- **MiddlewareUser1_1** - Authorizes access for User1 level 1
- **MiddlewareUser1_2** - Authorizes access for User1 level 2
- **MiddlewareUser1_3** - Authorizes access for User1 level 3
- **MiddlewareUser2_1** - Authorizes access for User2 level 1
- **MiddlewareUser2_2** - Authorizes access for User2 level 2
- **MiddlewareRegistration** - Handles user registration
- **MiddlewareAuthorization** - Handles user authentication
- **MiddlewareUpdateUser** - Handles user update operations

## ApiError

`ApiError` is a custom error class for handling API errors.

### Constructor

- **`constructor(status, message, errors = [])`**
  - `status` (number): HTTP status code.
  - `message` (string): Error message.
  - `errors` (array): Optional array of additional error details.

### Static Methods

- **`UnauthorizedError()`**  
  Returns a `ApiError` instance with a 401 status code and a message indicating the user is not authorized.

- **`BadRequest(message, errors = [])`**  
  Returns a `ApiError` instance with a 400 status code and a custom error message. Optionally includes additional error details.

- **`PermissionDenied()`**  
  Returns a `ApiError` instance with a 403 status code and a message indicating permission is denied.

## User Controllers

- **postUser(req, res)**  
  Handles user registration. Expects user registration data (e.g., nickname and password) in the request body.

- **authUser(req, res)**  
  Handles user login. Expects login credentials (e.g., nickname and password) in the request body.

- **getUsers(req, res)**  
  Retrieves a list of all users. Requires authentication and appropriate user level access.

- **getUserById(req, res)**  
  Retrieves details of a specific user by ID. Requires authentication and appropriate user level access.

- **getBalanceByid(req, res)**  
  Retrieves the balance of a specific user by ID. Requires authentication and appropriate user level access.

- **updUserById(req, res)**  
  Updates details of a specific user by ID. Requires authentication and appropriate user level access.

## authServices

`authServices` provides various utilities for authentication and user management.

### Methods

- **`isNicknameOkay(nickname)`**  
  Checks if the nickname is valid (i.e., not empty). Returns `true` if valid, otherwise `false`.

- **`isPasswordOkay(password)`**  
  Checks if the password is valid (i.e., not empty and at least 6 characters long). Returns `true` if valid, otherwise `false`.

- **`isNicknameFree(nickname)`**  
  Checks if the nickname is not already taken by querying the database. Returns `true` if the nickname is free, otherwise `false`.

- **`isTypeOkay(type)`**  
  Checks if the type value is within the acceptable range (1 to 2). Returns `true` if valid, otherwise `false`.

- **`isLvlOkay(lvl, type)`**  
  Checks if the level value is appropriate for the given type:

  - For type 1: Level must be between 1 and 3.
  - For type 2: Level must be between 1 and 2.
    Returns `true` if valid, otherwise `false`.

- **`hashData(data)`**  
  Hashes the provided data using bcrypt with a salt rounds value of 3. Returns the hashed data.

- **`compareHash(data1, data2)`**  
  Compares two hashed data values to check if they match. Returns `true` if they match, otherwise `false`.

## tokenService

`tokenService` provides utilities for generating and validating JSON Web Tokens (JWT).

### Methods

- **`generateToken(payload)`**  
  Generates a JWT using the provided payload and a secret key from environment variables (`JWT_SECRET`). Returns the generated token.

- **`validateToken(token)`**  
  Validates the provided JWT using the secret key from environment variables (`JWT_SECRET`). Returns the decoded user data if the token is valid, otherwise returns `null`.
