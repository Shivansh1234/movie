export interface User {
    _id: string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    isAdmin: boolean;
    token: string
    updatedAt: Date;
    createdAt: Date;
}
