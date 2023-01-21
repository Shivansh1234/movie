import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Post } from '../../models/post';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post$: Observable<ApiResponse<Post>> = new Observable<ApiResponse<Post>>;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute
  ) { }

  getPostDetail(): void {
    const postId = this.route.snapshot.paramMap.get('id') as string;
    this.post$ = this.authorService.getPostDetailRequest(postId);
  }

  ngOnInit(): void {
    this.getPostDetail();
  }

}
