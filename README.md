# My Awesome Todo List Application

This is a functional Todo List application built with ReactJS, demonstrating core front-end development skills including CRUD operations, state management, UI interactions, and data persistence using localStorage. It also includes optional bonus features like drag-and-drop reordering.

## Features

-   **Add Task:** Easily add new tasks to your list.
-   **Delete Task:** Remove tasks you no longer need.
-   **Mark as Complete:** Toggle tasks between active and completed states.
-   **Persistence:** All your tasks are automatically saved in your browser's local storage, so they remain even after you close or refresh the page.
-   **Filtering:** Filter tasks to view All, Active, or Completed tasks.
-   **Drag-and-Drop Reordering :** Reorder tasks by simply dragging them to your desired position.
-   **Undo/Redo :** (Note: This is implemented in the `useTodos` hook but not yet wired up to UI buttons. You can add buttons for Undo/Redo in `App.js` if you wish.)

## Technologies Used

-   ReactJS
-   HTML5
-   CSS3
-   `react-dnd` and `react-dnd-html5-backend` for drag-and-drop functionality.

## Setup and Running the Application

Follow these steps to get the application up and running on your local machine:

**1. Clone the repository (if applicable) or create the project:**

If you are starting from scratch, first create a new React app:

```bash
npx create-react-app todo-app
cd todo-app

**2. Install dependencies: **

```bash
npm install

**3. To Run the Project : **
```bash
npm start
