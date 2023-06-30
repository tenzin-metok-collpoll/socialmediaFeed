package com.example.socialMediaFeed.controllers;
import com.example.socialMediaFeed.models.Comment;
import com.example.socialMediaFeed.services.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comment")
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
  public Comment getCommentById(@PathVariable int id) {
    return commentService.getCommentById(id);
  }
  @PostMapping("/")
  public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
    Comment new_comment = null;
    try {
      new_comment = this.commentService.createComment(comment);
      return ResponseEntity.of(Optional.of(new_comment));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteComment(@PathVariable("id") int id) {
    try {
      commentService.deleteComment(id);
      return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
