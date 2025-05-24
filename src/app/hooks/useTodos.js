import { useEffect, useState } from "react";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todos"));
    if (stored) setTodos(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const pushToHistory = (newTodos) => {
    setHistory((prev) => [...prev, todos]);
    setRedoStack([]);
    setTodos(newTodos);
  };

  const addTodo = (text, category, priority) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      category,
      priority,
    };
    pushToHistory([newTodo, ...todos]);
  };

  const toggleComplete = (id) => {
    pushToHistory(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    pushToHistory(todos.filter((t) => t.id !== id));
  };

  const editTodo = (id, newText, newCategory) => {
    pushToHistory(
      todos.map((t) =>
        t.id === id
          ? {
              ...t,
              text: newText ?? t.text,
              category: newCategory ?? t.category,
            }
          : t
      )
    );
  };

  const undo = () => {
    if (history.length > 0) {
      const previous = history[history.length - 1];
      setRedoStack((r) => [todos, ...r]);
      setHistory((h) => h.slice(0, -1));
      setTodos(previous);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const next = redoStack[0];
      setHistory((h) => [...h, todos]);
      setRedoStack((r) => r.slice(1));
      setTodos(next);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? !todo.completed
        : todo.completed;
    const matchesCategory =
      categoryFilter === "" || todo.category === categoryFilter;

    return matchesSearch && matchesFilter && matchesCategory;
  });

  return {
    todos: filteredTodos,
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
  };
}
