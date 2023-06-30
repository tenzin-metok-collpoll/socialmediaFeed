package com.example.socialMediaFeed.services;
import com.example.socialMediaFeed.models.Post;
import com.example.socialMediaFeed.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostServiceImpl implements PostService{
        private final PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public Post getPostById(int id) {
        return postRepository.findById(id);
    }

    @Override
    public List<Post> getAllPost() {
        return postRepository.findAll();
    }

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Post post) {
        return postRepository.update(post);
    }

    @Override
    public void deletePost(int id) {
        postRepository.delete(id);
    }
}
