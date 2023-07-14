package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.Option;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface OptionService {

    Option getOptionById(int id);

    List<Option> getAllOption();
    Option[] findByQuestionId(int id);

    ResponseEntity<CreateOptionResponse> createOption(Option option);
ResponseEntity<CreateOptionResponse> createOptionInBulk(List<Option> options);

    Option updateOption(Option comment);

    void deleteOption(int id);
}