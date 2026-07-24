import type { Task } from '../../types/task';
import { formatDateTime } from '../../utils/formatDateTime';

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const { title, description, status, createdAt } = task;

  const statusText =
    status === 'active'
      ? { current: 'Активне', next: 'виконане' }
      : { current: 'Виконане', next: 'активне' };

  return (
    <article>
      <h3>{title}</h3>
      {description !== '' && <p>{description}</p>}
      <p>Статус: {statusText.current}</p>
      <time dateTime={createdAt}>{formatDateTime(createdAt)}</time>
      <div>
        <button
          type="button"
          aria-label={`Позначити завдання ${title} як ${statusText.next}`}
        >
          Позначити як {statusText.next}
        </button>

        <button type="button" aria-label={`Редагувати завдання: ${title}`}>
          Редагувати
        </button>

        <button type="button" aria-label={`Видалити завдання: ${title}`}>
          Видалити
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
