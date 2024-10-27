import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  @Input() postId!: number;
  @Output() commentAdded = new EventEmitter<void>();
  content = '';

  constructor(private commentService: CommentService) { }

  submit(): void {
    if (!this.content.trim()) return;
    this.commentService.addComment(this.postId, this.content).subscribe(() => {
      this.content = '';
      this.commentAdded.emit();
    });
  }
}
