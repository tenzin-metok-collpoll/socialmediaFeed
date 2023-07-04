package com.example.socialMediaFeed.services;
import com.example.socialMediaFeed.models.Comment;
import com.example.socialMediaFeed.models.Post;
import com.example.socialMediaFeed.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
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
   public ResponseEntity<String> createComment(Comment comment) {
    try {
        // Check required fields
        if (comment.getDescription() == null || comment.getUser_name() == null || comment.getTime_stamp() == null || comment.getPost_id()==null) {
            throw new IllegalArgumentException("Description, user_name, and time_stamp are required fields.");
        }

        Comment savedComment = commentRepository.save(comment);
        return ResponseEntity.ok("comment saved successfully.");
    } catch (IllegalArgumentException e) {
        // Handle missing required fields
        return ResponseEntity.badRequest().body("Missing required fields: Description, user_name, and posted_time are required.");
    } catch (Exception e) {
        // Handle other exceptions
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the post.");
    }
}

    @Override
    public Comment updateComment(Comment comment) {
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
