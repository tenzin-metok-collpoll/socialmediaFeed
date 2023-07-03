package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.Post;
import com.example.socialMediaFeed.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
        return postRepository.findById(id);
    }

    @Override
    public List<Post> getAllPost() {
        return postRepository.findAll();
    }

    @Override
    public Post createPost(Post post) {
        // Check required fields
        if (post.getDescription() == null || post.getUser_name() == null || post.getPosted_time() == null) {
            throw new IllegalArgumentException("Description, user_name, and posted_time are required fields.");
        }
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Post post) {
        System.out.println("-++++++++++++" + post.getId());
        Integer postId = post.getId();
        Post existingPost = postRepository.findById(postId);
        if (existingPost==null) {
            throw new IllegalArgumentException("Invalid post ID.");
        }
        // if (post.getUser_name() != null) {
        //     existingPost.setUser_name(post.getUser_name());
        // }
        // if (post.getPosted_time() != null) {
        //     existingPost.setPosted_time(post.getPosted_time());
        // }

        return postRepository.update(post);
    }

    @Override
    public void deletePost(int id) {
        Post existingPost = postRepository.findById(id);
        if (existingPost==null) {
            throw new IllegalArgumentException("Invalid post ID.");
        }
        postRepository.delete(id);
    }
}
