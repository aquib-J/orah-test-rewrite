class HttpException extends Error{
    public status: number;
    public message: string;

    // TODO: scope for adding error stack for the entire error stack trace
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default HttpException;