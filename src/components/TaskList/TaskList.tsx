import type { Task } from '../../types/task';
import TaskItem from '../TaskItem/TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: Task['id']) => void;
  onDeleteTask: (id: Task['id']) => void;
}

function TaskList({ tasks, onToggleStatus, onDeleteTask }: TaskListProps) {
  return tasks.length > 0 ? (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <TaskItem
            task={task}
            onToggleStatus={onToggleStatus}
            onDeleteTask={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  ) : (
    <p>Ще немає завдань. Додайте своє перше завдання.</p>
  );
}

export default TaskList;
