import type { TaskFilter } from '../../types/task';

interface TaskFiltersProps {
  currentFilter: TaskFilter;
  onChangeFilter: (filter: TaskFilter) => void;
  isFiltersDisabled: boolean;
}

const TaskFilters = ({
  currentFilter,
  onChangeFilter,
  isFiltersDisabled,
}: TaskFiltersProps) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => onChangeFilter('all')}
        aria-pressed={currentFilter === 'all'}
        disabled={isFiltersDisabled}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => onChangeFilter('active')}
        aria-pressed={currentFilter === 'active'}
        disabled={isFiltersDisabled}
      >
        Active
      </button>
      <button
        type="button"
        onClick={() => onChangeFilter('completed')}
        aria-pressed={currentFilter === 'completed'}
        disabled={isFiltersDisabled}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilters;
