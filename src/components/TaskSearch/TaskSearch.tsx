import type { ChangeEventHandler } from 'react';

interface TaskSearchProps {
  currentSearchQuery: string;
  onChangeSearchQuery: (searchQuery: string) => void;
  isSearchDisabled: boolean;
}

const TaskSearch = ({
  currentSearchQuery,
  onChangeSearchQuery,
  isSearchDisabled,
}: TaskSearchProps) => {
  const handleSearch: ChangeEventHandler<HTMLInputElement> = event => {
    const value = event.currentTarget.value;

    onChangeSearchQuery(value);
  };
  return (
    <div>
      <label htmlFor="searchQuery">Search tasks</label>
      <input
        type="search"
        name="searchQuery"
        id="searchQuery"
        value={currentSearchQuery}
        onChange={handleSearch}
        autoComplete="off"
        placeholder="Search tasks..."
        disabled={isSearchDisabled}
      />
    </div>
  );
};

export default TaskSearch;
