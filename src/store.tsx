import create from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// Zustand implementation
export type Store = {
  todos: Todo[];
  newTodo: string;
  load: (todos: Todo[]) => void;
  addTodo: () => void;
  updateTodo: (id: number, text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  setNewTodo: (newTodo: string) => void;
};

// Log every time state is changed
const log = (config: any) => (set: any, get: any, api: any) =>
  config(
    (...args: any[]) => {
      console.log('  applying', args);
      set(...args);
      console.log('  new state', get());
    },
    get,
    api
  );

const useStore = create<Store>(
  log(
    (set: any): Store => ({
      todos: [],
      newTodo: '',
      load: (todos: Todo[]) =>
        set((state: Store) => ({
          ...state,
          todos,
        })),
      removeTodo: (id: number) =>
        set((state: Store) => ({
          ...state,
          todos: removeTodo(state.todos, id),
        })),
      updateTodo: (id: number, text: string) =>
        set((state: Store) => ({
          ...state,
          todos: updateTodo(state.todos, id, text),
        })),
      toggleTodo: (id: number) =>
        set((state: Store) => ({
          ...state,
          todos: toggleTodo(state.todos, id),
        })),
      setNewTodo: (newTodo: string) =>
        set((state: Store) => ({
          ...state,
          newTodo,
        })),
      addTodo: () =>
        set((state: Store) => ({
          ...state,
          todos: addTodo(state.todos, state.newTodo),
          newTodo: '',
        })),
    })
  )
);

export default useStore;
