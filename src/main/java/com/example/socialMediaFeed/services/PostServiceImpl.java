package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.Comment;
import com.example.socialMediaFeed.models.LikeDislike;
import com.example.socialMediaFeed.models.Option;
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
import java.util.ArrayList;
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
    public PostServiceImpl(PostRepository postRepository, JdbcTemplate jdbcTemplate) {
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
        List<Post> posts = jdbcTemplate.query(sqlQuery, (rs) -> {
            Map<Integer, Post> postMap = new HashMap<>();
            Set<Integer> lidiSet = new HashSet<>();
            while (rs.next()) {
                Integer postId = rs.getInt("id");
                String type = rs.getString("type");
    
       
    
                Post post = postMap.get(postId);
                if (post == null) {
                    post = new Post();
                    post.setId(postId);
                    post.setUserName(rs.getString("user_name"));
                    post.setDescription(rs.getString("description"));
                    post.setPostedTime(rs.getTimestamp("posted_time"));
                    post.setType(type);
                    post.setLikeCounts(0L);
                    post.setDislikeCounts(0L);
                    post.setComments(new HashMap<>());
                    post.setOptions(new HashMap<>());
    
                    // // Initialize options for question posts
                    // if (type.equals("question")) {
                    //     post.setOptions(new ArrayList<>());
                    // }
    
                    postMap.put(postId, post);
                }
    
                if (type.equals("post")) {
                    String liDiType = rs.getString("liDiType");
                    Integer lidi = rs.getInt("liDi");
                    if (!lidiSet.contains(lidi)) {
                        if (liDiType != null) {
                            if (liDiType.equals("like")) {
                                post.setLikeCounts(post.getLikeCounts() + 1);
                            } else if (liDiType.equals("dislike")) {
                                post.setDislikeCounts(post.getDislikeCounts() + 1);
                            }
                        }
                        lidiSet.add(lidi);
                    }
    
                    Integer commentId = rs.getInt("comment_id");
                    String userName = rs.getString("commented_by");
                    String description = rs.getString("comment");
                    Timestamp timeStamp = rs.getTimestamp("comment_timestamp");
                    if (commentId > 0 && userName != null && description != null) {
                        Comment comment = new Comment(commentId, userName, description, timeStamp, postId);
    
                        // Check if the comment already exists in the post's comments list
                        boolean commentExists = post.getComments().stream()
                                .anyMatch(existingComment -> existingComment.getId().equals(commentId));
    
                        // Add the comment only if it doesn't already exist
                        if (!commentExists) {
                            post.getComments().add(comment);
                        }
                    }
                }
    
                if (type.equals("question")) {
                    Integer optionId = rs.getInt("option_id");
                    String content = rs.getString("content");
    
                    if (optionId > 0 && content != null) {
                        Option option = new Option(optionId, content, postId);
    
                        // Check if the option already exists in the post's options list
                        boolean optionExists = post.getOptions().stream()
                                .anyMatch(existingOption -> existingOption.getId().equals(optionId));
    
                        // Add the option only if it doesn't already exist
                        if (!optionExists) {
                            post.getOptions().add(option);
                        }
                    }
                }
            }
    
            return new ArrayList<>(postMap.values());
        });
    
        return posts;
    }
    

    @Override
    public Post createPost(Post post) {
            post.setPostedTime(Timestamp.from(Instant.now()));
            // Check required fields
            if (post.getDescription() == " " || post.getUserName() == " ") {
                throw new IllegalArgumentException();
            }
            if (post.getDescription() == null || post.getUserName() == null) {
                throw new IllegalArgumentException("Description and user_name are required fields.");
            }

            Post savedPost = postRepository.save(post);
            // Sytem.out.println("")
            // CreatePostResponse response = new CreatePostResponse("Post saved successfully");
            return savedPost;
        // } catch (IllegalArgumentException e) {
        //     // Handle missing required fields
        //     CreatePostResponse response = new CreatePostResponse(
        //             "Missing required fields: Description and user_name are required.");
        //     // return ResponseEntity.badRequest().body(response);
        // } catch (Exception e) {
        //     // Handle other exceptions
        //     CreatePostResponse response = new CreatePostResponse("An error occurred while creating the post.");
        //     // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        // }
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
