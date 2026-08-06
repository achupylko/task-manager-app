import TaskForm from '../TaskForm/TaskForm';
import type { Task, TaskFormData } from '../../types/task';
import { formatDateTime } from '../../utils/formatDateTime';

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  isEditDisabled: boolean;
  onToggleStatus: (id: Task['id']) => void;
  onDeleteTask: (id: Task['id']) => void;
  onStartEditing: (id: Task['id']) => void;
  onCancelEditing: () => void;
  onUpdateTask: (id: Task['id'], formData: TaskFormData) => void;
}

function TaskItem({
  task,
  isEditing,
  isEditDisabled,
  onToggleStatus,
  onDeleteTask,
  onStartEditing,
  onCancelEditing,
  onUpdateTask,
}: TaskItemProps) {
  const { id, title, description, status, createdAt } = task;

  const isCompleted = status === 'completed';

  if (isEditing) {
    const initialData: TaskFormData = {
      title,
      description,
    };

    return (
      <article>
        <TaskForm
          initialData={initialData}
          submitLabel="Save Changes"
          onSubmit={formData => onUpdateTask(id, formData)}
          onCancel={onCancelEditing}
        />
      </article>
    );
  }

  return (
    <article>
      <h3>{title}</h3>

      {description !== '' && <p>{description}</p>}

      <p>Status: {status === 'active' ? 'Active' : 'Completed'}</p>

      <time dateTime={createdAt}>{formatDateTime(createdAt)}</time>

      <div>
        <button
          type="button"
          onClick={() => onToggleStatus(id)}
          aria-label={`Toggle completion status for task ${title}`}
          aria-pressed={isCompleted}
        >
          Mark as {status === 'active' ? 'complete' : 'active'}
        </button>

        <button
          type="button"
          onClick={() => onStartEditing(id)}
          aria-label={`Edit task ${title}`}
          disabled={isEditDisabled}
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDeleteTask(id)}
          aria-label={`Delete task ${title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
