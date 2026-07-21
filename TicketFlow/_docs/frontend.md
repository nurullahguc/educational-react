# TicketFlow Frontend — React Application Roadmap

## Main Purpose

The main purpose of TicketFlow is to build a complete React frontend that communicates with a Laravel REST API and allows authenticated users to manage their own support tickets. When the application first loads, React will send a request to the backend to check whether the user already has an active session. While this check is in progress, the application will display a loading screen instead of immediately showing a protected page or redirecting the user. If there is no active session, the user will be able to register or log in. Before submitting either request, the application will obtain a CSRF cookie from Laravel Sanctum, and authentication will then be maintained through a secure session cookie rather than a token stored in local storage. After logging in, the user will be redirected to the ticket list, while unauthenticated users who try to visit protected pages will be redirected to the login page. The ticket list will retrieve only the authenticated user’s tickets from the backend and display important information such as the title, status, priority, due date, and creation date. The user will be able to search tickets, filter them by status or priority, change their sorting order, and navigate between pages. These options will be sent to the backend as query parameters, and they should also be synchronized with the browser URL so that the current list view remains available after refreshing the page. Users will be able to create new tickets through a controlled React form containing title, description, status, priority, and due date fields. When the backend rejects a form with validation errors, the frontend will display each error beneath the relevant field. After creating a ticket, the user will be taken to its details page, where they can review all its information, edit it, or delete it after confirming the action. Authentication data will be managed globally through Context because it is needed throughout the application, but ticket data will remain in the pages or components that actually use it. A shared Axios instance will handle communication with the backend, while React Router will control navigation and protect private routes. Every page will properly handle loading, empty, validation, network error, and submission states so that the interface always communicates what is happening. The first version will be written entirely in JavaScript using React, React Router, Axios, and Bootstrap. Once it is complete, tested, and deployed, the same application will be migrated to TypeScript without adding new features. The overall goal is not simply to produce another CRUD application, but to practise authentication, routing, API communication, state ownership, reusable components, form handling, error management, and real-world React architecture in one complete project.

This document is the requirements specification and checklist for the frontend you will build. It intentionally contains no solution code. The goal is to apply what you learned in the React course by building a real application **without asking AI to write the code for you**.

## 1. Goal

Build a React single-page application that consumes the Laravel API, supports authentication, and allows users to manage their own tickets.

Complete and deploy the first version entirely in **JavaScript**. After that version is stable, create a separate branch and migrate the same project to TypeScript.

## 2. Technology constraints for the first version

Use:

- React + Vite
- JavaScript
- React Router
- Axios
- Bootstrap 5
- Context API for authentication only
- React's built-in hooks

Do not use in the first version:

- TypeScript
- Redux
- TanStack Query
- Next.js
- React Hook Form
- Zod or Yup
- A ready-made admin dashboard template
- DevExtreme DataGrid

These tools are not excluded because they are bad. They are excluded so that you can work directly with React's data flow, state management, effects, and component lifecycle in your first independent project.

You may install Bootstrap through npm. Do not spend too much time perfecting the design; a clean, consistent, and responsive interface is enough.

## 3. Backend contract

Local development addresses:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8000
```

Axios requests must include credentials. Before calling the login or registration endpoint, request the CSRF cookie from the backend.

Authentication flow:

```text
GET  /sanctum/csrf-cookie
POST /api/register
POST /api/login
GET  /api/user
POST /api/logout
```

Ticket endpoints:

```text
GET    /api/tickets
POST   /api/tickets
GET    /api/tickets/{id}
PUT    /api/tickets/{id}
PATCH  /api/tickets/{id}
DELETE /api/tickets/{id}
```

Supported query parameters for the ticket list:

```text
search
status
priority
sort
direction
page
per_page
```

Status values:

```text
open
in_progress
resolved
closed
```

Priority values:

```text
low
medium
high
critical
```

Ticket fields:

```text
id
title
description
status
priority
due_date
created_at
updated_at
```

## 4. Required pages and routes

| Route | Page | Access |
| --- | --- | --- |
| `/` | Redirect to `/tickets` | Everyone |
| `/login` | Login | Guests only |
| `/register` | Registration | Guests only |
| `/tickets` | Ticket list | Authenticated users |
| `/tickets/new` | Create ticket form | Authenticated users |
| `/tickets/:id` | Ticket details | Authenticated users |
| `/tickets/:id/edit` | Edit ticket form | Authenticated users |
| `*` | Not Found | Everyone |

If an authenticated user visits `/login` or `/register`, redirect them to `/tickets`.

If a guest visits a protected route, redirect them to `/login`. After a successful login, return them to the route they originally attempted to visit whenever possible.

## 5. Suggested folder responsibilities

You may change the filenames. The important part is keeping responsibilities clearly separated.

```text
src/
  api/
    http.js
    authApi.js
    ticketsApi.js
  components/
    common/
    layout/
    tickets/
  context/
    AuthContext.jsx
  hooks/
    useAuth.js
  pages/
    LoginPage.jsx
    RegisterPage.jsx
    TicketsPage.jsx
    TicketDetailsPage.jsx
    TicketFormPage.jsx
    NotFoundPage.jsx
  routes/
    ProtectedRoute.jsx
    GuestRoute.jsx
  utils/
  App.jsx
  main.jsx
