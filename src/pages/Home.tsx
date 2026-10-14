import { Task } from "../interfaces/Task";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("gorevler", []);

  // EKLE (Create)
  const addTask = (title: string) =>
    setTasks([
      { id: crypto.randomUUID(), title, done: false, createdAt: Date.now() },
      ...tasks,
    ]);

  // GÜNCELLE (Update): başlık düzenleme ve tamamlandı durumu
  const updateTask = (id: string, changes: Partial<Task>) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...changes } : t)));

  // SİL (Delete)
  const deleteTask = (id: string) => setTasks(tasks.filter((t) => t.id !== id));

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <main className="container notebook">
      <h1 className="h2 mb-1">Görev Defteri</h1>
      <p className="text-muted mb-4">
        {tasks.length === 0
          ? "Henüz görev yok. İlk görevini aşağıya yaz."
          : `${doneCount} / ${tasks.length} görev tamamlandı`}
      </p>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
    </main>
  );
}
