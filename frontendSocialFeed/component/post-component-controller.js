//component directive
angular.module("myApp").directive("postComponent", [
  "$http",
  function ($http) {
    return {
      restrict: "E",
      scope: {
        data: "=",
        allPosts: "=",
        // Two-way binding for the data attribute
      },
      templateUrl: "component/postComponent.html",
      controller: [
        "$scope",
        "postService",
        "commentService",
        "likedislikeService",
        function ($scope, postService, commentService, likedislikeService) {
          $scope.commentArr = [];
          $scope.newComment = {};
          $scope.likeArr = [];
          $scope.newLike = {};
          $scope.likeCounter = 0;
          $scope.dislikeCounter = 0;
          fetchComment();
          fetchLikeDislike();
          fetchPost();

          //-------------- POST --------------------
          
           //getAllPost
           function fetchPost() {
            postService
              .getAllPosts()
              .then(function (posts) {
                console.log("posts: ", posts);
                $scope.allPosts = posts;
              })
              .catch(function (error) {
                console.error("Error retrieving data:", error);
              });
          }
          
          //setID for modal pop up
          $scope.setId = function (singlePost) {
            $scope.allPosts.id = singlePost.id;
            $scope.allPosts.user_name = singlePost.user_name;
            $scope.allPosts.description = singlePost.description;
          };

          //update the post
          $scope.saveChanges = function () {
            if ($scope.editedContent === undefined) {
              $scope.editMode = false;
            } else {
              let updatedPost = {
                user_name: $scope.allPosts.user_name,
                description: $scope.editedContent,
                posted_time: new Date(),
              };
              //update a post
              postService
                .updatePost($scope.allPosts.id, updatedPost)
                .then(function (updatedPost) {
                  // Handle the updated post
                  console.log("Post updated successfully in save");
                  fetchPost();
                  console.log(updatedPost);
                  $scope.editMode = false;
                })
                .catch(function (error) {
                  console.error(error);
                });
            }
          };

          // delete a post
          $scope.deleteFeed = function (singlePost) {
            postService
              .deletePost(singlePost.id)
              .then(function () {
                // Handle the successful deletion
                console.log("Post deleted successfully");
                fetchPost();
              })
              .catch(function (error) {
                console.error("Failed to delete post:", error);
              });
            postService.getAllPosts();
          };

          //---------------END OF POST---------------------------

          //---------------COMMENTS-----------------------------

          //getAllComment
          function fetchComment() {
            commentService
              .getAllComments()
              .then(function (comments) {
                console.log("comments: ", comments);
                $scope.commentArr = comments;
              })
              .catch(function (error) {
                console.error("Error retrieving data:", error);
              });
          }

           //add comments
           $scope.addComment = (singlePost) => {
            console.log("singlePost: ", singlePost);
            $scope.showCommentInput = false;
            if (singlePost.val !== "") {
              const newComment =  {
                description: singlePost.val,
                post_id: singlePost.id,
                time_stamp: new Date(),
                user_name: singlePost.user_name,
              };
              commentService
                .addComment(newComment)
                .then(function (newComment) {
                  console.log("Post added successfully:", newComment);
                  fetchComment();
                  singlePost.val = "";
                })
                .catch(function (error) {
                  console.error(error);
                });
            }
          };

           //edit comments
           $scope.EditComment = (singlePost, singleComment) => {
            singleComment.editMode = true;
            singleComment.editedComment = singleComment.content;
          };

          //save comments
          $scope.saveComment = (singlePost, singleComment) => {
            singleComment.editMode = false;
            singleComment.content = singleComment.editedComment;
          };

           //cancel comments
           $scope.cancelComment = () => {
            singleComment.editMode = false;
          };

          //delete comment
          $scope.deleteComment = (singlePost, singleComment) => {
            commentService
              .deleteComment(singleComment.id)
              .then(function () {
                console.log("comment deleted successfully");
                fetchComment();
                $scope.editMode = false;
              })
              .catch(function (error) {
                console.error("Failed to comment post:", error);
              });
          };

          //cancel add comment
          $scope.cancelAddComment = (singlePost) => {
            showCommentInput = false;
            singlePost.val = "";
          };

          //save comments
          $scope.Update = (singleComment, singlePost) => {
            const updatedComment = {
              description: singleComment.editedComment,
              post_id: singlePost.id,
              time_stamp: new Date(),
              user_name: singlePost.user_name,
            };
            commentService
              .updateComment(singleComment.id, updatedComment)
              .then(function (updatedComment) {
                // Handle the updated post
                console.log("comment updated successfully in save");
                fetchComment();
                $scope.editMode = false;
                singleComment.editMode = false;
                singleComment.content = singleComment.editedComment;
              })
              .catch(function (error) {
                console.error(error);
              });
          };

          //cancel the comment
          $scope.Cancel = (singleComment) => {
            singleComment.editMode = false;
            $scope.story = "";
            $scope.userName = "";
          };

          //---------------END OF COMMENTS-----------------------------



          //---------------LIKE AND DISLIKE-----------------------------

          //getAllLikeDislike
          function fetchLikeDislike() {
            likedislikeService
              .getAlllikeDislike()
              .then(function (likeDislike) {
                console.log("Initial data:", likeDislike);
                $scope.likeArr = likeDislike;
              })
              .catch(function (error) {
                console.error(error);
              });
          }

          // increment likes
          $scope.incrementLike = (singlePost) => {
            const newlike = {
              user_name: singlePost.user_name,
              type: "like",
              post_id: singlePost.id,
              time_stamp: new Date(),
            };

            likedislikeService
              .addlike(newlike)
              .then(function (newlike) {
                console.log("like added successfully:", newlike);
                fetchLikeDislike();
                // Update the likes count in the singlePost object
                singlePost.likes += 1;
                $scope.likeCounter = 0;
                $scope.dislikeCounter = 0;
                singlePost.val = "";
              })
              .catch(function (error) {
                console.error(error);
              });
          };

          //increment dislike
          $scope.decrementLike = (singlePost) => {
            const newDislike = {
              user_name: singlePost.user_name,
              type: "dislike",
              post_id: singlePost.id,
              time_stamp: new Date(),
            };

            likedislikeService
              .addDislike(newDislike)
              .then(function (newDislike) {
                console.log("dislike added successfully:", newDislike);
                // Update the dislikes count in the singlePost object
                fetchLikeDislike();
                singlePost.dislikes += 1;
                $scope.likeCounter = 0;
                $scope.dislikeCounter = 0;
                singlePost.val = "";
              })
              .catch(function (error) {
                console.error(error);
              });
          };

          //check condition
          $scope.checkCondition = function (item, data) {
            if (item.type === "like" && item.post_id === data.id) {
              $scope.incrementLikeCounter();
            }
            if (item.type === "dislike" && item.post_id === data.id) {
              $scope.incrementDislikeCounter();
            }
          };

          //increment the like counter
          $scope.incrementLikeCounter = function () {
            $scope.likeCounter++;
          };

          //increment dislike counter
          $scope.incrementDislikeCounter = function () {
            $scope.dislikeCounter++;
          };

        //---------------END OF LIKE AND DISLIKE-----------------------------
        },
      ],
    };
  },
]);
