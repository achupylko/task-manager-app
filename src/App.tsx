import { useState } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import type { Task, TaskFormData } from './types/task';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Налаштувати структуру проєкту',
    description: 'Створити основні директорії для компонентів, типів і утиліт.',
    status: 'completed',
    createdAt: '2026-07-19T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'Створити модель завдання',
    description: 'Описати типи Task, TaskStatus і TaskFilter.',
    status: 'completed',
    createdAt: '2026-07-20T12:30:00.000Z',
  },
  {
    id: '3',
    title: 'Реалізувати список завдань',
    description: 'Відобразити всі завдання за допомогою React-компонента.',
    status: 'active',
    createdAt: '2026-07-21T09:15:00.000Z',
  },
  {
    id: '4',
    title: 'Додати форму створення завдання',
    description: 'Створити форму з полями назви та опису завдання.',
    status: 'active',
    createdAt: '2026-07-22T14:45:00.000Z',
  },
  {
    id: '5',
    title: 'Реалізувати фільтрацію завдань',
    description: 'Додати фільтри для всіх, активних і виконаних завдань.',
    status: 'active',
    createdAt: '2026-07-23T16:20:00.000Z',
  },
  {
    id: '6',
    title: 'Додати збереження в localStorage',
    description: 'Зберігати список завдань між перезавантаженнями сторінки.',
    status: 'active',
    createdAt: '2026-07-24T08:40:00.000Z',
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleAddTask = (formData: TaskFormData): void => {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const newTask: Task = {
      ...formData,
      id,
      status: 'active',
      createdAt,
    };

    setTasks(currentTasks => [newTask, ...currentTasks]);
  };

  return (
    <>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} />
    </>
  );
}

export default App;
