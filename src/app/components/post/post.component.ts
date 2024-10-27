import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommentListComponent } from '../comments/comment-list/comment-list.component';
import { Post } from 'src/app/entities/post';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    postData: Post = {} as Post;
    allPosts: Post[] = [];
    tags: string[] = [];
    pos = 0;
    @ViewChild('commentList') commentList!: CommentListComponent;

    constructor(
        private postService: PostService,
        private router: Router,
        private route: ActivatedRoute,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.postService.getAllPosts().subscribe((response: Post[]) => {
            this.allPosts = response;
            response.map((r: Post) => {
                r.slug = this.postService.slugify(r.title);
            });
            this.pos = this.getPostIndex(this.allPosts);
        });
    }

    getPostIndex(allPosts: Post[]) {
        allPosts.map((d: Post) => {
            d.slug = this.postService.slugify(d.title);
        });

        const slug = this.route.snapshot.params['post'];

        this.postService.getPost(slug).subscribe((response: any) => {
            this.postData = response;
            this.tags = response.tags.map((t: any) => t.name);
            this.pos = allPosts.map((p: Post) => p.slug).indexOf(response.slug);
        });

        return this.pos;
    }

    nextPost(posts: Post[]) {
        const index = this.pos;
        const p = index + 1 >= posts.length ? posts[0] : posts[index + 1];
        this.postService.getPost(p.slug).subscribe(response => {
            this.postData = response;
            if (this.pos >= posts.length - 1) {
                this.pos = 0;
            } else {
                this.pos += 1;
            }
        });
        this.router.navigate([`/blog/${p.slug}`]);
    }

    prevPost(posts: Post[]) {
        const index = this.pos;
        const p = index - 1 < 0 ? posts[posts.length - 1] : posts[index - 1];
        this.postService.getPost(p.slug).subscribe(response => {
            this.postData = response;
            if (this.pos <= 0) {
                this.pos = posts.length - 1;
            } else {
                this.pos -= 1;
            }
        });
        this.router.navigate([`/blog/${p.slug}`]);
    }

    onCommentAdded(): void {
        this.commentList.loadComments();
    }

}
