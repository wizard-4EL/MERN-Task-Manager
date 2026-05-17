const Task = require('../models/Task');

// Get all tasks for a user
exports.getTasks = async (req, res, next) => {
  try {
    const { category, status } = req.query;
    const filter = { user: req.user.id };

    if (category) filter.category = category;
    if (status) {
      filter.status = status === 'Pending' ? { $in: ['Pending', 'Not Started'] } : status;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

// Get single task
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

// Create task
exports.createTask = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: 'Request body is empty. Send JSON using Content-Type: application/json and include a title field.',
      });
    }

    const { title, description, category, dueDate, priority } = req.body;
    const trimmedTitle = typeof title === 'string' ? title.trim() : title;

    if (!trimmedTitle) {
      return res.status(400).json({ message: 'Title is required and must be a non-empty string.' });
    }

    const task = new Task({
      user: req.user.id,
      title: trimmedTitle,
      description,
      category,
      dueDate,
      priority,
    });

    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    next(error);
  }
};

// Update task
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    next(error);
  }
};

// Delete task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
