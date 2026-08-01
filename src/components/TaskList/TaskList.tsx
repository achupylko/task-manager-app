import type { Task } from '../../types/task';
import TaskItem from '../TaskItem/TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: Task['id']) => void;
}

function TaskList({ tasks, onToggleStatus }: TaskListProps) {
  return tasks.length > 0 ? (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <TaskItem task={task} onToggleStatus={onToggleStatus} />
        </li>
      ))}
    </ul>
  ) : (
    <p>Ще немає завдань. Додайте своє перше завдання.</p>
  );
}

export default TaskList;
