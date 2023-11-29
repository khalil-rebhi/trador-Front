export class Comment {
    idComment: number;
    idUser: number;
    content: string;
    likes: number;
    dislikes: number;
    parentComment: Comment | null;
    replies: Comment[];
}
