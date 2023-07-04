package com.example.socialMediaFeed.services;
import com.example.socialMediaFeed.models.Comment;
import com.example.socialMediaFeed.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{
        private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public Comment getCommentById(int id) {
        return commentRepository.findById(id);
    }

    @Override
    public List<Comment> getAllComment() {
        return commentRepository.findAll();
    }

    @Override
  public ResponseEntity<CreateCommentResponse>createComment(Comment comment) {
    try {
         comment.setTime_stamp(Timestamp.from(Instant.now()));

        // Check required fields
        if (comment.getDescription() == null || comment.getUser_name() == null || comment.getTime_stamp() == null) {
            throw new IllegalArgumentException("Description, user_name, and time_stamp are required fields.");
        }

        Comment savedComment = commentRepository.save(comment);
        CreateCommentResponse response = new CreateCommentResponse(savedComment, "Post saved successfully");
        return ResponseEntity.ok(response);
    } catch (IllegalArgumentException e) {
        // Handle missing required fields
        CreateCommentResponse response = new CreateCommentResponse(null, "Missing required fields: Description, user_name, and posted_time are required.");
        return ResponseEntity.badRequest().body(response);
    } catch (Exception e) {
        // Handle other exceptions
        CreateCommentResponse response = new CreateCommentResponse(null, "An error occurred while creating the post.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}

    @Override
    public Comment updateComment(Comment comment) {
        comment.setTime_stamp(Timestamp.from(Instant.now()));
        return commentRepository.update(comment);
    }

    @Override
   public void deleteComment(int id) {
    try {
        Comment existingComment = commentRepository.findById(id);
        if (existingComment== null) {
            throw new IllegalArgumentException("Comment with ID " + id + " does not exist.");
        }
        commentRepository.delete(id);
    } catch (EmptyResultDataAccessException e) {
        throw new IllegalArgumentException("Comment with ID " + id + " does not exist.");
    } catch (Exception e) {
        e.printStackTrace();
        throw e;
    }
}
}
