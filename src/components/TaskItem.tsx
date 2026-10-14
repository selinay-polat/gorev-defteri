import { useState } from "react";
import { Task } from "../interfaces/Task";

interface Props {
  task: Task;
  onUpdate: (id: string, changes: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const save = () => {
    const clean = draft.trim();
    if (clean) onUpdate(task.id, { title: clean });
    else setDraft(task.title);
    setEditing(false);
  };

  return (
    <li className="list-group-item d-flex align-items-center gap-3">
      <input
        type="checkbox"
        className="form-check-input mt-0"
        checked={task.done}
        onChange={() => onUpdate(task.id, { done: !task.done })}
        aria-label="Tamamlandı"
      />

      {editing ? (
        <input
          className="form-control form-control-sm"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && save()}
        />
      ) : (
        <span className={`flex-grow-1 ${task.done ? "task-done" : ""}`}>{task.title}</span>
      )}

      {editing ? (
        <button className="btn btn-sm btn-dark" onClick={save}>
          Kaydet
        </button>
      ) : (
        <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditing(true)}>
          Düzenle
        </button>
      )}
      <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(task.id)}>
        Sil
      </button>
    </li>
  );
}
