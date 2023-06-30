package com.example.socialMediaFeed.models;
import java.sql.Timestamp;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "like_and_dislike")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter @Setter @NoArgsConstructor
public class LikeDislike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String user_name;
    // @Enumerated(EnumType.STRING)
    // @Column
    private String type;
    private Timestamp time_stamp;
    // @ManyToOne
    // @JoinColumn(name = "id")
    private Integer post_id;


    public LikeDislike(Integer id, String user_name, String type, Timestamp time_stamp, Integer post_id) {
        this.id = id;
        this.user_name = user_name;
        this.type = type;
        this.time_stamp = time_stamp;
        this.post_id = post_id;
    }
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", user_name='" + user_name + '\'' +
                ", time_stamp='" + time_stamp + '\'' +
                ", type='" + type + '\'' +
                ", post_id='" + post_id + '\'' +
                '}';
    }
}
