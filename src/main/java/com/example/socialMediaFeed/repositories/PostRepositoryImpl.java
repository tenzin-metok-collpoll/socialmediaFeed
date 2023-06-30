package com.example.socialMediaFeed.repositories;
import com.example.socialMediaFeed.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class PostRepositoryImpl implements PostRepository{
     private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PostRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Post findById(int id) {
        String sql = "SELECT * FROM Posts WHERE id = ?";
       return jdbcTemplate.queryForObject(sql, new Object[]{id}, this::mapRowToUser);
        
    }

    @Override
    public List<Post> findAll() {
        String sql = "SELECT * FROM Posts";
        return jdbcTemplate.query(sql, this::mapRowToUser);
    }

    @Override
    public Post save(Post post) {
        String sql = "INSERT INTO  Posts (id,user_name, description,  posted_time) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql,post.getId(), post.getuser_name(), post.getDescription(),  post.getposted_time());
        return post;
    }

    @Override
    public Post update(Post post) {
        String sql = "UPDATE Posts SET user_name = ?, description = ?, id = ?, posted_time = ?  WHERE id = ?";
        jdbcTemplate.update(sql, post.getuser_name(), post.getDescription(),  post.getposted_time(), post.getId());
        return post;
    }

    @Override
    public void delete(int id) {
        String sql = "DELETE FROM Posts WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    private Post mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
        Post post= new Post();
        post.setId(rs.getInt("id"));
        post.setuser_name(rs.getString("user_name"));
        post.setDescription(rs.getString("description"));
      
        post.setposted_time(rs.getTimestamp("posted_time"));
        return post;
    }
}
