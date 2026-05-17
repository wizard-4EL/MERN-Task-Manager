import React, { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, LogOut, Plus } from 'lucide-react';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import useTask from '../hooks/useTask';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { tasks, getTasks, loading, error } = useTask();
  const { user, logout } = useAuth();
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    getTasks(filterCategory, filterStatus);
  }, [filterCategory, filterStatus, getTasks]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const filteredTasks = tasks.filter(task => {
    if (filterCategory && task.category !== filterCategory) return false;
    if (filterStatus && task.status !== filterStatus) return false;
    return true;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    pending: tasks.filter(t => t.status !== 'Completed').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                T
              </div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">TaskFlow</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-400"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-full lg:w-80' : 'w-0 lg:w-80'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto transition-all duration-300 ${!sidebarOpen ? 'hidden lg:block' : ''}`}>
          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Welcome back</p>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {user?.name || 'User'}
              </h2>
            </div>

            {/* Quick Stats */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Stats</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Total Tasks</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{taskStats.total}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Completed</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">{taskStats.completed}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Pending</span>
                  <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{taskStats.pending}</span>
                </div>
              </div>
            </div>

            {/* Create Task Button */}
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              <Plus size={20} />
              New Task
            </button>

            {/* Task Form */}
            {showTaskForm && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <TaskForm
                  onTaskCreated={() => {
                    getTasks(filterCategory, filterStatus);
                    setShowTaskForm(false);
                  }}
                />
              </div>
            )}

            {/* Filters */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Filters</h3>
              
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {(filterCategory || filterStatus) && (
                <button
                  onClick={() => {
                    setFilterCategory('');
                    setFilterStatus('');
                  }}
                  className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your Tasks</h2>
              <p className="text-slate-600 dark:text-slate-400">
                {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} {filterCategory && `in ${filterCategory}`}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Tasks List */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                  <Plus size={32} className="text-slate-400 dark:text-slate-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No tasks yet</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Create your first task to get started</p>
                <button
                  onClick={() => setShowTaskForm(!showTaskForm)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Create Task
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map(task => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onUpdated={() => getTasks(filterCategory, filterStatus)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;


