package com.example.socialMediaFeed.models;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    private String type;
    @ElementCollection
    @CollectionTable(name = "post_counts", joinColumns = @JoinColumn(name = "postId"))
    @Column(name = "count", nullable = false)
    @MapKeyColumn(name = "type")
    private Map<String, Long> counts;
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments;

    public Post(Integer id, String userName, String description, Timestamp postedTime, String Type) {
        this.id = id;
        this.userName = userName;
        this.description = description;
        this.postedTime = postedTime;
        this.type = type;
    }

    public void setComments(Map<Integer, Comment> comments) {
        this.comments = new ArrayList<>(comments.values());
    }

    @Override
    public String toString() {
        return "Post [id=" + id + ", userName=" + userName + ", description=" + description + ", postedTime="
                + postedTime + "type =" + type + ", likeCount=" + counts + ", comments=" + comments
                + "]";
    }

}
