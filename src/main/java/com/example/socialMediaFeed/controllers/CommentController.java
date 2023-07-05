package com.example.socialMediaFeed.controllers;

import com.example.socialMediaFeed.models.Comment;
import com.example.socialMediaFeed.models.Post;
import com.example.socialMediaFeed.services.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class CommentController {

  private final CommentService commentService;

  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @GetMapping("/")
  public ResponseEntity<List<Comment>> getAllComment() {
    List<Comment> list = commentService.getAllComment();
    if (list.size() <= 0) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    return ResponseEntity.of(Optional.of(list));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getCommentById(@PathVariable int id) {
    if (id <= 0) {
      // Return invalid ID response
      return ResponseEntity.badRequest().body("Invalid ID");
    }

    try {
      Comment comment = commentService.getCommentById(id);
      return ResponseEntity.ok(comment);
    } catch (Exception e) {
      // Handle the exception when the post is not found
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
    }
  }

  @PostMapping("/")
  public ResponseEntity<?> createComment(@RequestBody(required = false) Comment comment) {
    try {
      if (comment == null) {
        throw new IllegalArgumentException("Request body is missing.");
      }

      ResponseEntity<?> response = commentService.createComment(comment);
      return response;
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteComment(@PathVariable("id") int id) {
    if (id <= 0) {
      // Return invalid ID response
      return ResponseEntity.badRequest().body("Invalid ID");
    }
    try {
      commentService.deleteComment(id);
      return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Comment with ID " + id + " deleted successfully.");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the post.");
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Comment> updateComment(@RequestBody Comment comment, @PathVariable("id") int id) {

    try {
      comment.setId(id);
      this.commentService.updateComment(comment);
      return ResponseEntity.ok().body(comment);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
