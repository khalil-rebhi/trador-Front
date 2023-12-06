import { Client } from "./Client";
import { Post } from "./Post";

export class Comment {
    idComment: number;
    content: string;
    createdAt: Date;
    likes: number;
    dislikes: number;
    parentComment: Comment;
    replies: Comment[];
    post: Post; // Assuming you have a Post class
    user: Client; // Assuming you have a User class
}
