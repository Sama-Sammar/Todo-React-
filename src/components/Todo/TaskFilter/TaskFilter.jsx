import styles from "./TaskFilter.module.css";

const filters = ["All", "High", "Medium", "Low"];

function TaskFilter({ filter, onChangeFilter }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Filter by Priority:</span>

      <div className={styles.buttons}>
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={`${styles.btn} ${filter === f ? styles.active : ""}`}
            onClick={() => onChangeFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilter;
