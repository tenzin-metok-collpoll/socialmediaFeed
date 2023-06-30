package com.example.socialMediaFeed.repositories;
//import com.example.demo.models.Comments;
import com.example.socialMediaFeed.models.LikeDislike;
import java.util.List;

public interface LikeDislikeRepository {
    // LikeDislike findById(int id);

    List<LikeDislike> findAll();

    LikeDislike save(LikeDislike comment);

    // LikeDislike update(LikeDislike comment);

    void delete(int id);
}
