import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../shared/services/http-service/http.service';
import { API_REQUESTS } from 'src/app/shared/constants/api.constants';
import { IEditComment } from '../models/edit-comment.model';
import { IPost } from '../models/post.model';


@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(private http: HttpService) {
  }

  // Post Lists
  getPosts(take?: number, skip?: number): Observable<Array<IPost>> {
    const query = {
      take: String(take),
      skip: String(skip),
    };

    return this.http.get(`${API_REQUESTS.posts.all}`, query);
  }

  getPrivatePosts(take?: number, skip?: number): Observable<Array<IPost>> {
    const query = {
      take: String(take),
      skip: String(skip),
    };

    return this.http.get(`${API_REQUESTS.posts.private}`, query);
  }

  getPersonalPosts(userId: number, take?: number, skip?: number): Observable<Array<IPost>> {
    const query = {
      take: String(take),
      skip: String(skip),
    };

    return this.http.get(`${API_REQUESTS.posts.personal}${userId}/posts`, query);
  }

  // Likes
  like(id: number): Observable<IPost> {
    return this.http.post(`${API_REQUESTS.posts.like}${id}/votes`);
  }

  unlike(id: number): Observable<IPost> {
    return this.http.delete(`${API_REQUESTS.posts.like}${id}/votes`);
  }

  // Comments
  addComment(postId: number, content: string): Observable<IPost> {
    const comment = {
      content,
    };

    return this.http.post(`${API_REQUESTS.comments.add}${postId}`, comment);
  }

  editComment(commentId: number, content: string): Observable<IEditComment> {
    const comment = {
      content,
    };

    return this.http.patch(`${API_REQUESTS.comments.add}${commentId}`, comment);
  }

  deleteComment(commentId: number): Observable<IPost> {
    return this.http.delete(`${API_REQUESTS.comments.delete}${commentId}`);
  }

  // Posts
  createPost(post: any): Observable<IPost> {
    return this.http.post(`${API_REQUESTS.posts.create}`, post);
  }

  deletePost(postId: number): Observable<IPost> {
    return this.http.delete(`${API_REQUESTS.posts.specificPost}${postId}`);
  }

  getSinglePost(postId: number): Observable<IPost> {
    return this.http.get(`${API_REQUESTS.posts.specificPost}${postId}`);
  }

  editPostStatus(postId: number, isPublic: boolean): Observable<IPost> {
    return this.http.put(`${API_REQUESTS.posts.create}/${postId}/status`, { public: isPublic });
  }
}
