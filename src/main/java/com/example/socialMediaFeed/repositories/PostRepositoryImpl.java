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
        String sql = "INSERT INTO  Posts (user_name, description,  posted_time) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql,post.getUser_name(), post.getDescription(),  post.getPosted_time());
        System.out.println("++++=+++++++"+post);
        return post;
    }

    @Override
  public Post update(Post post) {
    Integer postId = post.getId();
    if (postId == null) {
        throw new IllegalArgumentException("Invalid post ID for updating the post.");
    }

    String sql = "UPDATE Posts SET user_name = ?, description = ?, posted_time = ? WHERE id = ?";
    int rowsAffected = jdbcTemplate.update(sql, post.getUser_name(), post.getDescription(), post.getPosted_time(), postId);

    if (rowsAffected == 0) {
        throw new NotFoundException("Post with ID " + postId + " does not exist. Unable to update the post.");
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
        Post post= new Post();
        System.out.println("++++=+++++++"+post);
        post.setId(rs.getInt("id"));
        post.setUser_name(rs.getString("user_name"));
        post.setDescription(rs.getString("description"));
        post.setPosted_time(rs.getTimestamp("posted_time"));
        return post;
    }
}
