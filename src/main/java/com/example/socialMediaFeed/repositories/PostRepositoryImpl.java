package com.example.socialMediaFeed.repositories;

import com.example.socialMediaFeed.models.Comment;
import com.example.socialMediaFeed.models.LikeDislike;
import com.example.socialMediaFeed.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Repository
public class PostRepositoryImpl implements PostRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PostRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Post findById(int id) {
        String sql = "SELECT * FROM Posts WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[] { id }, this::mapRowToUser);

    }

    @Override
    public List<Post> findAll() {
        String sql = "SELECT * FROM Posts";
        return jdbcTemplate.query(sql, this::mapRowToUser);
    }

    @Override
    public String getPostsWithLikeDislikeCount() {
   String sqlQuery = "SELECT p.id as post_id, " +
                "p.user_name, " +
                "p.description, " +
                "p.posted_time, " +
                "ld.type, " +
                "ld.id as liDi, " +
                "c.id as comment_id, " +
                "c.user_name as commented_by, " +
                "c.description as comment, " +
                "c.time_stamp as comment_timestamp " +
                "FROM Posts p " +
                "LEFT JOIN Comments c ON p.id = c.post_id " +
                "LEFT JOIN like_and_dislike ld ON ld.post_id = p.id";

        return sqlQuery;
    }

    

    @Override
    public Post save(Post post) {
        String sql = "INSERT INTO  Posts (user_name, description, posted_time, type) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, post.getUserName(), post.getDescription(), post.getPostedTime(), post.getType());
        return post;
    }

    @Override
    public Post update(Post post) {
        Integer postId = post.getId();
        if (postId == null) {
            throw new IllegalArgumentException("Invalid post ID for updating the post.");
        }

        String sql = "UPDATE Posts SET user_name = ?, description = ?, posted_time = ?, type = ? WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, post.getUserName(), post.getDescription(), post.getPostedTime(), post.getType(),
                postId);

        if (rowsAffected == 0) {
            throw new NotFoundException("Post with ID" + postId + " does not exist. Unable to update the post.");
        }

        return post;
    }

    public class NotFoundException extends RuntimeException {
        public NotFoundException(String message) {
            super(message);
        }
    }

    @Override
    public int delete(int id) {
        String sql = "DELETE FROM Posts WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);

        if (rowsAffected == 0) {
            throw new IllegalArgumentException("Post with ID " + id + " does not exist.");
        }

        return rowsAffected;
    }

    private Post mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
        Post post = new Post();
        post.setId(rs.getInt("id"));
        post.setUserName(rs.getString("user_name"));
        post.setType(rs.getString("type"));
        post.setDescription(rs.getString("description"));
        post.setPostedTime(rs.getTimestamp("posted_time"));
        return post;
    }
}
