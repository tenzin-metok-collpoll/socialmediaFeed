package com.example.socialMediaFeed.services;
import com.example.socialMediaFeed.models.Comment;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface CommentService {

    Comment getCommentById(int id);

    List<Comment> getAllComment();

    Comment createComment(Comment comment);

    Comment updateComment(Comment comment);

    void deleteComment(int id);  
}