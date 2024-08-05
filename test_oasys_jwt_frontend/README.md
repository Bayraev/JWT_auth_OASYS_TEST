# frontend

Powered by TypeScript

You can start it using terminal
`npm start`

## Available Scripts

## Store Configuration

### `store`

`store` - это экземпляр хранилища Redux, настроенный с помощью `configureStore` из `@reduxjs/toolkit`.

#### Reducers

- **`authorization`** - Слайс состояния для управления авторизацией, управляемый `AuthSlice`.
- **`users`** - Слайс состояния для управления данными пользователей, управляемый `UserSlice`.
- **`navigation`** - Слайс состояния для управления навигацией, управляемый `NavigationSlice`.

#### Types

- **`RootState`** - Тип состояния хранилища, получаемый с помощью `ReturnType<typeof store.getState>`. Используется для типизации состояния в компонентах и хуках.
- **`AppDispatch`** - Тип для диспетчера, получаемый с помощью `typeof store.dispatch`. Используется для типизации вызовов действий в компонентах и других местах.

## AuthSlice

`AuthSlice` is a Redux slice for handling authentication-related state and actions, including registration, authorization, and error management.

### State

- **`loading`**: `any`  
  Tracks the loading status of authentication actions.

- **`error`**: `any[]`  
  Stores error messages related to authentication processes.

### Thunks

- **`registration`**:  
  Asynchronously handles user registration. Converts the nickname to lowercase, sends the registration request to `AuthService`, and returns the response data.

- **`authorization`**:  
  Asynchronously handles user login. Converts the nickname to lowercase, sends the login request to `AuthService`, and returns the response data.

### Reducers

- **`removeError`**:  
  Removes the most recent error from the `error` array.

- **`logout`**:  
  Clears authentication tokens and user ID from local storage and cookies.

### Extra Reducers

- **`registration.pending`**:  
  Sets `loading` to `true` when registration is in progress.

- **`registration.fulfilled`**:  
  Sets `loading` to `false` when registration is successful.

- **`registration.rejected`**:  
  Sets `loading` to `false` and adds the error message to the `error` array if registration fails.

- **`authorization.pending`**:  
  Sets `loading` to `true` when authorization is in progress.

- **`authorization.fulfilled`**:  
  Stores the user's ID in local storage upon successful login and sets `loading` to `false`.

- **`authorization.rejected`**:  
  Sets `loading` to `false` and adds the error message to the `error` array if login fails.

### Actions

- **`logout`**: Action to clear authentication data.
- **`removeError`**: Action to clear the most recent error message.

### Reducer

- **`default`**: Exports the reducer function to be used in the Redux store.

## NavigationSlice

`NavigationSlice` manages the navigation and editing state within the application.

### State

- **`selectedComponent`**: `string`  
  Determines the currently selected component in the UI. Defaults to `'users'`.

- **`editingPage`**: `boolean`  
  Indicates whether the editing page is active. Defaults to `false`.

### Reducers

- **`setSelectedComponent`**  
  Sets the `selectedComponent` state to the provided value.  
  **Payload**: `string` - The name of the component to select.

- **`setEditingPage`**  
  Toggles the `editingPage` state between `true` and `false`.

### Exported Actions

- `setSelectedComponent`: Action to change the selected component.
- `setEditingPage`: Action to toggle the editing page state.

### Default Export

- The reducer function for `NavigationSlice`, used to update the state based on the defined actions.

## UserSlice

`UserSlice` управляет состоянием пользователей и асинхронными операциями, связанными с ними.

### State

- **`currentUser`**: `IUser | null`  
  Данные текущего пользователя.

- **`selectedUser`**: `IUser | null`  
  Данные выбранного пользователя для редактирования.

- **`users`**: `IUser[]`  
  Список всех пользователей.

- **`loading`**: `any` (опционально)  
  Состояние загрузки для асинхронных операций.

- **`error`**: `any[]`  
  Список ошибок.

### Async Thunks

- **`getCurrentUserById`**  
  Получает данные текущего пользователя по ID.  
  **Payload**: `string` - ID пользователя.

- **`getUsers`**  
  Получает список всех пользователей.

- **`getUserBalance`**  
  Получает баланс пользователя по ID.  
  **Payload**: `string` - ID пользователя.

- **`updUser`**  
  Обновляет данные пользователя.  
  **Payload**: `IUser` - Данные пользователя для обновления.

### Reducers

