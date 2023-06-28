package com.example.socialMediaFeed.models;
import com.example.socialMediaFeed.models.Type;
import java.time.Instant;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;


@Entity
@Table(name = "like_and_dislike")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class LikeDislike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String user_name;
    @Enumerated(EnumType.STRING)
    @Column
    private Type type;
    private Instant time_stamp;
    // @ManyToOne
    // @JoinColumn(name = "id")
    private Integer post_id;

    // Constructors, getters, setters

        // Default constructor
    public LikeDislike() {
    }

    // Parameterized constructor
    public LikeDislike(String user_name, Type type, Instant time_stamp, Integer post_id) {
        this.user_name = user_name;
        this.type = type;
        this.time_stamp = time_stamp;
        this.post_id = post_id;
    }

    public int getId() {
    return id;
}
 public Integer getpost_id() {
    return post_id;
}
public Instant gettime_stamp() {
    return time_stamp;
}
public void settime_stamp(Instant time_stamp) {
    this.time_stamp = time_stamp;
}
public void setId(int id) {
    this.id = id;
}
public void setpost_id(Integer post_id) {
    this.post_id = post_id;
}
public String getuser_name() {
    return user_name;
}
public void setType(Type type) {
    this.type = type;
}
public void setuser_name(String user_name) {
    this.user_name = user_name;
}
public Type getType() {
    return type;
}
 // toString() method for debugging and logging

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
