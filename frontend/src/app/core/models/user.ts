export interface User {
    id?: string;
    fname: string;
    lname: string;
    email: string;
    password?: string;
    token?: string
    createdAt?: Date;
}
