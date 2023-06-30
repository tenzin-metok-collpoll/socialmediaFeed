package com.example.socialMediaFeed.controllers;


import com.example.socialMediaFeed.models.Post;
import com.example.socialMediaFeed.services.PostService;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/post")
public class PostController {

  private final PostService postService;

  public PostController(PostService postService) {
    this.postService = postService;
  }

  @GetMapping("/")
  public ResponseEntity<List<Post>> getAllPosts() {
    List<Post> list = postService.getAllPost();
    if (list.size() <= 0) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    return ResponseEntity.status(HttpStatus.OK).body(list);
  }



    @GetMapping("/{id}")
  public Post getPostById(@PathVariable int id) {
    return postService.getPostById(id);
  }
  @PostMapping("/")
  public ResponseEntity<Post> createPost(@RequestBody Post post) {
    Post post_new = null;
    try {
      post_new = this.postService.createPost(post);
      // return ResponseEntity.of(Optional.of(post_new));
      return ResponseEntity.status(HttpStatus.CREATED).body(post_new);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePost(@PathVariable("id") int id) {
    try {
      postService.deletePost(id);
      return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Post> updatePost(@RequestBody Post post, @PathVariable("id") int id) {
    try {
        post.setId(id);
      this.postService.updatePost(post);
      return ResponseEntity.ok().body(post);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
