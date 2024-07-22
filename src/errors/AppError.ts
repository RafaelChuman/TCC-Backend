export class AppError{
    /**
     * readonly message: string;
     */
    public readonly message: string;
        
    public readonly statusCode: number;

    constructor(message: string, status = 400){
        this.message = message;
        this.statusCode = status;
    }
}