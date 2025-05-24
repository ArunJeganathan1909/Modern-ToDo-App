import { useState } from "react";

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  setEditingId,
  isEditing,
}) {
  const [tempText, setTempText] = useState(todo.text);
  const [tempCategory, setTempCategory] = useState(todo.category);

  const handleSave = () => {
    onEdit(todo.id, tempText, tempCategory);
    setEditingId(null);
  };

  return (
    <div
      className={`flex justify-between items-start sm:items-center gap-4 p-4 mb-4 rounded-xl border shadow-sm transition-shadow duration-200
        ${
          todo.completed
            ? "bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            : "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        } hover:shadow-md`}
      style={{
        color: "var(--foreground)",
        backgroundColor: "var(--background)",
        borderColor: todo.completed
          ? "var(--button-bg)"
          : "var(--button-hover)",
      }}
    >
      <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 accent-blue-500 transition-all duration-150 scale-110 cursor-pointer"
          title="Mark complete"
        />

        {isEditing ? (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              type="text"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              placeholder="Edit todo"
              className="w-full sm:w-1/2 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
            />
            <input
              type="text"
              value={tempCategory}
              onChange={(e) => setTempCategory(e.target.value)}
              placeholder="Edit category"
              className="w-full sm:w-1/3 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
            />
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
            >
              Save
            </button>
          </div>
        ) : (
          <div
            onDoubleClick={() => setEditingId(todo.id)}
            className="flex flex-col w-full cursor-pointer"
            style={{ color: "var(--foreground)" }}
          >
            <span
              className={`text-lg font-medium ${
                todo.completed
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {todo.text}
            </span>
            <div className="text-sm mt-1 flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs flex items-center gap-1 dark:bg-blue-900 dark:text-blue-300">
                📁 {todo.category || "General"}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${
                  todo.priority === "high"
                    ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                    : todo.priority === "medium"
                    ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
                    : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                }`}
              >
                ⚡ {todo.priority}
              </span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-600 font-bold text-lg transition-all duration-150 hover:scale-110 dark:text-red-400 dark:hover:text-red-500"
        title="Delete"
      >
        ✕
      </button>
    </div>
  );
}
