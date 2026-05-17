import React, { createContext, useState, useCallback } from 'react';
import API from '../utils/api';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTasks = useCallback(async (category, status) => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (category) params.category = category;
      if (status) params.status = status;

      const { data } = await API.get('/tasks', { params });
      setTasks(data.tasks);
      return data.tasks;
    } catch (err) {
        const resp = err.response?.data;
        const message = resp?.errors ? resp.errors.join(' ') : resp?.message || 'Failed to fetch tasks';
        setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.post('/tasks', taskData);
      setTasks([data.task, ...tasks]);
      return data.task;
    } catch (err) {
        const resp = err.response?.data;
        const message = resp?.errors ? resp.errors.join(' ') : resp?.message || 'Failed to create task';
        setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tasks]);

  const updateTask = useCallback(async (taskId, taskData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.put(`/tasks/${taskId}`, taskData);
      setTasks(tasks.map(task => task._id === taskId ? data.task : task));
      return data.task;
    } catch (err) {
        const resp = err.response?.data;
        const message = resp?.errors ? resp.errors.join(' ') : resp?.message || 'Failed to update task';
        setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tasks]);

  const deleteTask = useCallback(async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
        const resp = err.response?.data;
        const message = resp?.errors ? resp.errors.join(' ') : resp?.message || 'Failed to delete task';
        setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, getTasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
