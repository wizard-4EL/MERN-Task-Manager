import React, { useState } from 'react';
import { Trash2, Calendar, CheckCircle2, Circle, ChevronDown } from 'lucide-react';
import useTask from '../hooks/useTask';

const TaskItem = ({ task, onUpdated }) => {
  const { updateTask, deleteTask, loading } = useTask();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTask(task._id, { status: newStatus });
      setShowStatusMenu(false);
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        await deleteTask(task._id);
        if (onUpdated) onUpdated();
      } catch (err) {
        console.error(err);
        setIsDeleting(false);
      }
    }
  };

  const handleToggleComplete = async () => {
    try {
      const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
      await updateTask(task._id, { status: newStatus });
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error(err);
    }
  };

  const statusConfig = {
    Pending: { color: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:shadow-md', badge: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300' },
    'Not Started': { color: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:shadow-md', badge: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300' },
    'In Progress': { color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:shadow-md', badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' },
    Completed: { color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:shadow-md', badge: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' },
  };

  const priorityConfig = {
    Low: 'text-blue-600 dark:text-blue-400',
    Medium: 'text-amber-600 dark:text-amber-400',
    High: 'text-red-600 dark:text-red-400',
  };

  const categoryIcons = {
    Work: '💼',
    Personal: '👤',
    Shopping: '🛒',
    Health: '🏥',
    Other: '📌',
  };

  const isCompleted = task.status === 'Completed';
  const config = statusConfig[task.status] || statusConfig.Pending;

  return (
    <div className={`card p-4 border transition-all duration-200 ${config.color}`}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={handleToggleComplete}
          disabled={loading}
          className="mt-0.5 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
          aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
        >
          {isCompleted ? (
            <CheckCircle2 size={24} className="text-green-600 dark:text-green-400" />
          ) : (
            <Circle size={24} className="text-slate-400 dark:text-slate-600" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <h3 className={`text-sm font-semibold leading-tight ${isCompleted ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                {task.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {categoryIcons[task.category] || '📌'} {task.category}
                </span>
                <span className={`text-xs font-medium ${priorityConfig[task.priority] || priorityConfig.Medium}`}>
                  • {task.priority}
                </span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="relative">
              <button
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                disabled={loading}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${config.badge}`}
              >
                {task.status}
                <ChevronDown size={14} />
              </button>

              {/* Status Menu */}
              {showStatusMenu && (
                <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10">
                  {['Pending', 'In Progress', 'Completed'].map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {task.dueDate && (
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar size={14} />
                  <span>
                    {new Date(task.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              disabled={loading || isDeleting}
              className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;


