import { User } from "src/app/core/models/user";

export interface Post {
    _id: string;
    title: string;
    tags: string;
    description: string;
    createdBy: User;
}
