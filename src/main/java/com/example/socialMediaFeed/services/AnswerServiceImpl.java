package com.example.socialMediaFeed.services;
import com.example.socialMediaFeed.models.Answer;
import com.example.socialMediaFeed.repositories.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AnswerServiceImpl implements AnswerService {
    private final AnswerRepository answerRepository;

    @Autowired
    public AnswerServiceImpl(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    @Override
    public Answer getAnswerById(int id) {
        return answerRepository.findById(id);
    }

    @Override
    public List<Answer> getAllAnswer() {
        return answerRepository.findAll();
    }
     @Override
    public ResponseEntity<CreateAnswerResponse> createAnswer(Answer answer) {
        try {
            // Check required fields
            if (answer.getUserName() == null || answer.getOptionId() == null) {
                throw new IllegalArgumentException("username, OptionId are required fields.");
            }

            Answer savedAnswer = answerRepository.save(answer);
            CreateAnswerResponse response = new CreateAnswerResponse("Answer saved successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            // Handle missing required fields
            CreateAnswerResponse response = new CreateAnswerResponse(
                    "Missing required fields:  user_name, Optionid are required.");
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            // Handle other exceptions
            CreateAnswerResponse response = new CreateAnswerResponse("An error occurred while creating the option.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Override
    public Answer updateAnswer(Answer answer) {
      
        return answerRepository.update(answer);
    }

    @Override
    public void deleteAnswer(int id) {
        try {
            Answer existingAnswer = answerRepository.findById(id);
            if (existingAnswer == null) {
                throw new IllegalArgumentException("Comment with ID " + id + " does not exist.");
            }
            answerRepository.delete(id);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Comment with ID " + id + " does not exist.");
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
