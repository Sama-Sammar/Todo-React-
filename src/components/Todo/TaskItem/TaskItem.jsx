import { useState } from "react";
import styles from "./TaskItem.module.css";

function TaskItem({ task, onToggle, onDelete, onUpdateName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.name);

  const save = () => {
    const trimmed = value.trim();
    if (!trimmed) {// if empty 
      setValue(task.name);
      setIsEditing(false);
      return;
    }
    onUpdateName(task.id, trimmed);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") {
      setValue(task.name);
      setIsEditing(false);
    }
  };

  return (
    <div className={`${styles.item} ${styles[task.priority.toLowerCase()]}`}>
      <div className={styles.left}>
        {isEditing ? (
          <input
            className={styles.editInput}
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onBlur={save}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <p
            className={`${styles.name} ${task.completed ? styles.done : ""}`}
            onClick={() => {
              if (!task.completed) setIsEditing(true);
            }}
            title={task.completed ? "" : "Click to edit"}
          >
            {task.name}
          </p>
        )}

        <p className={styles.priority}>{task.priority} Priority</p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={task.completed ? styles.undoBtn : styles.doneBtn}
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? "Undo" : "Done"}
        </button>

        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
