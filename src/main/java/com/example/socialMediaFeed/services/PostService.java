package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.Post;
import com.example.socialMediaFeed.repositories.PostRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    // getAllPost
    public List<Post> getAllPosts() {
        List<Post> list = (List<Post>) this.postRepository.findAll();
        return list;
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public Post createPost(Post post) {
        Post post_new= postRepository.save(post);
        return post_new;
    }

     public void deletePost(int id) {
        postRepository.deleteById((long) id);
    }
    public void updatePost(Post post,int id){
    post.setId(id);
    postRepository.save(post);
    }

  
}