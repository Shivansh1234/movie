import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ApiError } from 'src/app/core/models/api-error';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

import { ApiResponse } from '../../../core/models/api-response';
import { Post } from '../../models/post';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {

  postList: Post[] = [];

  constructor(
    private authorService: AuthorService,
    private snackbarService: SnackbarService
  ) { }

  getAuthorPosts(): void {
    this.authorService.getPostsRequest()
      .pipe(
        take(1)
      )
      .subscribe({
        next: (postListData: ApiResponse<Post[]>) => {
          this.postList = postListData.data;
        },
        error: (err: ApiError) => {
          this.snackbarService.errorSnackbar(err.message);
        }
      });
  }

  deletePost(postId: string): void {
    this.authorService.deletePostRequest(postId)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (postDeleteData: ApiResponse<void>) => {
          this.snackbarService.successSnackbar(postDeleteData.message);
          this.getAuthorPosts();
        },
        error: (postDeleteErr: ApiError) => {
          this.snackbarService.errorSnackbar(postDeleteErr.message);
        }
      });
  }

  ngOnInit(): void {
    this.getAuthorPosts();
  }

}