- **`removeError`**  
  Удаляет последнюю ошибку из списка ошибок.

- **`selectUser`**  
  Устанавливает выбранного пользователя для редактирования.  
  **Payload**: `IUser` - Данные выбранного пользователя.

- **`deselectUser`**  
  Сбрасывает выбранного пользователя.

- **`editSelectedUser`**  
  Обновляет данные выбранного пользователя.  
  **Payload**: `{ key: keyof IUser; value: string | boolean | number }` - Ключ и значение для обновления.

- **`clearAfterLogout`**  
  Очищает список пользователей и данные текущего пользователя после выхода из системы.

### Extra Reducers

- **`getCurrentUserById`**

  - `pending`: Устанавливает `loading` в `true`.
  - `fulfilled`: Обновляет `currentUser` данными из ответа и устанавливает `loading` в `false`.
  - `rejected`: Добавляет ошибку в список ошибок и устанавливает `loading` в `false`.

- **`getUsers`**

  - `pending`: Устанавливает `loading` в `true`.
  - `fulfilled`: Обновляет `users` данными из ответа и устанавливает `loading` в `false`.
  - `rejected`: Добавляет ошибку в список ошибок и устанавливает `loading` в `false`.

- **`getUserBalance`**

  - `pending`: Устанавливает `loading` в `true`.
  - `fulfilled`: Обновляет баланс для `currentUser`, `selectedUser` и всех пользователей в списке. Устанавливает `loading` в `false`.
  - `rejected`: Добавляет ошибку в список ошибок и устанавливает `loading` в `false`.

- **`updUser`**
  - `pending`: Устанавливает `loading` в `true`.
  - `fulfilled`: Обновляет данные для `currentUser` и всех пользователей в списке. Устанавливает `loading` в `false`.
  - `rejected`: Добавляет ошибку в список ошибок и устанавливает `loading` в `false`.

### Exported Actions

- `removeError`
- `selectUser`
- `deselectUser`
- `editSelectedUser`
- `clearAfterLogout`

### Default Export

- Reducer функция для `UserSlice`, используется для обновления состояния на основе действий.

## AuthService

`AuthService` предоставляет методы для взаимодействия с API по вопросам аутентификации и регистрации пользователей.

### Methods

- **`registration`**

  - **Описание**: Отправляет запрос на регистрацию нового пользователя.
  - **Параметры**: `credentials` - объект типа `IRegCredentials`, содержащий данные для регистрации:
    - `nickname`: `string` - Никнейм пользователя.
    - `password`: `string` - Пароль пользователя.
    - `type`: `number` - Тип пользователя (например, администратор или пользователь).
    - `lvl`: `number` - Уровень пользователя.
  - **Возвращаемое значение**: Промис, который разрешается в ответ от API с типом `AxiosResponse<IUser[]>`.

- **`authorization`**
  - **Описание**: Отправляет запрос на авторизацию пользователя.
  - **Параметры**: `credentials` - объект типа `IAuthCredentials`, содержащий данные для авторизации:
    - `nickname`: `string` - Никнейм пользователя.
    - `password`: `string` - Пароль пользователя.
  - **Возвращаемое значение**: Промис, который разрешается в ответ от API с типом `AxiosResponse<IUser[]>`.

## UserService

`UserService` предоставляет методы для работы с данными пользователей через API.

### Methods

- **`getCurrentUserById`**

  - **Описание**: Получает данные текущего пользователя по его идентификатору.
  - **Параметры**: `id` - `string` - Идентификатор пользователя.
  - **Возвращаемое значение**: Промис, который разрешается в ответ от API с типом `AxiosResponse<IUser>`.

- **`getUsers`**

  - **Описание**: Получает список всех пользователей.
  - **Возвращаемое значение**: Промис, который разрешается в ответ от API с типом `AxiosResponse<IUser[]>`.

- **`getUserBalance`**

  - **Описание**: Получает баланс пользователя по его идентификатору.
  - **Параметры**: `id` - `string` - Идентификатор пользователя.
  - **Возвращаемое значение**: Промис, который разрешается в ответ от API с типом `AxiosResponse<{ _id: string; balance: number }>`.

- **`updUser`**
  - **Описание**: Обновляет данные пользователя.
  - **Параметры**: `user` - объект типа `IUser`, содержащий обновленные данные пользователя.
  - **Возвращаемое значение**: Промис, который разрешается в ответ от API с типом `AxiosResponse<IUser>`.

