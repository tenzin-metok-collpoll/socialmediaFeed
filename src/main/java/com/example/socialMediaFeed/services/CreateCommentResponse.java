package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.Comment;

public class CreateCommentResponse {
    private Comment comment;
    private String message;
    public Comment getComment() {
        return comment;
    }
    public void setComment(Comment comment) {
        this.comment = comment;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public CreateCommentResponse(Comment comment, String message) {
        this.comment = comment;
        this.message = message;
    }

   
}
