import { useId, useState } from 'react';
import type { ChangeEventHandler, SubmitEventHandler } from 'react';

import validateTaskForm from '../../utils/validateTaskForm';
import type { TaskFormData, TaskFormErrors } from '../../types/task';

interface TaskFormProps {
  initialData: TaskFormData;
  submitLabel: string;
  onSubmit: (formData: TaskFormData) => void;
  onCancel?: () => void;
  autoFocusTitle?: boolean;
}

const TaskForm = ({
  initialData,
  submitLabel,
  onSubmit,
  onCancel,
  autoFocusTitle = false,
}: TaskFormProps) => {
  const id = useId();

  const [formData, setFormData] = useState<TaskFormData>(initialData);
  const [errors, setErrors] = useState<TaskFormErrors>({});

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    const normalizedFormData: TaskFormData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
    };

    const formDataErrors = validateTaskForm(normalizedFormData);

    setErrors(formDataErrors);

    if (Object.keys(formDataErrors).length > 0) {
      return;
    }

    onSubmit(normalizedFormData);

    setFormData(initialData);
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

  const handleChangeField: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = event => {
    const { name, value } = event.currentTarget;
    const field = name as keyof TaskFormData;

    setFormData(previousFormData => ({ ...previousFormData, [field]: value }));

    clearError(field);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={handleChangeField}
          name="title"
          id={`${id}-title`}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? `${id}-title-error` : undefined}
          minLength={3}
          maxLength={100}
          required
          autoFocus={autoFocusTitle}
        />
        {errors.title && (
          <p id={`${id}-title-error`} role="alert">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-description`}>Description</label>
        <textarea
          value={formData.description}
          onChange={handleChangeField}
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
      </div>

      <div>
        <button type="submit">{submitLabel}</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