## App Component

The `App` component is the main component of the frontend application, responsible for rendering the UI and managing application state.

### Functionality

- **Navigation**:

  - Uses `useSelector` to get the current selected component and editing page from the `navigation` state.
  - Renders different components based on the `selectedComponent` value (e.g., `AuthComponent`, `UsersComponent`, `UpdUserComponent`).

- **User Logic**:

  - Uses `useSelector` to access user-related errors from the `users` state and displays them.

- **Auth Logic**:

  - Uses `useSelector` to access authentication errors from the `authorization` state and displays them.

- **Handlers**:

  - `authOrLeaveHandler()`: Logs out the user and redirects to the authentication page.

- **Effect**:
  - Clears error messages from the state after 3 seconds using `useEffect`.

### UI Elements

- **Error Display**:

  - Displays user and authentication errors in red error banners.

- **Header**:

  - Contains a clickable title that switches to the 'users' component and a login button that triggers the `authOrLeaveHandler`.

- **Main Content**:
  - Renders different components based on the `selectedComponent` and `editingPage` states.

### Styling

- Uses Tailwind CSS for styling with classes like `flex`, `justify-center`, `bg-slate-600`, etc.

## AuthComponent

`AuthComponent` handles user authentication and registration.

### State

- **`isRegistration`**: `boolean`, default `true`  
  Determines if the form is in registration mode (`true`) or authorization mode (`false`).

- **`nickname`**: `string`, default `''`  
  Stores the user's nickname input.

- **`password`**: `string`, default `''`  
  Stores the user's password input.

- **`type`**: `number`, default `1`  
  Specifies the user's role:

  - `1` for admin
  - `2` for user

- **`lvl`**: `number`, default `1`  
  Specifies the user's level:
  - `1` or `2` for users
  - `1`, `2`, or `3` for admins

### Handlers

- **`handleSubmit()`**  
  Handles form submission:

  - If `isRegistration` is `true`, dispatches a registration action with user credentials.
  - If `isRegistration` is `false`, dispatches

  ## UpdUserComponent

`UpdUserComponent` allows for editing user details including nickname, password, type, level, and balance.

### Props

- **`{}`**: No props are passed to this component.

### State

- **`selectedUser`**: `IUser | null`  
  Represents the currently selected user to be edited, obtained from the `users` state in Redux.

### Handlers

- **`handleDeselect()`**  
  Deselects the current user and sets the editing page state.

- **`handleGetUserBalance(id)`**  
  Dispatches an action to retrieve the balance for the selected user by ID.

- **`handleSubmit()`**  
  Dispatches an action to update the current user with the modified details.

- **`handleEditUser(key, value)`**  
  Updates the editable field of the selected user based on the provided key and value. Includes validation for numeric balance values.

### UI Elements

- **User Details**:

  - `Nickname` and `Password` fields for user input.
  - `Balance` field displays the balance if available, otherwise shows a button to fetch the balance.

- **Type and Level Selection**:

  - Buttons to select user type (`admin` or `user`) and level (`1`, `2`, or `3` for admins).

- **Submit and Exit Buttons**:
  - `Submit` button to save changes.
  - `Exit` button to close the editing context.

### Effects

- **`useEffect`**:  
  Clears the password field of the selected user to avoid sending an empty value during updates.

  ## UsersComponent

`UsersComponent` displays a list of users and provides functionality for retrieving user details and balance, as well as selecting a user for editing.

### State

- **`currentUser`**: `IUser | null`  
  Represents the currently logged-in user, obtained from the Redux store.

- **`users`**: `IUser[]`  
  List of all users retrieved from the Redux store.

### Handlers

- **`handleGetUsers()`**  
  Dispatches an action to retrieve all users.

- **`handleGetUserBalance(id)`**  
  Dispatches an action to get the balance of a user by their ID.

- **`handleSelectUser(user)`**  
  Selects a user for editing and opens the editing context menu.

### UI Elements

- **Current User**:

  - Displays details of the currently logged-in user, if available, using the `FragmentUser` component.

- **User List**:

  - Renders a list of users with their details and balance, using the `FragmentUser` component.

- **Buttons**:
  - `Try Get Users`: Fetches the list of all users.
  - `Balance` Button: Displays the balance of each user or a placeholder if the balance is not available.

### Effects

- **`useEffect`**:  
  Retrieves the current user by ID from localStorage when the component mounts.
