# 📝 To-Do List App (React)

A simple and clean **To-Do List application** built with **React**.  
The app allows users to add, edit, delete, complete, and filter tasks by priority.

---

## 🚀 Features

- ➕ Add new tasks with priority (High / Medium / Low)
- ✏️ Edit task name inline
- ✅ Mark tasks as Done / Undo
- ❌ Delete tasks
- 🔍 Filter tasks by priority
- 🚫 Form validation using **React Hook Form + Yup**
- 🎨 Priority-based styling
- 📱 Fully responsive design

---

## 🛠️ Technologies Used

- **React**
- **React Hooks** (`useState`, `useMemo`)
- **React Hook Form**
- **Yup** (form validation)
- **CSS Modules**
- **JavaScript (ES6+)**

---

## 📂 Project Structure
src/
├── components/
│ └── Todo/
│ ├── TaskForm/
│ ├── TaskItem/
│ └── TaskFilter/
├── pages/
│ ├── Layout/
│ └── Todo/
├── mocks/
│ └── tasks.js
├── App.jsx
├── main.jsx
└── global.css

---

## 🧠 How It Works

- The main state of tasks is managed in the **Todo page**.
- Child components communicate with the parent using **callback functions**.
- Tasks are filtered using `useMemo` for better performance.
- Inline editing is handled with local state inside `TaskItem`.
- Form validation ensures:
  - Only English letters
  - No Arabic characters
  - First letter must be capital
  - Maximum length of 50 characters

---

## 📋 Validation Rules

- Task name is required
- Only English letters and spaces allowed
- Must start with a capital letter
- Maximum 50 characters
- Priority selection is required

---

## ▶️ Getting Started

Install dependencies:
npm install

Run the project:
npm run dev

Open in browser:
http://localhost:5173

📌 Notes

This project is built for learning and practice purposes.

The UI is responsive and works on mobile and desktop screens.

State management follows React best practices.