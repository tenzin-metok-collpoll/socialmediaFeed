package com.example.socialMediaFeed.services;
import com.example.socialMediaFeed.models.LikeDislike;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface LikeDislikeService {

    // LikeDislike getCommentById(int id);

    List<LikeDislike> getAllLikeDislikes();

    LikeDislike addLikeDislike(LikeDislike comment);

    // LikeDislike updateComment(LikeDislike comment);

    void deleteLikeDislike(int id);  
}