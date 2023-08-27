import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { throwError, of } from 'rxjs';

import { PostService } from './post.service';
import { environment } from '../../environments/environment';

describe('PostService', () => {
  let postService: PostService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });

    postService = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(postService).toBeTruthy();
  });

  it('should fetch a single post by slug', () => {
    const slug = 'sample-post';
    const mockPost = { title: 'Sample Post', content: 'Sample content.' };

    postService.getPost(slug).subscribe((data) => {
      expect(data).toEqual(mockPost);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/post?name=${slug}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPost);
  });

  it('should handle errors while fetching a post', () => {
    const slug = 'non-existent-post';

    postService.getPost(slug).subscribe(() => fail('Should have failed with an error'),
      (error) => {
        expect(error).toContain('Failed to fetch post.');
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/post?name=${slug}`);
    req.error(new ErrorEvent('Network error'));
  });

  it('should fetch recent posts', () => {
    const mockRecentPosts = [{ title: 'Post 1' }, { title: 'Post 2' }];

    postService.getRecentPosts().subscribe((data) => {
      expect(data).toEqual(mockRecentPosts);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/recentPosts`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockRecentPosts);
  });

  it('should handle errors while fetching recent posts', () => {
    postService.getRecentPosts().subscribe(() => fail('Should have failed with an error'),
      (error) => {
        expect(error).toContain('Failed to fetch recent posts.');
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/recentPosts`);
    req.error(new ErrorEvent('Network error'));
  });

  it('should fetch all posts\' metadata', () => {
    const mockPostsMetadata = [{ title: 'Post 1' }, { title: 'Post 2' }];

    postService.getAllPosts().subscribe((data) => {
      expect(data).toEqual(mockPostsMetadata);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/postsMetadata`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPostsMetadata);
  });

  it('should handle errors while fetching all post metadata', () => {
    postService.getAllPosts().subscribe(
      () => fail('Should have failed with an error'),
      (error) => {
        expect(error).toContain('Failed to fetch all posts.');
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/postsMetadata`);
    req.error(new ErrorEvent('Network error'));
  });

  it('should fetch posts by tag', () => {
    const tag = 'angular';
    const mockPostsByTag = [{ title: 'Post 1' }, { title: 'Post 2' }];

    postService.getPostsByTag(tag).subscribe((data) => {
      expect(data).toEqual(mockPostsByTag);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/postsByTag?tag=${tag}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPostsByTag);
  });

  it('should handle errors while fetching posts by tag', () => {
    const tag = 'angular';

    postService.getPostsByTag(tag).subscribe(
      () => fail('Should have failed with an error'),
      (error) => {
        expect(error).toContain('Failed to fetch posts by tag.');
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/postsByTag?tag=${tag}`);
    req.error(new ErrorEvent('Network error'));
  });

  it('should create a slug from a string', () => {
    const inputString = 'Test String';
    const expectedSlug = 'test-string';

    const slug = postService.slugify(inputString);

    expect(slug).toEqual(expectedSlug);
  });
});
