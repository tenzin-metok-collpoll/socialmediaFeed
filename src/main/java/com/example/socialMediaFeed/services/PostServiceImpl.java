package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.Post;
import com.example.socialMediaFeed.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
  public Post getPostById(int id) {
    if (id <= 0) {
        throw new IllegalArgumentException("Invalid ID.");
    }

    Post post = postRepository.findById(id);
    if (post == null) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found.");
    }

    return post;
}


    @Override
    public List<Post> getAllPost() {
        return postRepository.findAll();
    }

    @Override
public ResponseEntity<String> createPost(Post post) {
    try {
        // Check required fields
        if (post.getDescription() == null || post.getUser_name() == null || post.getPosted_time() == null) {
            throw new IllegalArgumentException("Description, user_name, and posted_time are required fields.");
        }

        Post savedPost = postRepository.save(post);
        return ResponseEntity.ok("Post saved successfully.");
    } catch (IllegalArgumentException e) {
        // Handle missing required fields
        return ResponseEntity.badRequest().body("Missing required fields: Description, user_name, and posted_time are required.");
    } catch (Exception e) {
        // Handle other exceptions
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the post.");
    }
}





   @Override
public Post updatePost(Post post) {
    Integer postId = post.getId();
    Post existingPost = postRepository.findById(postId);
    if (existingPost == null) {
        throw new NotFoundException("Post with ID " + postId + " does not exist. Unable to update the post.");
    }

    // Perform the update operation
    // ...

    return postRepository.update(post);
}
public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}

    
   
   @Override
public void deletePost(int id) {
    try {
        Post existingPost = postRepository.findById(id);
        if (existingPost == null) {
            throw new IllegalArgumentException("Post with ID " + id + " does not exist.");
        }
        postRepository.delete(id);
    } catch (EmptyResultDataAccessException e) {
        throw new IllegalArgumentException("Post with ID " + id + " does not exist.");
    } catch (Exception e) {
        e.printStackTrace();
        throw e;
    }
}

}
