package com.example.socialMediaFeed.services;

import com.example.socialMediaFeed.models.Option;
import com.example.socialMediaFeed.repositories.OptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OptionServiceImpl implements OptionService {
    private final OptionRepository optionRepository;

    @Autowired
    public OptionServiceImpl(OptionRepository optionRepository) {
        this.optionRepository = optionRepository;
    }

    @Override
    public Option getOptionById(int id) {
        return optionRepository.findById(id);
    }
    public Option[] findByQuestionId(int id){
        return optionRepository.findByQuestionId(id);
    }
    @Override
    public List<Option> getAllOption() {
        return optionRepository.findAll();
    }

    @Override
    public ResponseEntity<CreateOptionResponse> createOption(Option option) {
        try {
            // Check required fields
            if (option.getContent() == null || option.getQuestionId() == null) {
                throw new IllegalArgumentException("content, questionId are required fields.");
            }

            Option savedOption = optionRepository.save(option);
            CreateOptionResponse response = new CreateOptionResponse("Option saved successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            // Handle missing required fields
            CreateOptionResponse response = new CreateOptionResponse(
                    "Missing required fields: Description, user_name, and posted_time are required.");
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            // Handle other exceptions
            CreateOptionResponse response = new CreateOptionResponse("An error occurred while creating the option.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

       @Override
    public ResponseEntity<CreateOptionResponse> createOptionInBulk(List<Option> option) {
        try {
            // Check required fields
            // if (option.getContent() == null || option.getQuestionId() == null) {
            //     throw new IllegalArgumentException("content, questionId are required fields.");
            // }

            List<Option> savedOption = optionRepository.saveInBulk(option);
            CreateOptionResponse response = new CreateOptionResponse("Option saved successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            // Handle missing required fields
            CreateOptionResponse response = new CreateOptionResponse(
                    "Missing required fields: Description, user_name, and posted_time are required.");
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            // Handle other exceptions
            CreateOptionResponse response = new CreateOptionResponse("An error occurred while creating the option.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    

    @Override
    public Option updateOption(Option option) {
        return optionRepository.update(option);
    }

    @Override
    public void deleteOption(int id) {
        try {
            Option existingOption = optionRepository.findById(id);
            if (existingOption == null) {
                throw new IllegalArgumentException("Option with ID " + id + " does not exist.");
            }
            optionRepository.delete(id);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Option with ID " + id + " does not exist.");
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
