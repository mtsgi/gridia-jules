# Gridia - Bookmark Manager

Gridia is a modern, client-side bookmark management application built with SolidJS, Vite, and TypeScript. It uses IndexedDB to store all data directly in your browser, ensuring your data is private and the application is fast and works offline.

## ✨ Features

- **CRUD Operations:** Add, edit, and delete bookmarks with ease.
- **Categorization:** Organize your bookmarks into custom categories.
- **Favorites:** Mark important bookmarks as favorites for quick access.
- **Real-time Search:** Instantly find any bookmark by searching its title, description, or URL.
- **Responsive Design:** A clean and intuitive interface that works seamlessly on both desktop and mobile devices.
- **Client-Side Storage:** All data is stored locally in your browser using IndexedDB. No server or account needed.

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mtsgi/gridia-jules.git
    cd gridia-jules
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## 🛠️ Available Scripts

-   `npm run dev`: Starts the Vite development server.
-   `npm run build`: Builds the application for production into the `dist` directory.
-   `npm run serve`: Previews the production build locally.

## 💻 Tech Stack

-   **Framework:** [SolidJS](https://www.solidjs.com/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Database:** [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (via the `idb` library)
-   **Styling:** Plain CSS.
