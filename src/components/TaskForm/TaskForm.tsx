import {
  useId,
  useState,
  type ChangeEvent,
  type SubmitEventHandler,
} from 'react';
import type { TaskFormData, TaskFormErrors } from '../../types/task';
import validateTaskForm from '../../utils/validateTaskForm';

interface TaskFormProps {
  onAddTask: (formData: TaskFormData) => void;
}

const INITIAL_FORM_DATA: TaskFormData = {
  title: '',
  description: '',
};

const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const id = useId();
  const [formData, setFormData] = useState<TaskFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<TaskFormErrors>({});

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    const formDataErrors: TaskFormErrors = validateTaskForm(formData);

    setErrors(formDataErrors);

    const hasFormDataErrors = Object.keys(formDataErrors).length > 0;

    if (hasFormDataErrors) {
      return;
    }

    onAddTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
    });

    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  };

  const clearError = (field: keyof TaskFormErrors) => {
    setErrors(previousErrors => {
      if (!previousErrors[field]) {
        return previousErrors;
      }

      const nextErrors = { ...previousErrors };
      delete nextErrors[field];

      return nextErrors;
    });
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setFormData(previousFormData => ({
      ...previousFormData,
      title: value,
    }));

    clearError('title');
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;

    setFormData(previousFormData => ({
      ...previousFormData,
      description: value,
    }));

    clearError('description');
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor={`${id}-title`}>Title</label>
      <input
        type="text"
        value={formData.title}
        onChange={handleChangeTitle}
        name="title"
        id={`${id}-title`}
        aria-invalid={Boolean(errors.title)}
        aria-describedby={errors.title ? `${id}-title-error` : undefined}
        minLength={3}
        maxLength={100}
        required
      />
      {errors.title && (
        <p id={`${id}-title-error`} role="alert">
          {errors.title}
        </p>
      )}

      <label htmlFor={`${id}-description`}>Description</label>
      <textarea
        value={formData.description}
        onChange={handleChangeDescription}
        name="description"
        id={`${id}-description`}
        aria-invalid={Boolean(errors.description)}
        aria-describedby={
          errors.description ? `${id}-description-error` : undefined
        }
        maxLength={500}
      />
      {errors.description && (
        <p id={`${id}-description-error`} role="alert">
          {errors.description}
        </p>
      )}

      <button type="submit">Add New Task</button>
    </form>
  );
};

export default TaskForm;
