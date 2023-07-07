package com.example.socialMediaFeed.repositories;

import com.example.socialMediaFeed.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.Collections;

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
    public List<Post> getPostsWithLikeDislikeCount() {
        String sqlQuery = "SELECT p.*, " +
        "(SELECT COUNT(*) FROM like_and_dislike ld WHERE ld.post_id = p.id AND ld.type = 'like') AS likeCount, " +
        "(SELECT COUNT(*) FROM like_and_dislike ld WHERE ld.post_id = p.id AND ld.type = 'dislike') AS dislikeCount, " +
        "GROUP_CONCAT(CONCAT(c.description, ',', c.id) SEPARATOR ', ') AS comments " +
        "FROM Posts p " +
        "LEFT JOIN Comments c ON p.id = c.post_id " +
        "GROUP BY p.id";

        return jdbcTemplate.query(sqlQuery, new PostMapper());
    }
      private static class PostMapper implements RowMapper<Post> {
        @Override
        public Post mapRow(ResultSet rs, int rowNum) throws SQLException {
            Post post = new Post();
            post.setId(rs.getInt("id"));
            post.setDescription(rs.getString("description"));
            post.setUserName(rs.getString("user_name"));
            post.setPostedTime(rs.getTimestamp("posted_time"));
            post.setLikeCount(rs.getLong("likeCount"));
            post.setDislikeCount(rs.getLong("dislikeCount"));

            String commentsString = rs.getString("comments");
            if (commentsString != null) {
                String[] commentsArray = commentsString.split(", ");
                post.setComments(Arrays.asList(commentsArray));
            } else {
                post.setComments(Collections.emptyList());
            }

            return post;
        }
    }

    @Override
    public Post save(Post post) {
        String sql = "INSERT INTO  Posts (user_name, description, posted_time) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, post.getUserName(), post.getDescription(), post.getPostedTime());
        return post;
    }

    @Override
    public Post update(Post post) {
        Integer postId = post.getId();
        if (postId == null) {
            throw new IllegalArgumentException("Invalid post ID for updating the post.");
        }

        String sql = "UPDATE Posts SET user_name = ?, description = ?, posted_time = ? WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, post.getUserName(), post.getDescription(), post.getPostedTime(),
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
        post.setDescription(rs.getString("description"));
        post.setPostedTime(rs.getTimestamp("posted_time"));
        return post;
    }
}
