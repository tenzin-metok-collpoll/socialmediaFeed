package com.example.socialMediaFeed.repositories;
//import com.example.demo.models.Comments;
import com.example.socialMediaFeed.models.LikeDislike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeDislikeRepository extends JpaRepository<LikeDislike, Long> {

}
