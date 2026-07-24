export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
};

export type TaskFormData = {
  title: string;
  description: string;
};

export type TaskFormErrors = {
  title?: string;
  description?: string;
};

export type TaskStatus = 'active' | 'completed';

export type TaskFilter = 'all' | 'active' | 'completed';
