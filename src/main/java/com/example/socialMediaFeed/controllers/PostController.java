package com.example.socialMediaFeed.controllers;


import com.example.socialMediaFeed.models.Post;
import com.example.socialMediaFeed.services.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class PostController {

  private final PostService postService;


  @Autowired
  public PostController(PostService postService) {
    this.postService = postService;
  }

  @GetMapping("/")

  public ResponseEntity<List<Post>> getAllPosts() {
    List<Post> list = postService.getAllPost();
    // System.out.println("----"+list);
    if (list.size() <= 0) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    return ResponseEntity.status(HttpStatus.OK).body(list);
  }



    @GetMapping("/{id}")
 public ResponseEntity<?> getPostById(@PathVariable int id) {
    if (id <= 0) {
        // Return invalid ID response
        return ResponseEntity.badRequest().body("Invalid ID");
    }

    try {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(post);
    } catch (Exception e) {
        // Handle the exception when the post is not found
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
    }
}
 @PostMapping("/")

public ResponseEntity<?> createPost(@RequestBody(required = false) Post post) {
    try {
        if (post == null) {
            throw new IllegalArgumentException("Request body is missing.");
        }
 
        ResponseEntity<?>response = postService.createPost(post);
        return response;
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}


  @DeleteMapping("/{id}")

public ResponseEntity<String> deletePost(@PathVariable("id") int id) {
  if (id <= 0) {
        // Return invalid ID response
        return ResponseEntity.badRequest().body("Invalid ID");
    }
    try {
        postService.deletePost(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Post with ID " + id + " deleted successfully.");
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the post.");
    }
}




 
@PutMapping("/{id}")
public ResponseEntity<?> updatePost(@RequestBody Post post, @PathVariable("id") int id) {
  if (id <= 0) {
        // Return invalid ID response
        return ResponseEntity.badRequest().body("Invalid ID");
    }
    try {
        post.setId(id);
        this.postService.updatePost(post);
        return ResponseEntity.ok().body(post);
    } catch (NotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}

}
