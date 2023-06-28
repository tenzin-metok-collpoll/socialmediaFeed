package com.example.socialMediaFeed.repositories;
import com.example.socialMediaFeed.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
