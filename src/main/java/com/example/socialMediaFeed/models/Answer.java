package com.example.socialMediaFeed.models;



// import java.security.Timestamp;
// import java.time.Instant;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "Answers")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Getter
@Setter
@NoArgsConstructor
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String userName;
    private Integer optionId;
  
    
   
   public Answer(Integer id, String userName, Integer optionId) {
        this.id = id;
        this.userName = userName;
        this.optionId = optionId;
    
    }
    @Override
    public String toString() {
        return "Answer [id=" + id + ", userName=" + userName + ", optionId=" + optionId +  "]";
    }
}