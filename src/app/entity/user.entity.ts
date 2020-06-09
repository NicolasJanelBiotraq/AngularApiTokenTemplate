export class User {
        username: string;
        email: string;

        // non renvoyé par l'API et n'est pas inclue dans le PUT ou le POST
        password?:string;
}
