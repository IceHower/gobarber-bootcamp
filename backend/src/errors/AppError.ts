export default class Error {
    public readonly message: string;
    public readonly statusCode: number


    //Seta a mensagem e o statusCode Atraves do constructor
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
