import React, { useState, useMemo } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import { useTodos } from './hooks/useTodos';
import { FILTER_TYPES } from './utils/constants';
import './styles/App.css';

function App() {
  const {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    reorderTodos,
    undo,
    redo,
    canUndo,
    canRedo
  } = useTodos();

  const [currentFilter, setCurrentFilter] = useState(FILTER_TYPES.ALL);

  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case FILTER_TYPES.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FILTER_TYPES.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, currentFilter]);

  const todoStats = useMemo(() => ({
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  }), [todos]);

  const handleClearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    completedTodos.forEach(todo => deleteTodo(todo.id));
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>My Todo List</h1>
          <p>Stay organized and get things done!</p>
        </header>

        <main className="app-main">
          <TodoForm onAddTodo={addTodo} />
          
          <div className="controls">
            <FilterButtons
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              todoStats={todoStats}
            />
            
            <div className="action-buttons">
              <button
                onClick={undo}
                disabled={!canUndo}
                className="action-btn undo-btn"
                title="Undo last action"
              >
                ↶ Undo
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                className="action-btn redo-btn"
                title="Redo last action"
              >
                ↷ Redo
              </button>
              {todoStats.completed > 0 && (
                <button
                  onClick={handleClearCompleted}
                  className="action-btn clear-btn"
                  title="Clear all completed tasks"
                >
                  Clear Completed
                </button>
              )}
            </div>
          </div>

          <TodoList
            todos={filteredTodos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
            onReorderTodos={reorderTodos}
          />

          {todoStats.total > 0 && (
            <footer className="app-footer">
              <p>
                {todoStats.active} of {todoStats.total} tasks remaining
              </p>
              {/* <small>
                💡 Tip: Double-click to edit tasks, drag to reorder
              </small> */}
            </footer>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;