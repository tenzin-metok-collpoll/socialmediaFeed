package com.example.socialMediaFeed.models;
import java.time.Instant;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;


@Entity(name = "Posts")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String user_name;
    private String description;
    private Instant posted_time;

    // Constructors, getters, setters
    public int getId() {
    return id;
}
public Instant getposted_time() {
    return posted_time;
}
public void setposted_time(Instant posted_time) {
    this.posted_time = posted_time;
}
public void setId(int id) {
    this.id = id;
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
