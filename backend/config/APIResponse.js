class APIResponse {
    constructor(success, status, message, data, metaData) {
        this.success = success;
        this.status = status;
        this.message = message;
        this.data = data;
        this.metaData = metaData;
    }

    static fetched(msg, data, metaData) {
        return new APIResponse(true, 200, msg, data, metaData);
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
