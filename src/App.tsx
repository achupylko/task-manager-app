import { useState } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import type { Task, TaskFilter, TaskFormData } from './types/task';
import TaskFilters from './components/TaskFilters/TaskFilters';

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

const EMPTY_FORM_DATA: TaskFormData = {
  title: '',
  description: '',
};

const INITIAL_FILTER: TaskFilter = 'all';

function App() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [editingTaskId, setEditingTaskId] = useState<Task['id'] | null>(null);
  const [filter, setFilter] = useState<TaskFilter>(INITIAL_FILTER);

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

  const handleToggleStatus = (id: Task['id']): void => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'active' ? 'completed' : 'active',
            }
          : task
      )
    );
  };

  const handleDeleteTask = (id: Task['id']): void => {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id));

    setEditingTaskId(currentId => (currentId === id ? null : currentId));
  };

  const handleStartEditing = (id: Task['id']): void => {
    setEditingTaskId(currentEditingTaskId => currentEditingTaskId ?? id);
  };

  const handleCancelEditing = (): void => {
    setEditingTaskId(null);
  };

  const handleUpdateTask = (id: Task['id'], formData: TaskFormData): void => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id
          ? {
              ...task,
              ...formData,
            }
          : task
      )
    );

    setEditingTaskId(null);
  };

  const filteredTasks =
    filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  const handleChangeFilter = (nextFilter: TaskFilter): void => {
    setFilter(nextFilter);
  };

  const emptyState =
    tasks.length === 0
      ? 'No tasks yet. Add your first task.'
      : `No ${filter} tasks.`;

  return (
    <>
      <h1>Task Manager</h1>
      <TaskForm
        initialData={EMPTY_FORM_DATA}
        submitLabel="Add New Task"
        onSubmit={handleAddTask}
      />

      <TaskFilters
        currentFilter={filter}
        onChangeFilter={handleChangeFilter}
        isFiltersDisabled={editingTaskId !== null}
      />

      <TaskList
        tasks={filteredTasks}
        editingTaskId={editingTaskId}
        emptyState={emptyState}
        onToggleStatus={handleToggleStatus}
        onDeleteTask={handleDeleteTask}
        onStartEditing={handleStartEditing}
        onCancelEditing={handleCancelEditing}
        onUpdateTask={handleUpdateTask}
      />
    </>
  );
}

export default App;
