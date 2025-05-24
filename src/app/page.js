"use client";

import useTodos from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import FilterBar from "./components/FilterBar";
import ThemeToggle from "./components/ThemeToggle"; // Add this line
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Home() {
  const {
    todos,
    addTodo,
    toggleComplete,
    deleteTodo,
    editTodo,
    undo,
    redo,
    filter,
    setFilter,
    search,
    setSearch,
    editingId,
    setEditingId,
    categoryFilter,
    setCategoryFilter,
    setTodos,
  } = useTodos();

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const reordered = Array.from(todos);
    const [moved] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, moved);

    setTodos(reordered); // You’ll need to expose setTodos in useTodos.js
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen pt-6">
      <div className="max-w-full sm:max-w-3xl md:max-w-4xl mx-auto p-4 bg-white/80 dark:bg-gray-800/80 shadow-lg rounded-xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">📝 Todo App</h1>
          <ThemeToggle />
        </div>

        <TodoForm onAdd={addTodo} />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        {/* Undo/Redo Buttons */}
        <div className="flex gap-2 justify-end mt-4 mb-2">
          <button
            onClick={undo}
            className="px-3 py-1 rounded bg-blue-200 hover:bg-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 text-sm"
          >
            ⬅ Undo
          </button>
          <button
            onClick={redo}
            className="px-3 py-1 rounded bg-green-200 hover:bg-green-300 dark:bg-green-700 dark:hover:bg-green-800 text-sm"
          >
            Redo ➡
          </button>
        </div>

        {/* Todo List with Drag & Drop */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todo-list">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2"
              >
                {todos.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoItem
                          todo={todo}
                          onToggle={toggleComplete}
                          onDelete={deleteTodo}
                          onEdit={editTodo}
                          setEditingId={setEditingId}
                          isEditing={editingId === todo.id}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
