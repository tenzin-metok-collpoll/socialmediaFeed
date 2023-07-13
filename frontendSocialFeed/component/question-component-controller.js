//component directive
angular.module("myApp").directive("questionComponent", [
    "$http",
    function () {
      return {
        restrict: "E",
        scope: {
          data: "=",
          allPosts: "=",
          onDataUpdated: "&",
        //   Two-way binding for the data attribute
        },
        templateUrl: "component/questionComponent.html",
  
        controller: [
          "$scope",
          "postService",
          "commentService",
          "likedislikeService",
          function ($scope, postService, commentService) {

            //update the post
            $scope.saveChanges = function (data) {
              if (navigator.onLine) {
                $scope.loading = true;
                console.log("data: ", data);
                if ($scope.editedContent === undefined) {
                  $scope.editMode = false;
                } else {
                  let updatedPost = {
                    userName: data.userName,
                    description: $scope.editedContent,
                  };
                  //update a post
                  postService
                    .updatePost(data.id, updatedPost)
                    .then(function (updatedPost) {
                      // Handle the updated post
                      console.log("Post updated successfully in save");
                      $scope.onDataUpdated({ data: updatedPost });
                      console.log(updatedPost);
                      $scope.editMode = false;
                    })
                    .catch(function (error) {
                      console.error(error);
                    });
                }
              } else {
                alert(
                  "Application is offline. Please check your internet connection."
                );
              }
            };
  
            // delete a post
            $scope.deleteFeed = function (singlePost) {
              if (navigator.onLine) {
                $scope.loading = true;
                postService
                  .deletePost(singlePost.id)
                  .then(function (res) {
                    if(res==='') $scope.onDataUpdated({ data: singlePost.id });
                    // Handle the successful deletion
                    console.log("sdfgdgdfgdfgdf");
                    
                    // fetchPost();
                  })
                  .catch(function (error) {
                    console.error("Failed to delete post:", error);
                  });
              } else {
                alert(
                  "Application is offline. Please check your internet connection."
                );
              }
            };
  
            //---------------END OF POST---------------------------
  
            //---------------COMMENTS-----------------------------
  
            //add comments
            $scope.addComment = (singlePost) => {
              if (navigator.onLine) {
            
      $scope.loadingComments=true;
                console.log("singlePost: ", singlePost);
                $scope.showCommentInput = false;
                if (singlePost.val !== "") {
                  const newComment = {
                    description: singlePost.val,
                    postId: singlePost.id,
                    userName: singlePost.userName,
                  };
                  commentService
                    .addComment(newComment)
                    .then(function (newComment) {
                      console.log("Post added successfully:", newComment);
                      // fetchComment();
                      $scope.onDataUpdated({ data: newComment });
                      singlePost.val = "";
                    })
                    .catch(function (error) {
                      console.error(error);
                    });
                }
              } else {
                alert(
                  "Application is offline. Please check your internet connection."
                );
              }
            };
  
            //edit comments
            $scope.EditComment = (singlePost, singleComment) => {
              singleComment.editMode = true;
              singleComment.editedComment = singleComment.content;
            };
  
            //delete comment
            $scope.deleteComment = (singleComment) => {
              console.log("singleComment: ", singleComment.id);
              if (navigator.onLine) {
                $scope.loadingDelete=true;
                console.log("singleComment: ", singleComment);
                commentService
                  .deleteComment(singleComment.id)
                  .then(function () {
                    console.log("comment deleted successfully");
                    // fetchComment();
                    $scope.onDataUpdated({ data: singleComment.id });
                    $scope.formData.editMode = false;
                  })
                  .catch(function (error) {
                    console.error("Failed to comment post:", error);
                  });
              } else {
                alert(
                  "Application is offline. Please check your internet connection."
                );
              }
            };
  
            //cancel add comment
            $scope.cancelAddComment = (singlePost) => {
              showCommentInput = false;
              singlePost.val = "";
            };
  
            //save comments
            $scope.Update = (singleComment, singlePost) => {
              console.log("$scope.editedComment", $scope.formData.editedComment);
              if (navigator.onLine) {
                $scope.loadingComments=true;
                singleComment.editMode = false;
                const updatedComment = {
                  description: $scope.formData.editedComment,
                  postId: singlePost.id,
                  userName: singlePost.userName,
                };
                commentService
                  .updateComment(singleComment.id, updatedComment)
                  .then(function (updatedComment) {
                    // Handle the updated post
  
                    console.log("comment updated successfully in save");
                    $scope.onDataUpdated({ data: singleComment.id });
                  })
                  .catch(function (error) {
                    console.error(error);
                  });
              } else {
                alert(
                  "Application is offline. Please check your internet connection."
                );
              }
            };
  
            //cancel the comment
            $scope.Cancel = (singleComment) => {
              singleComment.editMode = false;
              $scope.formData.EditComment = "";
            };
  
            //---------------END OF COMMENTS-----------------------------
          },
        ],
      };
    },
  ]);
  