```

Rules:

- Do not scatter raw API calls throughout every page and component.
- Create one shared Axios instance.
- Read the API base URL from a Vite environment variable.
- Document the non-secret frontend environment variable in `.env.example`.
- Keep only the UI and state needed by a component inside that component.
- Do not put the ticket list in global context.

## 6. Stage 1 — Project foundation

- [ ] Create the React project with Vite.
- [ ] Install React Router and define the application routes.
- [ ] Add Bootstrap.
- [ ] Create the main layout and navigation bar.
- [ ] Create a shared Axios instance.
- [ ] Use `VITE_API_BASE_URL` for the backend base URL.
- [ ] Configure the Axios instance to accept JSON and send credentials.
- [ ] Create simple reusable components for a loading spinner, error alert, and empty state.
- [ ] Create a Not Found page for unknown URLs.

Acceptance criteria: Every page can be reached through its route, the shared layout works, and the browser console contains no errors.

## 7. Stage 2 — Authentication

The Auth Context must provide at least the following state and behavior:

- `user`
- An `initializing` or `loading` state for the initial authentication check
- `login`
- `register`
- `logout`
- `refreshUser`, if needed

When the application first loads, call `/api/user` to check whether a valid session already exists. Do not decide between protected and guest routes until this request has finished; otherwise, the wrong page may briefly flash on the screen.

### Login

- [ ] Create controlled inputs for email and password.
- [ ] Prevent the browser's default form submission behavior.
- [ ] Request `/sanctum/csrf-cookie`, then call `/api/login`.
- [ ] Update the authenticated user state after a successful login.
- [ ] Redirect to `/tickets` or the route the user originally attempted to visit.
- [ ] Disable the submit button while the request is in progress.
- [ ] Display a clear general error when the credentials are rejected.

### Registration

- [ ] Add name, email, password, and password confirmation fields.
- [ ] Display backend `422 errors` beneath the corresponding inputs.
- [ ] Prevent duplicate submissions while the request is in progress.
- [ ] After successful registration, update the authenticated state and redirect to the ticket list.

### Logout and route protection

- [ ] Display the authenticated user's name in the navigation bar.
- [ ] Logout must destroy the session and redirect the user to the login page.
- [ ] Complete the ProtectedRoute and GuestRoute behavior.
- [ ] The user must remain authenticated after refreshing the browser.
- [ ] Do not store an authentication token in `localStorage` or `sessionStorage`; the backend uses a session cookie.

Acceptance criteria: Registration, login, session persistence after refresh, logout, and route protection all work correctly.

## 8. Stage 3 — Ticket list

The ticket list page must display:

- Ticket title
- Status badge
- Priority badge
- Due date
- Creation date
- Link to the details page
- Link to the edit page
- Delete action

Keep these pieces of state separate and intentional:

- Ticket data
- Pagination metadata
- Filters
- Loading state
- Error state
- The ID of the ticket currently being deleted, or another suitable deletion state

### Filters

- [ ] Search input
- [ ] Status select
- [ ] Priority select
- [ ] Sort field
- [ ] Sort direction
- [ ] Items-per-page select
- [ ] Clear filters button

Whenever possible, synchronize filters with the URL query string. The current list view should survive a browser refresh and be reproducible through a shared URL.

Choose one of the following search approaches deliberately:

1. Run the search through a form submission or Search button.
2. Run the search automatically after a short debounce delay.

The form submission approach is completely sufficient for this first project.

### Pagination

- [ ] Add Previous and Next buttons.
- [ ] Display the current page and total number of pages.
- [ ] Reset to page 1 when a filter changes.
- [ ] Correctly handle deleting the last ticket from the final page.

### UI states

- [ ] Display a loading indicator during the initial request.
- [ ] Display a meaningful empty state when no results exist.
- [ ] Provide a retry option when the request fails.
- [ ] Format dates in a user-friendly way.
- [ ] Display `—` or `No due date` when `due_date` is `null`.

Acceptance criteria: Listing, searching, filtering, sorting, and pagination work through the backend query parameters.

## 9. Stage 4 — Create and edit forms

You may use the same reusable form component for both the create and edit pages. Page-level components can separately handle data loading and submission behavior.

Form fields:

- Title
- Description
- Status
- Priority
- Due date

Requirements:

- [ ] Use controlled inputs for every field.
- [ ] Generate the status and priority options from constants that match the backend contract.
- [ ] Perform simple required-field checks on the client.
- [ ] Display backend `422` validation errors under the relevant fields.
- [ ] Disable the submit button while the request is in progress.
- [ ] After creation, navigate to the new ticket's details page.
- [ ] Load the existing ticket and populate the edit form.
- [ ] After a successful update, navigate to the ticket's details page.
- [ ] Do not briefly display an empty edit form while the ticket is loading.
- [ ] Prevent accidental duplicate submissions.

Backend validation remains the final authority. Client-side validation exists only to improve the user experience.

## 10. Stage 5 — Details and deletion

### Ticket details

- [ ] Display every ticket field in a readable format.
- [ ] Add links to edit the ticket and return to the list.
- [ ] Display an appropriate Not Found state when the ticket does not exist.
- [ ] Distinguish between a loading state and a network error.

### Delete

- [ ] Ask the user to confirm before deleting a ticket.
- [ ] Disable the relevant button while deletion is in progress.
- [ ] Do not attempt to parse a response body from a `204` response.
- [ ] After deletion from the list, update or reload the list correctly.
- [ ] After deletion from the details page, navigate to `/tickets`.
- [ ] Display deletion errors clearly.

## 11. HTTP error behavior

Handle at least the following cases:

| Status | Frontend behavior |
| --- | --- |
| `401` | If the session has expired, clear the auth state and redirect to login |
| `404` | Display a ticket-not-found or route-not-found view |
| `422` | Display field-level validation errors |
| `429` | Display a message explaining that too many login attempts were made |
| `500+` | Display a user-friendly general error and provide a retry option |

You are not required to use an Axios interceptor. Handle errors explicitly first; extract common behavior only when meaningful repetition appears.

## 12. React knowledge this project should test

By the end of the project, you should be able to answer these questions using your own code as evidence:

- Which state belongs in which component, and why?
- Why is authentication stored in Context while the ticket list is not?
- Which dependencies does each `useEffect` have, and why?
- What happens if a request finishes after its component has unmounted?
- Why are loading, submitting, and initializing separate states?
- Why should React state never be mutated directly?
- Why does every rendered list item need a stable `key`?
- How are filters synchronized between component state and the URL?
- How is a backend validation error connected to the correct form field?
- Why does authentication survive a browser refresh?

## 13. Suggested commit milestones

Each line can be a separate working commit:

1. `initialize react app and bootstrap`
2. `configure routing and application layout`
3. `add axios client and environment configuration`
4. `implement authentication context`
5. `add login and registration flows`
6. `protect authenticated and guest routes`
7. `implement ticket listing`
8. `add ticket filters and pagination`
9. `implement ticket creation`
10. `implement ticket details and editing`
11. `add ticket deletion flow`
12. `handle loading empty validation and error states`
13. `polish responsive layout and accessibility`
14. `add frontend tests`
15. `deploy ticketflow frontend`

## 14. Minimum testing target

Use Vitest and React Testing Library to test at least these behaviors:

- A guest visiting a protected route is redirected to login.
- The login form calls the authentication function with the correct payload.
- A backend validation error appears under the correct registration or ticket form field.
- The ticket list renders the API response.
- The empty state appears when the API returns no tickets.
- Changing a filter causes a request with the correct query parameters.
- No delete request is sent before the user confirms the action.
- The ticket form prevents a second submission while the first one is in progress.

Do not try to test every implementation detail. Focus on user behavior and critical application flows.

## 15. Definition of Done for the JavaScript version

The JavaScript version is complete only when all of the following are true:

- [ ] Registration, login, and logout work.
- [ ] The session remains active after a browser refresh.
- [ ] Guest and authenticated route protection works.
- [ ] Ticket CRUD is complete.
- [ ] Search, filtering, sorting, and pagination work.
- [ ] Backend validation errors appear beside the relevant fields.
- [ ] Loading, empty, error, initializing, and submitting states are handled.
- [ ] The application is usable on both mobile and desktop screens.
- [ ] The browser console contains no errors or warnings.
- [ ] Critical frontend tests pass.
- [ ] The project includes `.env.example` and a short README.
- [ ] The production build succeeds.
- [ ] The application is deployed and works with the real backend.

## 16. TypeScript migration — only after the JavaScript version is complete

After the JavaScript version has been completed and committed, create a new branch:

```text
typescript-migration
```

Do not add new features during the migration. The purpose is to preserve existing behavior while adding type safety.

Core structures to type:

- `User`
- `Ticket`
- `TicketStatus`
- `TicketPriority`
- Ticket create and update payloads
- Paginated API response
- Laravel validation error response
- Auth Context value
- Component props
- Form events
- Input and select events
- Route parameters
- Axios error structures

Migration order:

1. Add TypeScript and React type dependencies.
2. Prepare the configuration files.
3. Migrate utilities and the API layer.
4. Define model and API response types.
5. Migrate Context and custom hooks.
6. Migrate shared components.
7. Migrate pages.
8. Migrate tests.
9. Run type-checking in strict mode.
10. Run the production build and the complete test suite again.

Avoid:

- Adding `any` everywhere.
- Using type assertions merely to silence errors.
- Defining idealized types that do not match the real backend response.
- Combining the migration with refactoring and new feature development.

After the TypeScript migration is complete, you may introduce TanStack Query and React Hook Form + Zod when the project presents a real need for them. Learn Redux Toolkit only if genuinely complex client-side global state emerges.
