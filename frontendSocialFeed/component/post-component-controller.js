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
        // "http",
        "postService",
        "commentService",
        function ($scope,postService,commentService) {
          var vm = this;
          $scope.commentArr = [];
          $scope.newComment = {};
          fetchComment();
          function fetchComment(){
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
          
          $scope.setId = function (singlePost) {
            console.log("===============",singlePost);
            $scope.allPosts.id = singlePost.id;
            $scope.allPosts.user_name = singlePost.user_name;
            $scope.allPosts.description = singlePost.description;
          };
         
          // like post
          $scope.incrementLike = (singlePost) => {
            console.log("after adding like singlePost: ", singlePost);
            $scope.data.likes += 1;
          };
          // dislike post
          $scope.decrementLike = (singlePost) => {
            $scope.data.dislike += 1;
          };

          //add comments
          $scope.addComment = (singlePost) => {
            console.log('singlePost: ', singlePost);
            $scope.showCommentInput = false;
             if (singlePost.val !== "") {
              console.log('singlePost.val: ',singlePost.val);
              console.log(singlePost.id);
            //   $scope.data.comments.push({
            //     content: singlePost.val,
            //     editMode: false,
            //   });
            
            const newComment = {
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

         
          $scope.saveChanges = function () {
            if ($scope.editedContent === undefined) {
              $scope.editMode = false;
            } else {
              let updatedPost = {
                user_name: $scope.allPosts.user_name,
                description: $scope.editedContent,
                posted_time: new Date()
              };
              //update a post
              postService.updatePost($scope.allPosts.id, updatedPost)
              .then(function(updatedPost) {
                  // Handle the updated post
                  console.log("Post updated successfully in save");
                  fetchPost();
                  console.log(updatedPost);
                  $scope.editMode = false;
              })
              .catch(function(error) {
                  console.error(error);
              });
            }
          };

          // delete a feed
          $scope.deleteFeed = function (singlePost) {
            postService.deletePost(singlePost.id)
            .then(function() {
                // Handle the successful deletion
                console.log("Post deleted successfully");
                fetchPost();
            })
            .catch(function(error) {
              console.error("Failed to delete post:", error);
            });
            postService.getAllPosts();
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
            //delete comment 
            commentService.deleteComment(singleComment.id)
            .then(function() {
                console.log("comment deleted successfully");
                fetchComment();
                $scope.editMode = false;
            })
            .catch(function(error) {
              console.error("Failed to comment post:", error);
            });
          };

          $scope.cancelAddComment = (singlePost) => {
            showCommentInput = false;
            singlePost.val = "";
          };
          

          //save comments
          $scope.Update = (singleComment,singlePost) => {
            
            const updatedComment = {
              description: singleComment.editedComment,
              post_id: singlePost.id,
              time_stamp: new Date(),
              user_name: singlePost.user_name,
            }
            commentService.updateComment(singleComment.id, updatedComment)
            .then(function(updatedPost) {
                // Handle the updated post
                console.log("comment updated successfully in save");
                fetchComment();
                $scope.editMode = false;
                singleComment.editMode = false;
            singleComment.content = singleComment.editedComment;
            })
            .catch(function(error) {
                console.error(error);
            });
           
          };
          $scope.Cancel = (singleComment) => {
            singleComment.editMode = false;
            $scope.story = "";
            $scope.userName = "";
          };
        },
      ],
    };
  },
]);
