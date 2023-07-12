package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.Comment;
import com.example.socialMediaFeed.models.LikeDislike;
import com.example.socialMediaFeed.models.Post;
import com.example.socialMediaFeed.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, JdbcTemplate jdbcTemplate ) {
        this.jdbcTemplate = jdbcTemplate;
        this.postRepository = postRepository;
    }

    @Override
    public Post getPostById(int id) {
        if (id <= 0) {
            throw new IllegalArgumentException("Invalid ID.");
        }

        Post post = postRepository.findById(id);
        if (post == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found.");
        }

        return post;
    }

    @Override
    public List<Post> getAllPost() {
        return postRepository.findAll();
    }
     @Override
    public List<Post> getAllPostsWithData() {
        String sqlQuery = postRepository.getPostsWithLikeDislikeCount();
        List<Post> posts = jdbcTemplate.query(sqlQuery, (rs, rowNum) -> {
            Integer postId = rs.getInt("post_id");
            Post post = new Post();
            post.setId(postId);
            post.setUserName(rs.getString("user_name"));
            post.setDescription(rs.getString("description"));
            post.setPostedTime(rs.getTimestamp("posted_time"));

            Map<String, Long> countsMap = new HashMap<>();
            countsMap.put("likeCount", 0L);
            countsMap.put("dislikeCount", 0L);

            Map<Integer, Comment> commentsMap = new HashMap<>();
              Set<Integer> lidiSet = new HashSet<>();

            do {
                String type = rs.getString("type");
                Integer lidi = rs.getInt("liDi");

        if (!lidiSet.contains(lidi)) {
                if (type != null) {
                    if (type.equals("like")) {
                        countsMap.put("likeCount", countsMap.get("likeCount") + 1);
                    } else if (type.equals("dislike")) {
                        countsMap.put("dislikeCount", countsMap.get("dislikeCount") + 1);
                    } 
                }
                lidiSet.add(lidi);
            }
                Integer id = rs.getInt("comment_id");
                String userName = rs.getString("commented_by");
                String description = rs.getString("comment");
                Timestamp timeStamp = rs.getTimestamp("comment_timestamp");

                if (id > 0 && userName != null && description != null) {
                    Comment comment = new Comment(id, userName, description, timeStamp, postId);
                    commentsMap.put(id, comment);
                }
            } while (rs.next() && postId == rs.getInt("post_id"));

            post.setCounts(countsMap);
            post.setComments(commentsMap);

            return post;
        });
        return posts;

    }
            
    
    
    @Override
    public ResponseEntity<CreatePostResponse> createPost(Post post) {
        try {
            // Set the timestamp value in UTC
            post.setPostedTime(Timestamp.from(Instant.now()));
            // Check required fields
            if (post.getDescription() == " " || post.getUserName() == " ") {
                throw new IllegalArgumentException();
            }
            if (post.getDescription() == null || post.getUserName() == null) {
                throw new IllegalArgumentException("Description and user_name are required fields.");
            }

            Post savedPost = postRepository.save(post);
            CreatePostResponse response = new CreatePostResponse("Post saved successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            // Handle missing required fields
            CreatePostResponse response = new CreatePostResponse(
                    "Missing required fields: Description and user_name are required.");
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            // Handle other exceptions
            CreatePostResponse response = new CreatePostResponse("An error occurred while creating the post.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Override
    public Post updatePost(Post post) {
        Integer postId = post.getId();
        Post existingPost = postRepository.findById(postId);
        if (existingPost == null) {
            throw new NotFoundException("Post with ID " + postId + " does not exist. Unable to update the post.");
        }

        // Perform the update operation
        // ...
        post.setPostedTime(Timestamp.from(Instant.now()));
        return postRepository.update(post);
    }

    public class NotFoundException extends RuntimeException {
        public NotFoundException(String message) {
            super(message);
        }
    }

    @Override
    public void deletePost(int id) {
        try {
            Post existingPost = postRepository.findById(id);
            if (existingPost == null) {
                throw new IllegalArgumentException("Post with ID " + id + " does not exist.");
            }
            postRepository.delete(id);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Post with ID " + id + " does not exist.");
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

}
