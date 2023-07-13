package com.example.socialMediaFeed.repositories;
import com.example.socialMediaFeed.models.Option;
import java.util.List;


public interface OptionRepository {
    Option findById(int id);
   Option[] findByQuestionId(int id);

    List<Option> findAll();

    Option save(Option option);
    List<Option> saveInBulk(List<Option> options);

    Option update(Option option);

    int delete(int id);
}
