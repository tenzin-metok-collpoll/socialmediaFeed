package com.example.socialMediaFeed.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Options")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Getter
@Setter
@NoArgsConstructor
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String content;
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "postId")
    // private Post post;
    // @Column(insertable = false, updatable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "questionId")
    private Post post;
    @Column(insertable = false, updatable = false)
    private Integer questionId;

    public Option(Integer id, String content, Integer questionId) {
        this.id = id;
        this.content = content;
        this.questionId = questionId;
    }

    @Override
    public String toString() {
        return "Comment [id=" + id +  ", content=" + content +
                ", questionId=" + questionId + "]";
    }

}
