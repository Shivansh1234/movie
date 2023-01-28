import { Post } from "src/app/author/models/post";

export interface User {
    _id: string;
    fname: string;
    lname: string;
    email: string;
    posts: Post[] | string[];
    password: string;
    role: string[];
    token: string
    updatedAt: Date;
    createdAt: Date;
}
