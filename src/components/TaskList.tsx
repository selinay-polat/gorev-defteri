import { Task } from "../interfaces/Task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onUpdate: (id: string, changes: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

// LİSTELE (Read)
export default function TaskList({ tasks, onUpdate, onDelete }: Props) {
  if (tasks.length === 0) return null;
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}
