import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import type { Task, TaskFilter, TaskFormData } from './types/task';
import TaskFilters from './components/TaskFilters/TaskFilters';
import TaskSearch from './components/TaskSearch/TaskSearch';
import { loadFromLocalStorage, saveToLocalStorage } from './utils/localStorage';
import { isTaskArray } from './utils/taskGuards';

const EMPTY_FORM_DATA: TaskFormData = {
  title: '',
  description: '',
};

const INITIAL_FILTER: TaskFilter = 'all';
const TASKS_STORAGE_KEY = 'tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = loadFromLocalStorage(TASKS_STORAGE_KEY);

    return isTaskArray(storedTasks) ? storedTasks : [];
  });
  const [editingTaskId, setEditingTaskId] = useState<Task['id'] | null>(null);
  const [filter, setFilter] = useState<TaskFilter>(INITIAL_FILTER);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    saveToLocalStorage(TASKS_STORAGE_KEY, tasks);
  }, [tasks]);

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

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const visibleTasks =
    normalizedSearchQuery === ''
      ? filteredTasks
      : filteredTasks.filter(
          task =>
            task.title.toLowerCase().includes(normalizedSearchQuery) ||
            task.description.toLowerCase().includes(normalizedSearchQuery)
        );

  const handleChangeFilter = (nextFilter: TaskFilter): void => {
    setFilter(nextFilter);
  };

  const handleChangeSearchQuery = (nextSearchQuery: string): void => {
    setSearchQuery(nextSearchQuery);
  };

  const emptyState =
    tasks.length === 0
      ? 'No tasks yet. Add your first task.'
      : normalizedSearchQuery !== '' && visibleTasks.length === 0
        ? `No tasks found for "${searchQuery.trim()}".`
        : `No ${filter} tasks.`;

  return (
    <>
      <h1>Task Manager</h1>
      <TaskForm
        initialData={EMPTY_FORM_DATA}
        submitLabel="Add New Task"
        onSubmit={handleAddTask}
      />

      <TaskSearch
        currentSearchQuery={searchQuery}
        onChangeSearchQuery={handleChangeSearchQuery}
        isSearchDisabled={editingTaskId !== null}
      />

      <TaskFilters
        currentFilter={filter}
        onChangeFilter={handleChangeFilter}
        isFiltersDisabled={editingTaskId !== null}
      />

      <TaskList
        tasks={visibleTasks}
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
