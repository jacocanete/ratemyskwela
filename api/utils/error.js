export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

// This allows you to handle specific error
// conditions in a granular way, and delegate
// the responsibility of sending the error response
// to the error-handling middleware. This keeps
// your controller actions clean and focused on
// their main task, and centralizes error handling
// in one place.
