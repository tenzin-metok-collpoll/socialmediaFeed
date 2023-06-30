package com.example.socialMediaFeed.repositories;
import com.example.socialMediaFeed.models.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class CommentRepositoryImpl implements CommentRepository{
     private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CommentRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Comment findById(int id) {
        String sql = "SELECT * FROM Comments WHERE id = ?";
       return jdbcTemplate.queryForObject(sql, new Object[]{id}, this::mapRowToUser);
        
    }

    @Override
    public List<Comment> findAll() {
        String sql = "SELECT * FROM Comments";
        return jdbcTemplate.query(sql, this::mapRowToUser);
    }

    @Override
    public Comment save(Comment comment) {
        String sql = "INSERT INTO Comments (user_name, description, post_id, time_stamp) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, comment.getuser_name(), comment.getDescription(), comment.getpost_id(), comment.gettime_stamp());
        return comment;
    }

    @Override
    public Comment update(Comment comment) {
        String sql = "UPDATE Comments SET user_name = ?, description = ?, post_id = ?, time_stamp = ?  WHERE id = ?";
        jdbcTemplate.update(sql, comment.getuser_name(), comment.getDescription(), comment.getpost_id(), comment.gettime_stamp(), comment.getId());
        return comment;
    }

    @Override
    public void delete(int id) {
        String sql = "DELETE FROM Comments WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    private Comment mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
        Comment comment = new Comment();
        comment.setId(rs.getInt("id"));
        comment.setuser_name(rs.getString("user_name"));
        comment.setDescription(rs.getString("description"));
        comment.setpost_id(rs.getInt("post_id"));
        comment.settime_stamp(rs.getTimestamp("time_stamp"));
        return comment;
    }
}
