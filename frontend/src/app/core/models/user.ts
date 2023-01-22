export interface User {
    _id: string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    role: string[];
    token: string
    updatedAt: Date;
    createdAt: Date;
}
