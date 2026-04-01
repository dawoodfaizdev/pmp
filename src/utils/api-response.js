class ApiResponse {
    constructor(message, status = 200, data = null) {
        this.message = message;
        this.status = status;
        this.data = data;
        this.success = status < 400;
    }
}

export { ApiResponse };
