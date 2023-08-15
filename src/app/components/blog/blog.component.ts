import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core'; 
 import { Post } from 'src/app/models/posts';
 import { ActivatedRoute } from '@angular/router';
 import { BlogService } from 'src/app/services/blog.service';
 import { Subject } from 'rxjs';
 import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  postData: Post = new Post();
  postId:any;
  private unsubscribe$ = new Subject<void>();
  constructor(private route: ActivatedRoute,
  private blogService: BlogService) {
  if (this.route.snapshot.params['id']) {
  this.postId = this.route.snapshot.paramMap.get('id');
  }
  }
  ngOnInit() {
    debugger
  this.blogService.getPostbyId(this.postId)
  .pipe(takeUntil(this.unsubscribe$))
  .subscribe(
  (result: any) => {
  this.postData = result;
  }
  );
  }
  ngOnDestroy() {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
  }

}
