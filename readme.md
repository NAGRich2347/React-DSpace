===== project-root/README.md =====

# DSpace JS Rewrite

## Setup

O. **Configure Environment & Execution Policy:** 1. In `server/`, copy `.env.example` to `.env` and fill in your DSpace credentials and CORS origin. 2. Ensure DSpace REST API is running (e.g., via Docker at `http://localhost:8080`). 3. **Windows PowerShell users:** if `npm install` fails due to execution policy, run:

    `powershell
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    `

    Or, invoke: npm via `npm.cmd install`.

## Launching the Backend

🔴. **Launch Backend:**

    ````bash
    cd server
    npm install       # install server dependencies
    npm run dev       # start Express proxy on port 3001
    ````bash

## Launching the Frontend

🔴. **Launch Frontend:**

    ````bash
    cd client
    npm install       # install client dependencies
    npm start         # start React app on port 3000
    ````bash

## Build for Production

🔴. **Build for Production:**
To create an optimized production build of the React client:
`bash
    cd client
    npm run build
    `bash
This outputs static files to client/build/ which can be served by any static file server or integrated into the Express app.

## Workflow

🔴. **Workflow:**
/login → user authentication via DSpace REST.
/submit → document upload and metadata entry.
/review → librarian review interface.
/publish → finalize and publish items.
Admin routes: /controls, /dashboard, /final-approval.

## Custom UI Implementation

🔴. **Custom UI Implementation:**
\*\*All page-specific HTML should be implemented in the React components under client/src/components/. For each route: 1. Locate the component file matching your page (for example, Login.js, StudentSubmit.js, etc.). 2. Add the API import at the top of the file, just below the React import. For example:
// client/src/components/Login.js
import React from 'react';
import api from '../services/api'; // ← API helper import

       export default function Login() {
       // ... your JSX and api calls ...
       }
    3. Replace the placeholder JSX or comments with your actual HTML converted to JSX syntax.
        •Make sure to wrap all elements in a single root element (e.g., <div>...</div>).
        •Convert class attributes to className.
        •Update any asset or script paths to use React imports or the public folder as needed.
    4. Save and test by navigating to the corresponding route (e.g., http://localhost:3000/login).

You can also extract repeated UI elements into reusable components under client/src/components/ to avoid duplication.

You can also extract repeated UI elements into reusable components under client/src/components/ to avoid duplication.

🔴. **Packaging:**
After testing, zip the project:
cd project-root
zip -r dspace-js-rewrite.zip server client README.md .env.example
Or distribute via a P2P link (e.g., file.pizza).

## Pushing to GitHub

🔴. **Pushing to GitHub:**

1. **Create a GitHub repository** on GitHub.com (e.g., `username/DSpace-JS-Rewrite`).

2. **Initialize Git** in your project root:

```bash
cd project-root
git init
git add .
git commit -m "Initial commit: React + Express DSpace rewrite"
```

3. **Add the remote** URL (replace `<URL>` with your repo HTTPS or SSH link):

   ```bash
   git remote add origin <URL>
   ```

4. **Push** your code to GitHub:

   ```bash
   git branch -M main
   git push -u origin main
   ```

5. **Verify** on GitHub that your files are online.

> Now any future changes can be committed and pushed via:
>
> ```bash
> git add .
> git commit -m "Your message"
> git push
> ```

```

```
