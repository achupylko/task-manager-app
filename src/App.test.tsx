import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';

import App from './App';
import type { Task } from './types/task';

const TASK_FIXTURE: Task = {
  id: '1',
  title: 'Learn React Testing',
  description: 'Practice component tests',
  status: 'active',
  createdAt: '2026-08-18T07:00:00.000Z',
};

beforeEach(() => {
  localStorage.clear();
});

describe('App', () => {
  test('renders the main heading', () => {
    render(<App />);

    const heading = screen.getByRole('heading', { name: 'Task Manager' });

    expect(heading).toBeInTheDocument();
  });

  test('creates a new task', async () => {
    const user = userEvent.setup();

    render(<App />);

    const titleInput = screen.getByRole('textbox', {
      name: 'Title',
    });
    const descriptionInput = screen.getByRole('textbox', {
      name: 'Description',
    });
    const addButton = screen.getByRole('button', {
      name: 'Add New Task',
    });

    await user.type(titleInput, 'Learn React Testing');
    await user.type(descriptionInput, 'Practice testing React applications');
    await user.click(addButton);

    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');

    const taskHeading = screen.getByRole('heading', {
      name: 'Learn React Testing',
    });

    expect(taskHeading).toBeInTheDocument();

    const taskDescription = screen.getByText(
      'Practice testing React applications'
    );

    expect(taskDescription).toBeInTheDocument();
  });

  test('shows validation error when title is invalid', async () => {
    const user = userEvent.setup();

    render(<App />);

    const addButton = screen.getByRole('button', {
      name: 'Add New Task',
    });

    await user.click(addButton);

    const alert = screen.getByRole('alert');

    expect(alert).toBeInTheDocument();

    const emptyState = screen.getByText('No tasks yet. Add your first task.');

    expect(emptyState).toBeInTheDocument();
  });

  test('toggles task status', async () => {
    const user = userEvent.setup();

    localStorage.setItem('tasks', JSON.stringify([TASK_FIXTURE]));

    render(<App />);

    const taskTitle = screen.getByRole('heading', {
      name: 'Learn React Testing',
    });

    expect(taskTitle).toBeInTheDocument();

    const activeStatus = screen.getByText('Status: Active');

    expect(activeStatus).toBeInTheDocument();

    const toggleButton = screen.getByRole('button', {
      name: 'Mark as complete: "Learn React Testing"',
    });

    await user.click(toggleButton);

    const completedStatus = screen.getByText('Status: Completed');

    expect(completedStatus).toBeInTheDocument();
    expect(screen.queryByText('Status: Active')).not.toBeInTheDocument();

    const updatedToggleButton = screen.getByRole('button', {
      name: 'Mark as active: "Learn React Testing"',
    });

    expect(updatedToggleButton).toBeInTheDocument();
  });

  test('deletes a task', async () => {
    const user = userEvent.setup();

    localStorage.setItem('tasks', JSON.stringify([TASK_FIXTURE]));

    render(<App />);

    const taskTitle = screen.getByRole('heading', {
      name: 'Learn React Testing',
    });

    expect(taskTitle).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', {
      name: 'Delete task Learn React Testing',
    });

    await user.click(deleteButton);

    expect(
      screen.queryByRole('heading', {
        name: 'Learn React Testing',
      })
    ).not.toBeInTheDocument();

    const emptyState = screen.getByText('No tasks yet. Add your first task.');

    expect(emptyState).toBeInTheDocument();
  });

  test('edits a task', async () => {
    const user = userEvent.setup();

    localStorage.setItem('tasks', JSON.stringify([TASK_FIXTURE]));

    render(<App />);

    const editButton = screen.getByRole('button', {
      name: 'Edit task Learn React Testing',
    });
    await user.click(editButton);

    const editHeading = screen.getByRole('heading', {
      name: 'Edit: Learn React Testing',
    });

    expect(editHeading).toBeInTheDocument();

    const editArticle = editHeading.closest('article');

    if (!editArticle) {
      throw new Error('Edit article was not found');
    }

    const editScope = within(editArticle);

    const titleInput = editScope.getByRole('textbox', {
      name: 'Title',
    });
    const descriptionInput = editScope.getByRole('textbox', {
      name: 'Description',
    });

    expect(titleInput).toHaveValue('Learn React Testing');

    expect(descriptionInput).toHaveValue('Practice component tests');

    await user.clear(titleInput);
    await user.type(titleInput, 'Updated React Testing');

    await user.clear(descriptionInput);
    await user.type(descriptionInput, 'Updated component tests');

    const saveButton = editScope.getByRole('button', {
      name: 'Save Changes',
    });

    await user.click(saveButton);

    const updatedHeading = screen.getByRole('heading', {
      name: 'Updated React Testing',
    });

    expect(updatedHeading).toBeInTheDocument();

    const updatedDescription = screen.getByText('Updated component tests');

    expect(updatedDescription).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', {
        name: 'Edit: Learn React Testing',
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', {
        name: 'Learn React Testing',
      })
    ).not.toBeInTheDocument();
  });
});
