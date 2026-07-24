import type { Task } from '../../types/task';
import TaskItem from '../TaskItem/TaskItem';

interface TaskListProps {
  tasks: Task[];
}

function TaskList({ tasks }: TaskListProps) {
  return tasks.length > 0 ? (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <TaskItem task={task} />
        </li>
      ))}
    </ul>
  ) : (
    <p>Ще немає завдань. Додайте своє перше завдання.</p>
  );
}

export default TaskList;
