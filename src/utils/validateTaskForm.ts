import type { TaskFormData, TaskFormErrors } from '../types/task';

function validateTaskForm(formData: TaskFormData): TaskFormErrors {
  const errors: TaskFormErrors = {};

  const title = formData.title.trim();
  const description = formData.description.trim();

  if (title === '') {
    errors.title = 'Please enter a task title';
  } else if (title.length < 3) {
    errors.title = 'The task title must be 3 or more characters';
  } else if (title.length > 100) {
    errors.title = 'The task title must be 100 characters or less';
  }

  if (description.length > 500) {
    errors.description = 'The task description must be 500 characters or less';
  }

  return errors;
}

export default validateTaskForm;
