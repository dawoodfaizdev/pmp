class ApiError extends Error {
    constructor(
        message = "Something went wrong",
        status = 500,
        errors = [],
        trace = null,
    ) {
        super(message);
        this.status = status;
        this.data = null;
        this.success = false;
        this.errors = errors;

        this.trace = trace
            ? trace
            : Error.captureStackTrace(this, this.constructor);
    }
}

export { ApiError };
