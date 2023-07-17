package com.example.socialMediaFeed.repositories;

import java.util.List;

import com.example.socialMediaFeed.models.Answer;

public interface AnswerRepository {
     Answer[] findById(int id);

    List<Answer> findAll();

    Answer save(Answer answer);

    Answer update(Answer answer);

    int delete(int id);
}
