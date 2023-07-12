package com.example.socialMediaFeed.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.socialMediaFeed.models.Answer;


public interface AnswerService {
     Answer getAnswerById(int id);

    List<Answer> getAllAnswer();

     ResponseEntity<CreateAnswerResponse> createAnswer(Answer answer);

    Answer updateAnswer(Answer answer);

    void deleteAnswer(int id);
}

