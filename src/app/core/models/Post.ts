import { Client } from "./Client";

export class Post {
    idPost: number;
    content: string;
    createdAt?: Date;
    likes: number;
    dislikes: number;
    comments?: Comment[]; // Assuming you have a Comment model
    user?: Client; // Assuming you have a User model
    isLiked: boolean;
    isDisliked: boolean;
  }