import { create } from "zustand";
import { ITodoItem } from "store/models/todo.model";
import { persist, createJSONStorage } from "zustand/middleware";

interface TodoState {
  todos: ITodoItem[];
  addTodo: (todo: ITodoItem) => void;
  removeTodo: (todo: ITodoItem["id"]) => void;
  toggleTodo: (todo: ITodoItem["id"]) => void;
}

const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],

      // Add a new todo
      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, todo],
        })),

      // Remove a todo by ID
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      // Toggle a todo's completion status
      toggleTodo: (id: ITodoItem["id"]) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);

export default useTodoStore;
