import type { Task, TaskFormData } from '../../types/task';
import TaskItem from '../TaskItem/TaskItem';

interface TaskListProps {
  tasks: Task[];
  editingTaskId: Task['id'] | null;
  emptyState: string;
  onToggleStatus: (id: Task['id']) => void;
  onDeleteTask: (id: Task['id']) => void;
  onStartEditing: (id: Task['id']) => void;
  onCancelEditing: () => void;
  onUpdateTask: (id: Task['id'], formData: TaskFormData) => void;
}

function TaskList({
  tasks,
  editingTaskId,
  emptyState,
  onToggleStatus,
  onDeleteTask,
  onStartEditing,
  onCancelEditing,
  onUpdateTask,
}: TaskListProps) {
  return tasks.length > 0 ? (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <TaskItem
            task={task}
            isEditing={task.id === editingTaskId}
            isEditDisabled={editingTaskId !== null && task.id !== editingTaskId}
            onToggleStatus={onToggleStatus}
            onDeleteTask={onDeleteTask}
            onStartEditing={onStartEditing}
            onCancelEditing={onCancelEditing}
            onUpdateTask={onUpdateTask}
          />
        </li>
      ))}
    </ul>
  ) : (
    <p>{emptyState}</p>
  );
}

export default TaskList;
