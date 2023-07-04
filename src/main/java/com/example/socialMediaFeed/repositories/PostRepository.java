package com.example.socialMediaFeed.repositories;
import com.example.socialMediaFeed.models.Post;
import java.util.List;

public interface PostRepository {
    Post findById(int id);

    List<Post> findAll();

    Post save(Post post);

    Post update(Post post);

    int delete(int id);
}
