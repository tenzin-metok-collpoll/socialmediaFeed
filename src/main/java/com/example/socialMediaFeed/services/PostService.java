package com.example.socialMediaFeed.services;
import com.example.socialMediaFeed.models.Post;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface PostService {

    Post getPostById(int id);

    List<Post> getAllPost();

   ResponseEntity<String> createPost(Post post);

     Post updatePost(Post post);

    void deletePost(int id);  
}