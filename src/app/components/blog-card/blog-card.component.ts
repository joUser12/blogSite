import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Post } from 'src/app/models/posts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackbarService } from 'src/app/services/snackbar.service'
import { ActivatedRoute } from '@angular/router'

 import { AuthService } from 'src/app/services/auth.service';
 import { CommentService } from 'src/app/services/comment.service';
@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  config: any;
  pageSizeOptions:any = [];
  blogPost: Post[] = [];
  appUser:any;
  private unsubscribe$ = new Subject<void>();
  constructor(private blogService: BlogService,
    private commentService: CommentService,private route: ActivatedRoute,private snackBarService: SnackbarService,private authService: AuthService) { 
    this.pageSizeOptions = [2,5]
    const pageSize = localStorage.getItem('pageSize');
    this.config = {
    currentPage: 1,
    itemsPerPage: pageSize ? +pageSize : this.pageSizeOptions[0]
    };
  }


  ngOnInit(): void {
    this.getBlogPosts();
    this.route.params.subscribe(
      params => {
      this.config.currentPage = +params['pagenum'];
      this.getBlogPosts();
      }
      );

      this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }
  getBlogPosts() {
    debugger
    this.blogService.getAllPosts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.blogPost = result;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  delete(postId: string) {
    if (confirm('Are you sure')) {
    this.blogService.deletePost(postId).then(
    () => {
    this.snackBarService.showSnackBar('Blog post deleted successfully');
    this.commentService.deleteAllCommentForBlog(postId);

    }
    );
    }
    }
    // setPostFormData(postFormData:any) {
    //   this.postData.title = postFormData.title;
    //   this.postData.content = postFormData.content;
    //   }
}
