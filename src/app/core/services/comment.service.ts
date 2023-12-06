import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, catchError, tap , of} from 'rxjs';
import { Client } from '../models/Client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/Comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  host :string = 'http://localhost:8089';
  public isLoggedin$ : ReplaySubject<boolean> = new ReplaySubject(1);
  public user$: BehaviorSubject<Client | null> = new BehaviorSubject<Client |null>(null);
  private accessToken: string;
  private httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
  };
  constructor(private http: HttpClient) {}
  
  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>("http://localhost:8089/trador/comment/show");
  }

  getCommentsByPost(idPost: number): Observable<Comment[]> {
    return this.http.get<Comment[]>("http://localhost:8089/trador/post/"+idPost);
  }

  getCommentById(idComment: number): Observable<Comment> {
    return this.http.get<Comment>("http://localhost:8089/trador/comment/show/"+idComment);
  }

  likeComment(idComment: number): Observable<Comment> {
    return this.http.post<Comment>("http://localhost:8089/trador/comment/like/"+idComment , null);
  }

  dislikeComment(idComment: number): Observable<Comment> {
    return this.http.post<Comment>("http://localhost:8089/trador/comment/dislike/"+idComment, null);
  }

  createReply(parentId: number, reply: Comment): Observable<Comment> {
    return this.http.post<Comment>("http://localhost:8089/trador/comment/post/"+parentId,reply);
  }

  getRepliesByCommentId(idComment: number): Observable<Comment[]> {
    return this.http.get<Comment[]>("http://localhost:8089/trador/comment/replies/"+idComment);
  }
}
