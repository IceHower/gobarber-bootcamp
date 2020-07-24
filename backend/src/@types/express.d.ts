// ADICIONA uma informação nova pra tipagem do express, falando que o request tem um campo de user que tem um id.

declare namespace Express {
    export interface Request {
        user: {
            id: string
        }
    }
}


