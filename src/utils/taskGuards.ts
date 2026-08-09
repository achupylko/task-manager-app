import type { Task } from '../types/task';

export const isTask = (value: unknown): value is Task => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const task = value as Record<string, unknown>;

  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    (task.status === 'active' || task.status === 'completed') &&
    typeof task.createdAt === 'string'
  );
};

export const isTaskArray = (value: unknown): value is Task[] => {
  return Array.isArray(value) && value.every(isTask);
};
