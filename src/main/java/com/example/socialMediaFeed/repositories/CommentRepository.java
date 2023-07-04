package com.example.socialMediaFeed.repositories;
import com.example.socialMediaFeed.models.Comment;
import java.util.List;

public interface CommentRepository {
    Comment findById(int id);

    List<Comment> findAll();

    Comment save(Comment comment);

    Comment update(Comment comment);

    int delete(int id);
}
