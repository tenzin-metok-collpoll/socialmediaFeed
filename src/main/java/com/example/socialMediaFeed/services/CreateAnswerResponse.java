package com.example.socialMediaFeed.services;

public class CreateAnswerResponse {
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

  

    public CreateAnswerResponse(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return (message);
    }
}
