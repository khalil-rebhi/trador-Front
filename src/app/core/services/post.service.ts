import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, catchError, tap , of} from 'rxjs';
import { Client } from '../models/Client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

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

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>("http://localhost:8089/trador/post/show");
  }

  getPostById(idPost: number): Observable<Post> {
    return this.http.get<Post>("http://localhost:8089/trador/post/show"+idPost);
  }

  
  createPost(idUser : number, post: Post) {
    return this.http.post("http://localhost:8089/trador/post/create/"+idUser , post);
  }
  
  updatePost(post: Post, idPost : number): Observable<Post> {
    return this.http.put<Post>("http://localhost:8089/trador/post/update/"+idPost , post);
  }

  deletePost(idPost : number): Observable<Post> {
    return this.http.delete<Post>("http://localhost:8089/trador/post/delete/"+idPost );
  }

  likePost(idPost: number): Observable<Post> {
    return this.http.post<Post>("http://localhost:8089/trador/post/like/"+idPost , null);
  }

  dislikePost(idPost: number): Observable<Post> {
    return this.http.post<Post>("http://localhost:8089/trador/post/dislike/"+idPost, null);
  }

  unlikePost(idPost: number): Observable<Post> {
    return this.http.post<Post>("http://localhost:8089/trador/post/unlike/"+idPost , null);
  }

  undislikePost(idPost: number): Observable<Post> {
    return this.http.post<Post>("http://localhost:8089/trador/post/undislike/"+idPost, null);
  }

  commentPost(idUser : number , idPost: number , comment: Comment): Observable<Post> {
    return this.http.post<Post>(`http://localhost:8089/trador/post/comment/${idUser}/${idPost}`, comment);
  }
}
