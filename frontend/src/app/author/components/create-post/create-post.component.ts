import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { ApiError } from '../../../core/models/api-error';
import { ApiResponse } from '../../../core/models/api-response';
import { Post } from '../../models/post';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postForm!: FormGroup;

  constructor(
    private authorService: AuthorService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) { }

  initializePostForm(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createPost(): void {
    this.authorService.createPostRequest(this.postForm.value)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (postData: ApiResponse<Post>) => {
          this.snackbarService.successSnackbar(postData.message);
        },
        error: (err: ApiError) => {
          this.snackbarService.errorSnackbar(err.message);
        }
      });
  }

  ngOnInit(): void {
    this.initializePostForm();
  }
}
