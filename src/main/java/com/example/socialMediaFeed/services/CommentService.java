package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.Comment;
import com.example.socialMediaFeed.repositories.CommentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // getAllPost
    public List<Comment> getAllComment() {
        List<Comment> list = (List<Comment>) this.commentRepository.findAll();
        return list;
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public Comment createComment(Comment comment) {
        Comment new_comment= commentRepository.save(comment);
        return new_comment;
    }

     public void deleteComment(int id) {
        commentRepository.deleteById((long) id);
    }
    public void updateComment(Comment comment,int id){
    comment.setId(id);
    commentRepository.save(comment);
    }

  
}