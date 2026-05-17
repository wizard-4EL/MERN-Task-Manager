const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => {
      // Enum errors: provide allowed values
      if (e.kind === 'enum' || (e.message && e.message.includes('is not a valid enum value'))) {
        const allowed = e.properties && e.properties.enumValues ? e.properties.enumValues : [];
        const value = e.value !== undefined ? e.value : '';
        return `${e.path} '${value}' is invalid. Valid values: ${allowed.join(', ')}.`;
      }
      // Default to the message provided by the schema
      return e.message || `${e.path} is invalid`;
    });
    return res.status(400).json({ message: messages.join(' '), errors: messages });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid identifier provided' });
  }

  // Duplicate key
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ message: `${field} already exists` });
  }

  // Default error
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};

module.exports = errorHandler;
