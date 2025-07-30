import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { LOCAL_STORAGE_KEY, HISTORY_STORAGE_KEY } from '../utils/constants';

export const useTodos = () => {
  const [todos, setTodos] = useLocalStorage(LOCAL_STORAGE_KEY, []);
  const [history, setHistory] = useLocalStorage(HISTORY_STORAGE_KEY, []);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveToHistory = useCallback((newTodos) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newTodos);
    if (newHistory.length > 10) { // Keep only last 10 states
      newHistory.shift();
    } else {
      setHistoryIndex(prev => prev + 1);
    }
    setHistory(newHistory);
  }, [history, historyIndex, setHistory]);

  const addTodo = useCallback((text) => {
    const newTodo = {
      id: Date.now() + Math.random(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    saveToHistory(todos); // Save previous state
  }, [todos, setTodos, saveToHistory]);

  const deleteTodo = useCallback((id) => {
    saveToHistory(todos);
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }, [todos, setTodos, saveToHistory]);

  const toggleTodo = useCallback((id) => {
    saveToHistory(todos);
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  }, [todos, setTodos, saveToHistory]);

  const editTodo = useCallback((id, newText) => {
    saveToHistory(todos);
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    );
    setTodos(newTodos);
  }, [todos, setTodos, saveToHistory]);

  const reorderTodos = useCallback((startIndex, endIndex) => {
    saveToHistory(todos);
    const result = Array.from(todos);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTodos(result);
  }, [todos, setTodos, saveToHistory]);

  const undo = useCallback(() => {
    if (historyIndex >= 0 && history[historyIndex]) {
      setTodos(history[historyIndex]);
      setHistoryIndex(prev => prev - 1);
    }
  }, [history, historyIndex, setTodos]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setTodos(history[historyIndex + 1]);
    }
  }, [history, historyIndex, setTodos]);

  const canUndo = historyIndex >= 0;
  const canRedo = historyIndex < history.length - 1;

  return {
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
  };
};