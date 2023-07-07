package com.example.socialMediaFeed.models;

import java.sql.Timestamp;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "Posts")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Getter
@Setter
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String userName;
    private String description;
    private Timestamp postedTime;
    private Long likeCount;
    private Long dislikeCount;
    private List<String> comments;

    public Post(Integer id, String userName, String description, Timestamp postedTime) {
        this.id = id;
        this.userName = userName;
        this.description = description;
        this.postedTime = postedTime;
        // this.likeCount = likeCount;
        // this.dislikeCount = dislikeCount;
        // this.comments = comments;
    }

    @Override
    public String toString() {
        return "Post [id=" + id + ", user_name=" + userName + ", description=" + description + ", posted_time="
                + postedTime + ", likeCount=" + likeCount + ", dislikeCount="+ dislikeCount +"]";
    }

}
