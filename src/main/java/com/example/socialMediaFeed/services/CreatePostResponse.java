package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.Post;

public class CreatePostResponse {
    private Post post;
    private String message;

    public CreatePostResponse(Post post, String message) {
        this.post = post;
        this.message = message;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
