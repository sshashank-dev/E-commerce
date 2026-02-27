// Handle 404 Not Found errors
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// General error handler
export const errorHandler = (err, req, res, next) => {
    // If the status code is 200, it means an error occurred without a specific error code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        // Show stack trace only in development mode
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};