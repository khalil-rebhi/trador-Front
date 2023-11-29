import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../core/services/post.service';
import { Store } from '@ngrx/store';
import { Client } from '../core/models/Client';
import { Post } from '../core/models/Post';
import { User } from '../store/actions/user.action';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})


export class PostComponent {

  postForm: NgForm;
  idUser : number ;
  content : string ; 
  public user : Client;
  postContent: string = '';
  posts: Post[] = [];
  updatedContent: string = '';
  postIdToUpdate: number | null = null;
  postToUpdate: Post | null = null;
  showAlert: boolean = false;

  post: Post;
  isCommentFormVisible = false;
  newComment: string;


  @ViewChild('updatePostModal') updatePostModal: any;



  constructor(private store : Store<any> ,private postService: PostService, public modalService : NgbModal ) {
    this.store.subscribe(result => {this.user = result.user.user})
  }

  ngOnInit() {
    this.loadPosts();
  }

  createPost() {
  const idUser = this.user.idUser; // Replace with the actual user ID
  let post : Post = new Post();
  post.content = this.postContent;
    this.postService.createPost(idUser, post)
      .subscribe(
        response => {
          console.log('Post created successfully:', response);
          this.showAlert = true;
          this.loadPosts();
          // You can add any additional logic here, such as redirecting to a different page
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
        },
        error => {
          console.error('Error creating post:', error);
        }
      );
  }

  openUpdateModal(post: Post) {
    this.postToUpdate = { ...post };
    this.modalService.open(this.updatePostModal, { ariaLabelledBy: 'modal-basic-title' });
  }

  updatePost() {
    if (this.postToUpdate !== null && this.postToUpdate.idPost !== undefined) {
      this.postToUpdate.content = this.updatedContent;
      this.postService.updatePost(this.postToUpdate , this.postToUpdate.idPost )
        .subscribe(updatedPost => {
          console.log('Post updated successfully:', updatedPost);
          this.modalService.dismissAll();
        }, error => {
          console.error('Error updating post:', error);
        });
    }
  }
  

  loadPosts() {
    this.postService.getPosts().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
  
  toggleLike(post: Post) {
    if (post.isLiked) {
      // Unlike the post
      this.postService.unlikePost(post.idPost).subscribe(
        () => {
          post.isLiked = false;
          post.likes--; // Decrease the like count
        },
        (error) => {
          console.error('Error unliking post:', error);
          // Handle error if needed
        }
      );
    } else {
      // Like the post
      this.postService.likePost(post.idPost).subscribe(
        () => {
          post.isLiked = true;
          post.likes++; // Increase the like count
        },
        (error) => {
          console.error('Error liking post:', error);
          // Handle error if needed
        }
      );
    }
  }

  toggleDislike(post: Post) {
    if (post.isDisliked) {
      // Undislike the post
      this.postService.undislikePost(post.idPost).subscribe(
        () => {
          post.isDisliked = false;
          post.dislikes--; // Decrease the dislike count
        },
        (error) => {
          console.error('Error undisliking post:', error);
          // Handle error if needed
        }
      );
    } else {
      // Dislike the post
      this.postService.dislikePost(post.idPost).subscribe(
        () => {
          post.isDisliked = true;
          post.dislikes++; // Increase the dislike count
        },
        (error) => {
          console.error('Error disliking post:', error);
          // Handle error if needed
        }
      );
    }
  }

 /*toggleCommentForm() {
    this.isCommentFormVisible = !this.isCommentFormVisible;
  }

  submitComment() {
    // Assuming you have the current user's id stored in a variable like currentUserId
    const userId = currentUserId; // Replace this with your actual logic to get the user id
    
    this.postService.commentPost(userId, this.post.idPost, { idUser: userId, content: this.newComment }).subscribe(
      (updatedPost) => {
        this.post = updatedPost;
        this.newComment = ''; // Clear the comment input
        this.isCommentFormVisible = false; // Hide the comment form
      },
      (error) => {
        console.error('Error commenting on post:', error);
        // Handle error if needed
      }
    );
  }*/


}
