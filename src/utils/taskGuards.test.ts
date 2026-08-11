import { describe, expect, test } from 'vitest';
import { isTask, isTaskArray } from './taskGuards';

const validTask = {
  id: '1',
  title: 'Learn testing',
  description: 'Practice unit tests',
  status: 'active',
  createdAt: '2026-08-11T10:00:00.000Z',
};

const validTasks = [
  validTask,
  {
    ...validTask,
    id: '2',
  },
];

describe('isTask', () => {
  test('returns true for a valid task', () => {
    const result = isTask(validTask);

    expect(result).toBe(true);
  });

  test('returns false when status is invalid', () => {
    const task = {
      ...validTask,
      status: 'pending',
    };

    const result = isTask(task);

    expect(result).toBe(false);
  });

  test('returns false when value is null', () => {
    const task = null;

    const result = isTask(task);

    expect(result).toBe(false);
  });

  test('returns false when createdAt is not a string', () => {
    const task = {
      ...validTask,
      createdAt: undefined,
    };

    const result = isTask(task);

    expect(result).toBe(false);
  });

  test.each([
    ['id', null],
    ['title', null],
    ['description', null],
  ])('returns false when %s is not a string', (field, value) => {
    const task = {
      ...validTask,
      [field]: value,
    };

    const result = isTask(task);

    expect(result).toBe(false);
  });
});

describe('isTaskArray', () => {
  test('returns true for an array of valid tasks', () => {
    const result = isTaskArray(validTasks);

    expect(result).toBe(true);
  });

  test('returns false when value is not an array', () => {
    const tasks = null;

    const result = isTaskArray(tasks);

    expect(result).toBe(false);
  });

  test('returns false when array contains an invalid task', () => {
    const tasks = [...validTasks, {}];

    const result = isTaskArray(tasks);

    expect(result).toBe(false);
  });

  test('returns true for an empty array', () => {
    const result = isTaskArray([]);

    expect(result).toBe(true);
  });
});
