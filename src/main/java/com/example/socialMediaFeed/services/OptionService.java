package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.Option;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface OptionService {

    Option getOptionById(int id);

    List<Option> getAllOption();

    ResponseEntity<CreateOptionResponse> createOption(Option option);

    Option updateOption(Option comment);

    void deleteOption(int id);
}