import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/entities/post';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

    postsWithTag: Post[] = [];
    tag = '';

    constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.tag = this.route.snapshot.params['tag'];
        this.postService.getPostsByTag(this.tag).subscribe((response: Post[]) => {
            response.forEach((r: Post) => {
                r.slug = this.postService.slugify(r.title);
            });
            this.postsWithTag = response;
        });
    }

    clear() {
        this.router.navigate(['/blog']);
    }

    slugify(title: string) {
        return this.postService.slugify(title);
    }

    refresh(tag: string) {
        this.postService.getPostsByTag(tag).subscribe((response: Post[]) => {
            response.map((r: Post) => {
                r.slug = this.slugify(r.title);
            });
            this.postsWithTag = response;
        });
        this.tag = tag;
    }

}
