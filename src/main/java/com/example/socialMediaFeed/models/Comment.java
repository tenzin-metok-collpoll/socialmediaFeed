package com.example.socialMediaFeed.models;

import java.sql.Timestamp;

// import java.security.Timestamp;
// import java.time.Instant;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "Comments")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String user_name;
    private String description;
    private Timestamp time_stamp;
    private Integer post_id;

    // Constructors, getters, setters
    public int getId() {
        return id;
    }

    public int getpost_id() {
        return post_id;
    }

    public Timestamp gettime_stamp() {
        return time_stamp;
    }

    public void settime_stamp(Timestamp posted_time) {
        this.time_stamp = posted_time;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setpost_id(int post_id) {
        this.post_id = post_id;
    }

    public String getuser_name() {
        return user_name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setuser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getDescription() {
        return description;
    }

}
