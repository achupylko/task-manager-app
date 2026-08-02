import type { Task } from '../../types/task';
import { formatDateTime } from '../../utils/formatDateTime';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: Task['id']) => void;
  onDeleteTask: (id: Task['id']) => void;
}

function TaskItem({ task, onToggleStatus, onDeleteTask }: TaskItemProps) {
  const { id, title, description, status, createdAt } = task;

  const statusLabel = status === 'active' ? 'Active' : 'Completed';
  const toggleActionLabel = status === 'active' ? 'complete' : 'active';
  const isCompleted = status === 'completed';

  return (
    <article>
      <h3>{title}</h3>
      {description !== '' && <p>{description}</p>}
      <p>Status: {statusLabel}</p>
      <time dateTime={createdAt}>{formatDateTime(createdAt)}</time>
      <div>
        <button
          onClick={() => onToggleStatus(id)}
          type="button"
          aria-label={`Toggle completion status for task ${title}`}
          aria-pressed={isCompleted}
        >
          Mark as {toggleActionLabel}
        </button>

        <button type="button" aria-label={`Edit task ${title}`}>
          Edit
        </button>

        <button
          onClick={() => onDeleteTask(id)}
          type="button"
          aria-label={`Delete task ${title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
