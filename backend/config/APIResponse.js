class APIResponse {
    constructor(success, code, message, response) {
        this.success = success;
        this.code = code;
        this.message = message;
        this.response = response;
    }

    static fetched(msg, data) {
        return new APIResponse(true, 200, msg, data);
    }

    static created(msg) {
        return new APIResponse(true, 201, msg);
    }

    static updated(msg) {
        return new APIResponse(true, 200, msg);
    }

    static deleted(msg) {
        return new APIResponse(true, 200, msg);
    }
}

module.exports = APIResponse;
