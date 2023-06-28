package com.example.socialMediaFeed.controllers;
import com.example.socialMediaFeed.models.LikeDislike;
import com.example.socialMediaFeed.services.LikeDislikeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/likeDislike")
public class ReactionController {

    private final LikeDislikeService likedislikeService;

    public ReactionController(LikeDislikeService likedislikeService) {
        this.likedislikeService = likedislikeService;
    }

    @GetMapping("/")
  public ResponseEntity<List<LikeDislike>>getAllLikeDislikes(){
        List<LikeDislike>list=likedislikeService.getAllLikeDislikes();
        if(list.size()<=0){
          return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.of(Optional.of(list));
    }


    @PostMapping("/")
      public ResponseEntity<LikeDislike>addLikeDislike(@RequestBody LikeDislike likeDislike){
        LikeDislike new_likeDislike=null;
        try{
          new_likeDislike=this.likedislikeService.addLikeDislike(likeDislike);
          return ResponseEntity.of(Optional.of(new_likeDislike));
        }
        catch(Exception e){
          e.printStackTrace();
return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
      }
     
}

