package com.example.socialMediaFeed.services;

public class CreatePostResponse {
    private String message;

    public CreatePostResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
