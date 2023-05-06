import {environment} from "../environments/environment";

export const endpoints = {
    "prod": {
        "post": `${environment.backendUrl}/functions/post`,
        "postsMetadata": `${environment.backendUrl}/functions/metadata`,
        "recentPosts": `${environment.backendUrl}/functions/recent`,
        "postsByTag": `${environment.backendUrl}/functions/tagged`
    },
    "lambda-dev": {
        "post": `${environment.backendUrl}/functions/app/blog/`,
        "recentPosts": `${environment.backendUrl}/functions/app/recent`,
        "postsMetadata": `${environment.backendUrl}/functions/app/blog`,
        "postsByTag": `${environment.backendUrl}/functions/app/blog/topics`
    },
    "express-dev": {
        "post": `${environment.backendUrl}/blog/`,
        "recentPosts": `${environment.backendUrl}/recent`,
        "postsByTag": `${environment.backendUrl}/blog/topics`
    }
};
