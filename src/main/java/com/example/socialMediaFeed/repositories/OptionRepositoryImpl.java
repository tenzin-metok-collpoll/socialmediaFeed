package com.example.socialMediaFeed.repositories;

import com.example.socialMediaFeed.models.Option;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class OptionRepositoryImpl implements OptionRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public OptionRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Option findById(int id) {
        String sql = "SELECT * FROM Options WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[] { id }, this::mapRowToUser);

    }
     @Override
    public Option[] findByQuestionId(int id) {
        String sql = "SELECT * FROM Options WHERE question_id = ?";
    List<Option> optionList = jdbcTemplate.query(sql, new Object[]{id}, this::mapRowToUser);

    // Convert the list of comments to an array
    Option[] options = optionList.toArray(new Option[optionList.size()]);
    return options;

    }

    @Override
    public List<Option> findAll() {
        String sql = "SELECT * FROM Options";
        return jdbcTemplate.query(sql, this::mapRowToUser);
    }

    @Override
    public Option save(Option option) {
        String sql = "INSERT INTO Options (content, question_id) VALUES (?, ?)";
        jdbcTemplate.update(sql, option.getContent(),  option.getQuestionId());
        return option;
    }

    @Override
public List<Option> saveInBulk(List<Option> options) {
    String sql = "INSERT INTO Options (content, question_id) VALUES (?, ?)";

    List<Object[]> batchArgs = new ArrayList<>();
    for (Option option : options) {
        Object[] args = new Object[]{option.getContent(), option.getQuestionId()};
        batchArgs.add(args);
    }

    jdbcTemplate.batchUpdate(sql, batchArgs);

    return options;
}

    @Override
    public Option update(Option option) {
        String sql = "UPDATE Options SET content = ?, question_id = ? WHERE id = ?";
        jdbcTemplate.update(sql, option.getContent(), option.getQuestionId(), option.getId());
        return option;
    }

    @Override
    public int delete(int id) {
        String sql = "DELETE FROM Options WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);

        if (rowsAffected == 0) {
            throw new IllegalArgumentException("Option with ID " + id + " does not exist.");
        }

        return rowsAffected;
    }

    private Option mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
        Option option = new Option();
        option.setId(rs.getInt("id"));
        option.setContent(rs.getString("content"));
        option.setQuestionId(rs.getInt("question_id"));
        return option;
    }
}
