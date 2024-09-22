import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  posts: any[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => {
        console.error('Error loading posts:', err);
      }
    });
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.loadPosts();
      },
      error: (err) => {
        console.error('Error deleting post:', err);
      }
    });
  }
}
