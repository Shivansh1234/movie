import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ApiError } from 'src/app/core/models/api-error';
import { ApiResponse } from 'src/app/core/models/api-response';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Post } from '../../models/post';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: Post = {} as Post;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) { }

  getPostDetail(): void {
    const postId = this.route.snapshot.paramMap.get('id') as string;
    this.authorService.getPostDetailRequest(postId)
    .pipe(
      take(1)
    )
    .subscribe({
      next: (postDetailData: ApiResponse<Post>) => {
        this.post = postDetailData.data;
      },
      error: (err: ApiError) => {
        this.snackbarService.errorSnackbar(err.message);
      }
    });
  }

  ngOnInit(): void {
    this.getPostDetail();
  }

}
