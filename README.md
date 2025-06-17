# React + TypeScript + Vite

# GitHub User Search App

A React app for searching GitHub users. You can type a query and get results instantly, without needing to press ENTER or click a submit button. The results display GitHub users in a responsive layout.

---

## Features

- Search GitHub users 
- Display user list
- Option to enable Edit Mode to manipulate the users  
- Select/Deselect users individually or all at once  
- Delete selected users  
- Duplicate selected users with unique IDs  
- Loading and error status messages  
- Add GitHub Token to avoid Github api rate limit
- Clean, modular components with React hooks  

---

## Technologies Used

- **React** (Functional Components & Hooks)  
- **TypeScript** 
- **Vite** (build tool)  
- **Vitest** & **@testing-library/react** for testing 

---

## Setup

### 1. Prerequisites

- Node.js (>=14)  
- npm 

### 2. Clone the repo

```bash
git clone https://github.com/Snejka/fe-ts-fulll.git
cd fe-ts-fulll
```

### 3. Install dependencies

```bash
npm install
```

### 4. Add GitHub Token (optional)

To avoid rate-limiting from the GitHub API, you can add a personal token:

Create a `.env` file:

```
VITE_GITHUB_TOKEN=your_github_token_here
```
> This is optional. The app still works without it, but may hit API limits.

###  5. Run the app locally

```bash
npm run dev
```

Open in browser: [http://localhost:5173](http://localhost:5173)

---

## Testing

Run all tests with:

```bash
npm run test
```

Use `--watch` during development:

```bash
npm run test -- --watch
```

---

## Available Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Run the development server   |
| `npm run build`   | Build the app for production |
| `npm run preview` | Preview the production build |
| `npm run test`    | Run unit tests with Vitest   |

---

## Project Structure

```
src/
├── components/       # UI components (Button, UserList, Header, etc.)
├── hooks/            # Custom hooks (useUsers, useUserSelection)
├── types/            # TypeScript types (User, UserCardProps, etc.)
├── context/          # React context (EditModeContext)
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

---

## Screenshot

![App Screenshot](./assets/screenshot.png)

---

## To-Do

### Layout
- Style enhancements
- Add dark mode

### Functionality
- Open user profil on Github
- Option to Add New user
- Option to Edit existing user data

### Testing
- Improve unit tests
- Add E2E tests with Playwright or Cypress

---

## 🧑‍💻 Author

Made with ❤️ by [Snezhana KRASTEVA](https://www.linkedin.com/in/snezhana-krasteva/)

---