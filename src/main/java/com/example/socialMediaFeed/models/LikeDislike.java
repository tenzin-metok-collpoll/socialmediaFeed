package com.example.socialMediaFeed.models;

import java.sql.Timestamp;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "like_and_dislike")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Getter
@Setter
@NoArgsConstructor
public class LikeDislike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String userName;
    private String type;
    private Timestamp timeStamp;
    private Integer postId;

    public LikeDislike(Integer id, String userName, String type, Timestamp timeStamp, Integer postId) {
        this.id = id;
        this.userName = userName;
        this.type = type;
        this.timeStamp = timeStamp;
        this.postId = postId;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", user_name='" + userName + '\'' +
                ", time_stamp='" + timeStamp + '\'' +
                ", type='" + type + '\'' +
                ", post_id='" + postId + '\'' +
                '}';
    }
}
