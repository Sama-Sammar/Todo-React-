import styles from "./TaskForm.module.css";
import { useForm } from "react-hook-form";// no useState for each input 
import { yupResolver } from "@hookform/resolvers/yup"; // validation roles yup + react-hook-form
import * as yup from "yup";

const noArabicRegex = /^[^\u0600-\u06FF]*$/;
const englishSpacesRegex = /^[A-Za-z ]+$/;
const startsWithCapitalRegex = /^[A-Z]/;

const schema = yup.object({
  name: yup
    .string()
    .required("Task name is required")
    .test("no-arabic", "Arabic is not allowed", (val) =>
      val ? noArabicRegex.test(val) : true
    ) // .test(testName, errorMessage, function)

    .test("english-only", "Only English letters and spaces are allowed", (val) =>
      val ? englishSpacesRegex.test(val) : true
    )

    .max(50, "Task name must be less than 50 characters")
    .test("capital-first", "First letter must be capital", (val) =>
      val ? startsWithCapitalRegex.test(val.trim()) : true
    ),

  priority: yup
    .string()
    .required("Priority is required")
    .oneOf(["High", "Medium", "Low"], "Priority is required"),
});

function TaskForm({ onAddTask }) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, touchedFields, isSubmitted, isValid },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),

    mode: "onTouched",
    reValidateMode: "onChange",
    criteriaMode: "all",

    defaultValues: { name: "", priority: "" },
  });

  const nameValue = watch("name");
  const priorityValue = watch("priority");

  const canSubmit = isValid && nameValue?.trim() && priorityValue; // name exit after trim 

  const showNameError =
    (touchedFields.name || isSubmitted || nameValue) && errors.name;

  const showPriorityError =
    (touchedFields.priority || isSubmitted) && errors.priority;

  const onSubmit = (data) => {
    onAddTask({ name: data.name.trim(), priority: data.priority });
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label>Task Name:</label>

        <input
          placeholder="Enter task"
          type="text"
          {...register("name", {
            onChange: async () => {
              await trigger("name");
            },
          })}
        />

        {showNameError && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        <label>Priority:</label>

        <select {...register("priority")}>
          <option value="">Select priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {showPriorityError && (
          <p className={styles.error}>{errors.priority.message}</p>
        )}
      </div>

      <button className={styles.addBtn} type="submit" disabled={!canSubmit}>
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
