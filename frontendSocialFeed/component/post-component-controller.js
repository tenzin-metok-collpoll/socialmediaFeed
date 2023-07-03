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
        function ($scope,postService) {
          var vm = this;
          $scope.commentArr = [];
          $scope.newComment = {};
          // $scope.ids=0;
          // $http
          //   .get("http://localhost:8080/comment/")
          //   .then(function (response) {
          //     $scope.commentArr = response.data;
          //   })
          //   .catch(function (error) {
          //     console.error("Error fetching comment:", error);
          //   });
          $scope.setId = function (singlePost) {
            console.log("===============",singlePost);
            $scope.allPosts.id = singlePost.id;
            $scope.allPosts.user_name = singlePost.user_name;
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
            $scope.showCommentInput = false;
             if (singlePost.val !== "") {
              console.log('singlePost.val: ',typeof singlePost.val);
              console.log(singlePost.id);
            //   $scope.data.comments.push({
            //     content: singlePost.val,
            //     editMode: false,
            //   });
            singlePost.val = "";
            const newComment = {
              id: $scope.commentArr.length+1,
              description: "heeellooo🤣🤣🤣",
              post_id: singlePost.id,
              time_stamp: new Date(),
              user_name: "djksad",
            };
            $http
              .post("http://localhost:8080/comment/", newComment)
              .then(function (response) {
                // Handle the response data
                console.log("Data saved successfully!");
              })
              .catch(function (error) {
                // Handle errors
                console.error("Error saving data:", error);
              });
             }
          };

          //save changes to edit content feed
          // $scope.saveChanges =  ()=> {
          //   if($scope.editedContent===undefined){
          //       $scope.allPosts[$scope.allPosts.id].description = $scope.allPosts[$scope.allPosts.id].description;
          //     }
          //     else{
          //       $scope.allPosts[$scope.allPosts.id].description=$scope.editedContent;
          //     }
          //     $scope.editMode = false;

          // };
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
            // var index = $scope.data.comments.indexOf(singleComment);
            // console.log("$scope.data.comments: ", $scope.data.comments);
            // console.log("index: ", index);
            // if (index > -1) {
            //   $scope.data.comments.splice(index, 1); // Remove the comment from the comments array
            // }
            $scope.editMode = false;
            $http
              .delete("http://localhost:8080/comment/$scope.singleComment.id")
              .then(function (response) {
                console.log("Comment deleted successfully");
              })
              .catch(function (error) {
                console.error("Error deleting comment:", error);
              });
          };

          $scope.cancelAddComment = (singlePost) => {
            showCommentInput = false;
            singlePost.val = "";
          };
          

          //save comments
          $scope.Update = (singleComment) => {
            singleComment.editMode = false;
            singleComment.content = singleComment.editedComment;
            $scope.updatedComment = {
              id: 9,
              description: "uiuiuiuiu",
              post_id: 2,
              time_stamp: new Date(),
              user_name: chandler,
            }
            $http
              .put("http://localhost:8080/comment/", updatedComment)
              .then(function (response) {
                console.log("Comment updated successfully");
              })
              .catch(function (error) {
                console.error("Error updating comment:", error);
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
