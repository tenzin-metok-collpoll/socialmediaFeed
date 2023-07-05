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
    private String user_name;
    private String description;
    private Timestamp time_stamp;
    private Integer post_id;

    public Comment(Integer id, String user_name, String description, Timestamp time_stamp, Integer post_id) {
        this.id = id;
        this.user_name = user_name;
        this.description = description;
        this.time_stamp = time_stamp;
        this.post_id = post_id;
    }

    @Override
    public String toString() {
        return "Comment [id=" + id + ", user_name=" + user_name + ", description=" + description + ", time_stamp="
                + time_stamp + ", post_id=" + post_id + "]";
    }

}
