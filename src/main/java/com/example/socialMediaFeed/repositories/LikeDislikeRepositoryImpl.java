package com.example.socialMediaFeed.repositories;
import com.example.socialMediaFeed.models.LikeDislike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.example.socialMediaFeed.repositories.Type;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class LikeDislikeRepositoryImpl implements LikeDislikeRepository{
     private final JdbcTemplate jdbcTemplate;

    @Autowired
    public LikeDislikeRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // @Override
    // public LikeDislike findById(int id) {
    //     String sql = "SELECT * FROM like_and_dislike WHERE id = ?";
    //    return jdbcTemplate.queryForObject(sql, new Object[]{id}, this::mapRowToUser);
        
    // }

    @Override
    public List<LikeDislike> findAll() {
        String sql = "SELECT * FROM like_and_dislike";
        return jdbcTemplate.query(sql, this::mapRowToUser);
    }

    @Override
    public LikeDislike save(LikeDislike likeDislike) {
        String sql = "INSERT INTO like_and_dislike (user_name, type, post_id, time_stamp) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, likeDislike.getUser_name(), likeDislike.getType(), likeDislike.getPost_id(), likeDislike.getTime_stamp());
        System.out.println("-----__----________--+"+likeDislike);
        return likeDislike;
    }

    // @Override
    // public LikeDislike update(LikeDislike likeDislike) {
    //     String sql = "UPDATE like_and_dislike SET user_name = ?, type = ?, post_id = ?, time_stamp = ?  WHERE id = ?";
    //     jdbcTemplate.update(sql, likeDislike.getuser_name(), likeDislike.getType(), likeDislike.getpost_id(), likeDislike.gettime_stamp(), likeDislike.getId());
    //     return likeDislike;
    // }

    // @Override
    public void delete(int id) {
        
        String sql = "DELETE FROM like_and_dislike WHERE id = ?";
        jdbcTemplate.update(sql, id);
    } 

    // Inside your repository or service class
// public Type mapStringToType(String typeString) {
//     try {
//         return Type.valueOf(typeString);
//     } catch (IllegalArgumentException e) {
//         // Handle invalid or unknown enum values if needed
//         return null;
//     }
// }

    private LikeDislike mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
        LikeDislike likeDislike = new LikeDislike();
        likeDislike.setId(rs.getInt("id"));
        likeDislike.setUser_name(rs.getString("user_name"));
        likeDislike.setType(rs.getString("type"));
        likeDislike.setPost_id(rs.getInt("post_id"));
        likeDislike.setTime_stamp(rs.getTimestamp("time_stamp"));
        return likeDislike;
    }
}
