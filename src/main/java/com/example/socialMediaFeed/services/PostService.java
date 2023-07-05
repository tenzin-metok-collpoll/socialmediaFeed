package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.Post;
import org.springframework.http.ResponseEntity;
import java.util.List;

public interface PostService {

    Post getPostById(int id);
    
    List<Post> getAllPostsWithData();

    List<Post> getAllPost();

    ResponseEntity<CreatePostResponse> createPost(Post post);

    Post updatePost(Post post);

    void deletePost(int id);
}
