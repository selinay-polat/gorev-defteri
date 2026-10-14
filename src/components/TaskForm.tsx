import { FormEvent, useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const clean = title.trim();
    if (!clean) return;
    onAdd(clean);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="input-group mb-4">
      <input
        className="form-control"
        placeholder="Yeni görev yaz"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Yeni görev"
      />
      <button className="btn btn-dark" type="submit">
        Görev ekle
      </button>
    </form>
  );
}
