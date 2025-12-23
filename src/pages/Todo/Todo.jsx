import { useMemo, useState } from "react";
import styles from "./Todo.module.css";

import TaskForm from "../../components/Todo/TaskForm";
import TaskFilter from "../../components/Todo/TaskFilter";
import TaskItem from "../../components/Todo/TaskItem";

import tasksData from "../../mocks/tasks";

function Todo() {
  const [tasks, setTasks] = useState(tasksData);
  const [filter, setFilter] = useState("All");

  const addTask = ({ name, priority }) => {
    const newTask = {
      id: Date.now(), // unique id 
      name,
      priority,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id)); // new array
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Inline edit 
  const updateTaskName = (id, newName) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, name: newName } : t)));
  };

  const filteredTasks = useMemo(() => {
    if (filter === "All") return tasks;
    return tasks.filter((t) => t.priority === filter);
  }, [tasks, filter]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>To-Do List</h1>
        <div className={styles.divider}></div>
        <div className={styles.section}>
          <TaskForm onAddTask={addTask} />
        </div>

        <div className={styles.section}>
          <TaskFilter filter={filter} onChangeFilter={setFilter} />
        </div>

        <div className={styles.divider}></div>

        {filteredTasks.length === 0 ? (
          <p className={styles.empty}>No tasks yet!</p>
        ) : (
          <div className={styles.list}>
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onUpdateName={updateTaskName}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
