import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommentListComponent } from '../comments/comment-list/comment-list.component';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    postData: any = {};
    allPosts: any = {};
    tags: string[] = [];
    pos = 0;
    updatePage: any = {};
    @ViewChild('commentList') commentList!: CommentListComponent;

    constructor(private postService: PostService, private router: Router, public authService: AuthService) { }

    ngOnInit(): void {
        this.postService.getAllPosts().subscribe((response: any) => {
            this.allPosts = response;
            response.map((r: any) => {
                r.slug = this.postService.slugify(r.title);
            });
            this.pos = this.getPostIndex(this.allPosts);
        });
    }

    getPostIndex(allPosts: any) {
        allPosts.map((d: any) => {
            d.slug = this.postService.slugify(d.title);
        });

        // get the location of the current URLs path
        const slug = window.location.pathname.substr(6);

        this.postService.getPost(slug).subscribe((response: any) => {
            this.postData = response;
            this.tags = response.tags;
            this.pos = allPosts.map((p: any) => p.slug).indexOf(response.slug);
        });

        return this.pos;
    }

    nextPost(posts: any) {
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

    prevPost(posts: any) {
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
