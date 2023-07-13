package com.example.socialMediaFeed.controllers;

import com.example.socialMediaFeed.models.Option;
import com.example.socialMediaFeed.services.OptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/options")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class OptionController {

  private final OptionService optionService;

  public OptionController(OptionService optionService) {
    this.optionService = optionService;
  }

  @GetMapping("/")
  public ResponseEntity<List<Option>> getAllOption() {
    List<Option> list = optionService.getAllOption();
    if (list.size() <= 0) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    return ResponseEntity.of(Optional.of(list));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getOptionById(@PathVariable int id) {
    if (id <= 0) {
      // Return invalid ID response
      return ResponseEntity.badRequest().body("Invalid ID");
    }

    try {
      Option option = optionService.getOptionById(id);
      return ResponseEntity.ok(option);
    } catch (Exception e) {
      // Handle the exception when the post is not found
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
    }
  }

  
   @GetMapping("byId/{id}")
  public Option[] findByQuestionId(@PathVariable int id) {

      Option[] option = optionService.findByQuestionId(id);
      return option;
   
  }

  @PostMapping("/")
  public ResponseEntity<?> createOption(@RequestBody(required = false) Option option) {
    try {
      if (option == null) {
        throw new IllegalArgumentException("Request body is missing.");
      }

      ResponseEntity<?> response = optionService.createOption(option);
      return response;
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

    @PostMapping("/bulk")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
  public ResponseEntity<?> createOptionInBulk(@RequestBody(required = false) List<Option> option) {
    try {
      if (option == null) {
        throw new IllegalArgumentException("Request body is missing.");
      }

      ResponseEntity<?> response = optionService.createOptionInBulk(option);
      return response;
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteOption(@PathVariable("id") int id) {
    if (id <= 0) {
      // Return invalid ID response
      return ResponseEntity.badRequest().body("Invalid ID");
    }
    try {
      optionService.deleteOption(id);
      return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Option with ID " + id + " deleted successfully.");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the post.");
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Option> updateOption(@RequestBody Option option, @PathVariable("id") int id) {

    try {
      option.setId(id);
      this.optionService.updateOption(option);
      return ResponseEntity.ok().body(option);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
