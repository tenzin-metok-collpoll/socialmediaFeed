package com.example.socialMediaFeed;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@ComponentScan("com.example.socialMediaFeed")
public class SocialMediaFeedApplication {

	public static void main(String[] args) {
		SpringApplication.run(SocialMediaFeedApplication.class, args);
		System.out.println("start......");
	}

}
           