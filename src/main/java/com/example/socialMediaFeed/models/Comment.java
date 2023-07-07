package com.example.socialMediaFeed.models;

import java.sql.Timestamp;

// import java.security.Timestamp;
// import java.time.Instant;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Comments")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Getter
@Setter
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String userName;
    private String description;
    private Timestamp timeStamp;
    private Integer postId;

    public Comment(Integer id, String userName, String description, Timestamp timeStamp, Integer postId) {
        this.id = id;
        this.userName = userName;
        this.description = description;
        this.timeStamp = timeStamp;
        this.postId = postId;
    }

    @Override
    public String toString() {
        return "Comment [id=" + id + ", user_name=" + userName + ", description=" + description + ", time_stamp="
                + timeStamp + ", post_id=" + postId + "]";
    }

}
