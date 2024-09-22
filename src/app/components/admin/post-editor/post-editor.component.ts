import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {

  title = '';
  content = '';
  preview = '';
  tags = '';
  isEditMode = false;
  postId: number | null = null;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.postId = +id;
      this.postService.getPostById(this.postId).subscribe({
        next: (post) => {
          this.title = post.title;
          this.content = post.content || '';
          this.preview = post.preview || '';
          this.tags = post.tags ? post.tags.map((t: any) => t.name).join(', ') : '';
        },
        error: (err) => {
          console.error('Error loading post:', err);
        }
      });
    }
  }

  onSave(): void {
    const postData = {
      title: this.title,
      content: this.content,
      preview: this.preview,
      tags: this.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    if (this.isEditMode && this.postId) {
      this.postService.updatePost(this.postId, postData).subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.error('Error updating post:', err);
        }
      });
    } else {
      this.postService.createPost(postData).subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.error('Error creating post:', err);
        }
      });
    }
  }
}
