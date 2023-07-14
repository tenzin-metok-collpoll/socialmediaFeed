package com.example.socialMediaFeed.controllers;
import com.example.socialMediaFeed.models.Answer;
import com.example.socialMediaFeed.services.AnswerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/answers")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class AnswerController {
    
    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
      this.answerService = answerService;
    }
    @GetMapping("/")
  public ResponseEntity<List<Answer>> getAllAnswer() {
    List<Answer> list = answerService.getAllAnswer();
    if (list.size() <= 0) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    return ResponseEntity.of(Optional.of(list));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getAnswerById(@PathVariable int id) {
    if (id <= 0) {
      // Return invalid ID response
      return ResponseEntity.badRequest().body("Invalid ID");
    }

    try {
      Answer answer= answerService.getAnswerById(id);
      return ResponseEntity.ok(answer);
    } catch (Exception e) {
      // Handle the exception when the post is not found
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
    }
  }
  @PostMapping("/")
  public Answer createAnswer(@RequestBody(required = false) Answer answer) {

    // try {
    //   if (answer == null) {
    //     throw new IllegalArgumentException("Request body is missing.");
    //   }
      Answer response = answerService.createAnswer(answer);
      return response;
    // } catch (IllegalArgumentException e) {
      // return ResponseEntity.badRequest().body(e.getMessage());
    // } catch (Exception e) {
      // e.printStackTrace();
      // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    // }
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteAnswer(@PathVariable("id") int id) {
    if (id <= 0) {
      // Return invalid ID response
      return ResponseEntity.badRequest().body("Invalid ID");
    }
    try {
      answerService.deleteAnswer(id);
      return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Comment with ID " + id + " deleted successfully.");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the post.");
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Answer> updateAnswer(@RequestBody Answer answer, @PathVariable("id") int id) {

    try {
      answer.setId(id);
      this.answerService.updateAnswer(answer);
      return ResponseEntity.ok().body(answer);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}


