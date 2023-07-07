package com.example.socialMediaFeed.repositories;

import com.example.socialMediaFeed.models.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class CommentRepositoryImpl implements CommentRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CommentRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Comment findById(int id) {
        String sql = "SELECT * FROM Comments WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[] { id }, this::mapRowToUser);

    }

    @Override
    public List<Comment> findAll() {
        String sql = "SELECT * FROM Comments";
        return jdbcTemplate.query(sql, this::mapRowToUser);
    }

    @Override
    public Comment save(Comment comment) {
        String sql = "INSERT INTO Comments (user_name, description, post_id, time_stamp) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, comment.getUserName(), comment.getDescription(), comment.getPostId(),
                comment.getTimeStamp());
        return comment;
    }

    @Override
    public Comment update(Comment comment) {
        String sql = "UPDATE Comments SET user_name = ?, description = ?, post_id = ?, time_stamp = ?  WHERE id = ?";
        jdbcTemplate.update(sql, comment.getUserName(), comment.getDescription(), comment.getPostId(),
                comment.getTimeStamp(), comment.getId());
        return comment;
    }

    @Override
    public int delete(int id) {
        String sql = "DELETE FROM Comments WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);

        if (rowsAffected == 0) {
            throw new IllegalArgumentException("Comment with ID " + id + " does not exist.");
        }

        return rowsAffected;
    }

    private Comment mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
        Comment comment = new Comment();
        comment.setId(rs.getInt("id"));
        comment.setUserName(rs.getString("user_name"));
        comment.setDescription(rs.getString("description"));
        comment.setPostId(rs.getInt("post_id"));
        comment.setTimeStamp(rs.getTimestamp("time_stamp"));
        return comment;
    }
}
