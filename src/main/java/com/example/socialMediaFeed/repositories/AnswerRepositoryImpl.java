package com.example.socialMediaFeed.repositories;
import com.example.socialMediaFeed.models.Answer;
import com.example.socialMediaFeed.models.Option;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
@Repository
public class AnswerRepositoryImpl implements AnswerRepository {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public AnswerRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // @Override
    // public Answer findById(int id) {
    //     String sql = "SELECT * FROM Answer WHERE id = ?";
    //     return jdbcTemplate.queryForObject(sql, new Object[] { id }, this::mapRowToUser);

    // }

     @Override
    public Answer[] findById(int id) {
        String sql = "SELECT * FROM Answers WHERE option_id = ?";
        List<Answer> answerList = jdbcTemplate.query(sql, new Object[]{id}, this::mapRowToUser);
    Answer[] answers = answerList.toArray(new Answer[answerList.size()]);
    return answers;
    }

    @Override
    public List<Answer> findAll() {
        String sql = "SELECT * FROM Answers";
        return jdbcTemplate.query(sql, this::mapRowToUser);
    }
     @Override
    public Answer update(Answer answer) {
        String sql = "UPDATE Answers SET user_name = ?, option_id = ?";
        jdbcTemplate.update(sql, answer.getUserName(), answer.getOptionId());

        return answer;
    }
    @Override
    public Answer save(Answer answer) {
        String sql = "INSERT INTO Answers (user_name, option_id) VALUES (?, ?)";
        jdbcTemplate.update(sql, answer.getUserName() ,answer.getOptionId());
        return answer;
    }
    @Override
    public int delete(int id) {
        String sql = "DELETE FROM Answers WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);

        if (rowsAffected == 0) {
            throw new IllegalArgumentException("Comment with ID " + id + " does not exist.");
        }

        return rowsAffected;
    }

    private Answer mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
        Answer answer = new Answer();
        answer.setId(rs.getInt("id"));
answer.setUserName(rs.getString("user_name"));
        answer.setOptionId(rs.getInt("option_id"));
      
        return answer;
    }
}
