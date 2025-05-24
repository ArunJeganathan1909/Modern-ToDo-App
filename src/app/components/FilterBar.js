export default function FilterBar({
  filter,
  setFilter,
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
      <div className="flex gap-2 w-full sm:w-auto">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-auto p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-auto p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="">All Categories</option>
          <option value="Work">Work</option>
          <option value="Home">Home</option>
          <option value="General">General</option>
        </select>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white w-full sm:w-1/3"
        placeholder="Search todos"
      />
    </div>
  );
}
