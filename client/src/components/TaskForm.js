import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import useTask from '../hooks/useTask';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Work',
    priority: 'Medium',
    dueDate: '',
  });
  const [errors, setErrors] = useState({});
  const { createTask, loading, error } = useTask();
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }
    if (formData.title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createTask(formData);
      setFormData({
        title: '',
        description: '',
        category: 'Work',
        priority: 'Medium',
        dueDate: '',
      });
      setErrors({});
      if (onTaskCreated) onTaskCreated();
    } catch (err) {
      console.error(err);
    }
  };

  const priorityColors = {
    Low: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    Medium: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    High: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  };

  const priorityBadgeColors = {
    Low: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    Medium: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
    High: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Task Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          maxLength={100}
          placeholder="e.g., Complete project proposal"
          className={`w-full px-3 py-2.5 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            errors.title ? 'border-red-500 dark:border-red-600' : 'border-slate-200 dark:border-slate-700'
          }`}
        />
        {errors.title && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.title}
          </p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add task details..."
          rows="3"
          className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
        />
      </div>

      {/* Category & Priority Row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Due Date Field (custom calendar) */}
      <div ref={wrapperRef} className="relative">
        <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Due Date
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            readOnly
            onClick={() => setShowCalendar((s) => !s)}
            placeholder="Select a due date"
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm cursor-pointer"
          />
          <button type="button" onClick={() => setShowCalendar((s) => !s)} className="p-2 rounded-md bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            <Calendar size={18} />
          </button>
        </div>

        {showCalendar && (
          <div className="absolute left-0 mt-2 z-50 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <button type="button" onClick={() => setCalendarMonth(m => ({ year: m.month === 0 ? m.year - 1 : m.year, month: m.month === 0 ? 11 : m.month - 1 }))} className="p-1">
                <ChevronLeft size={18} />
              </button>
              <div className="text-sm font-medium">
                {new Date(calendarMonth.year, calendarMonth.month).toLocaleString(undefined, { month: 'long', year: 'numeric' })}
              </div>
              <button type="button" onClick={() => setCalendarMonth(m => ({ year: m.month === 11 ? m.year + 1 : m.year, month: m.month === 11 ? 0 : m.month + 1 }))} className="p-1">
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-xs text-slate-500 dark:text-slate-400 mb-1">
              {['S','M','T','W','T','F','S'].map(d => (
                <div key={d} className="text-center">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {(() => {
                const days = [];
                const firstDay = new Date(calendarMonth.year, calendarMonth.month, 1).getDay();
                const daysInMonth = new Date(calendarMonth.year, calendarMonth.month + 1, 0).getDate();
                for (let i = 0; i < firstDay; i++) days.push(null);
                for (let d = 1; d <= daysInMonth; d++) days.push(d);
                return days.map((day, idx) => {
                  if (!day) return <div key={idx} />;
                  const iso = new Date(calendarMonth.year, calendarMonth.month, day).toISOString().slice(0,10);
                  const isSelected = formData.dueDate === iso;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => { setFormData(prev => ({ ...prev, dueDate: iso })); setShowCalendar(false); }}
                      className={`h-8 w-8 flex items-center justify-center rounded-full text-sm ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    >
                      {day}
                    </button>
                  );
                });
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Priority Badge Preview */}
      <div className={`p-3 rounded-lg border ${priorityColors[formData.priority]}`}>
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityBadgeColors[formData.priority]}`}>
            {formData.priority} Priority
          </span>
          {formData.category && (
            <span className="text-xs text-slate-600 dark:text-slate-400">
              in {formData.category}
            </span>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-2">
          <AlertCircle size={18} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
      >
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;

 