import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnChanges {
  @Input() postId!: number;
  comments: any[] = [];

  constructor(
    private commentService: CommentService,
    public authService: AuthService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postId'] && this.postId) {
      this.loadComments();
    }
  }

  loadComments(): void {
    this.commentService.getComments(this.postId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  canDelete(comment: any): boolean {
    if (!this.authService.isLoggedIn()) return false;
    const user = this.authService.getUser();
    if (!user) return false;
    return user.id === comment.author?.id || this.authService.isAdmin();
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(this.postId, commentId).subscribe(() => {
      this.loadComments();
    });
  }
}
