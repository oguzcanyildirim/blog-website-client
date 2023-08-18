import {environment} from '../environments/environment';

export const endpoints = {
    'prod': {
        'post': `${environment.apiBaseUrl}/functions/post`,
        'postsMetadata': `${environment.apiBaseUrl}/functions/metadata`,
        'recentPosts': `${environment.apiBaseUrl}/functions/recent`,
        'postsByTag': `${environment.apiBaseUrl}/functions/tagged`
    },
    'lambda-dev': {
        'post': `${environment.apiBaseUrl}/functions/app/blog/`,
        'recentPosts': `${environment.apiBaseUrl}/functions/app/recent`,
        'postsMetadata': `${environment.apiBaseUrl}/functions/app/blog`,
        'postsByTag': `${environment.apiBaseUrl}/functions/app/blog/topics`
    },
    'express-dev': {
        'post': `${environment.apiBaseUrl}/blog/`,
        'recentPosts': `${environment.apiBaseUrl}/recent`,
        'postsByTag': `${environment.apiBaseUrl}/blog/topics`
    }
};
