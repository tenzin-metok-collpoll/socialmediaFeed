package com.example.socialMediaFeed.repositories;
import com.example.socialMediaFeed.models.Option;
import java.util.List;


public interface OptionRepository {
    Option findById(int id);

    List<Option> findAll();

    Option save(Option option);

    Option update(Option option);

    int delete(int id);
}
