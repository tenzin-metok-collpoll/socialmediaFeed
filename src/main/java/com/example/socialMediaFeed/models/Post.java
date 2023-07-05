package com.example.socialMediaFeed.models;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "Posts")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter @Setter @NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String user_name;
    private String description;
    private Timestamp posted_time;

    public Post(Integer id, String user_name, String description, Timestamp posted_time) {
        this.id = id;
        this.user_name = user_name;
        this.description = description;
        this.posted_time = posted_time;
    }

    @Override
    public String toString() {
        return "Post [id=" + id + ", user_name=" + user_name + ", description=" + description + ", posted_time="
                + posted_time + "]";
    }
    

}
