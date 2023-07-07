package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.LikeDislike;
import com.example.socialMediaFeed.repositories.LikeDislikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
public class LikeDislikeServiceImpl implements LikeDislikeService {
    private final LikeDislikeRepository likeDislikeRepository;

    @Autowired
    public LikeDislikeServiceImpl(LikeDislikeRepository likeDislikeRepository) {
        this.likeDislikeRepository = likeDislikeRepository;
    }

    // @Override
    // public LikeDislike getCommentById(int id) {
    // return likeDislikeRepository.findById(id);
    // }

    @Override
    public List<LikeDislike> getAllLikeDislikes() {
        return likeDislikeRepository.findAll();
    }

    @Override
    public LikeDislike addLikeDislike(LikeDislike likeDislike) {
        likeDislike.setTimeStamp(Timestamp.from(Instant.now()));
        return likeDislikeRepository.save(likeDislike);
    }

    // @Override
    // public Comment updateComment(Comment comment) {
    // return commentRepository.update(comment);
    // }

    @Override
    public void deleteLikeDislike(int id) {
        likeDislikeRepository.delete(id);
    }
}
