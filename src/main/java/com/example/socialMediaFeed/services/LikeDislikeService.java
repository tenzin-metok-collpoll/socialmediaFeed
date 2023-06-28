package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.LikeDislike;
import com.example.socialMediaFeed.repositories.LikeDislikeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LikeDislikeService {
    private final LikeDislikeRepository likedislikeRepository;

    public LikeDislikeService(LikeDislikeRepository likedislikeRepository) {
        this.likedislikeRepository = likedislikeRepository;
    }

    // getAllPost
    public List<LikeDislike> getAllLikeDislikes() {
        List<LikeDislike> list = (List<LikeDislike>) this.likedislikeRepository.findAll();
        return list;
    }

    // public Optional<LikeDislike> getCommentById(Long id) {
    //     return likedislikeRepository.findById(id);
    // }

    public LikeDislike addLikeDislike(LikeDislike likeDislike) {
        LikeDislike new_likeDislike= likedislikeRepository.save(likeDislike);
        return new_likeDislike;
    }

    // public void deleteComment(int id) {
    //     likedislikeRepository.deleteById((long) id);
    // }
    // public void updateComment(LikeDislike comment,int id){
    // comment.setId(id);
    // likedislikeRepository.save(comment);
    // }

  
}