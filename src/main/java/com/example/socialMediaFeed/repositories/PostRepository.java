package com.example.socialMediaFeed.repositories;
//import com.example.demo.models.Comments;
import com.example.socialMediaFeed.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

}

