//component directive
angular.module("myApp").directive("postComponent",['$http', function ($http) {
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
        function ($scope) {
          $scope.setId = function (singlePost) {
            let index = $scope.allPosts.indexOf(singlePost);
            $scope.allPosts.id = index;
            // console.log(=);
            console.log("Setid",index);
            
          };
          //update post
          $scope.Edit = function () {
            if ($scope.editMode) {
              // Save changes
              let url = 'http://localhost:7020/post/' + $scope.data.id;
        
              $http.put(url, $scope.data)
                .then(function (response) {
                  console.log('Post updated successfully');
                  $scope.editMode = false;
                })
                .catch(function (error) {
                  console.error('Failed to update post:', error);
                });
            } else {
              // Enter edit mode
              $scope.editMode = true;
            }
          }
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
              $scope.data.comments.push({
                content: singlePost.val,
                editMode: false,
              });
              singlePost.val = "";
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
          $scope.saveChanges = function (singlePost) {
            if ($scope.editedContent === undefined) {
              $scope.editMode = false;
            } else {
              let updatedPost = $scope.data
              console.log("index",updatedPost)
              updatedPost.description = $scope.editedContent;
             console.log("update post id",updatedPost.index)
              let url = 'http://localhost:7020/post/' + singlePost.id;
             updatedPost = $scope.allPosts.findIndex(post => post.id === singlePost.id);
              $http.put(url, updatedPost)
                .then(function (response) {
                  console.log('Post updated successfully in save');
                 
                  if (postIndex !== -1) {
                    $scope.allPosts[postIndex].description = $scope.editedContent;
                  }
                  $scope.editMode = false;
                })
                .catch(function (error) {
                  console.error('Failed to update post:', error);
                });
            }
          };
          
          // delete a feed
          $scope.deleteFeed = function(singlePost) {
            let url = 'http://localhost:7020/post/' + singlePost.id;
            console.log("singlepost id",singlePost.id)
          
            $http.delete(url)
              .then(function(response) {
                console.log('Post deleted successfully');
                // Remove the post from the $scope.allPosts array
                var index = $scope.allPosts.indexOf(singlePost);
                if (index > -1) {
                  $scope.allPosts.splice(index, 1);
                }
              })
              .catch(function(error) {
                console.error('Failed to delete post:', error);
              });
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
            var index = $scope.data.comments.indexOf(singleComment);
            console.log("$scope.data.comments: ", $scope.data.comments);
            console.log("index: ", index);
            if (index > -1) {
              $scope.data.comments.splice(index, 1); // Remove the comment from the comments array
            }
            $scope.editMode = false;
         
        };
        // delete a feed
        // $scope.deleteFeed = (singlePost) => {
        //   $scope.allPosts.splice($scope.allPosts.indexOf($scope.data) , 1)
        // };
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
          var index = $scope.data.comments.indexOf(singleComment);
          console.log("$scope.data.comments: ", $scope.data.comments);
          console.log("index: ", index);
          if (index > -1) {
            $scope.data.comments.splice(index, 1); // Remove the comment from the comments array
          }
        };
        $scope.cancelAddComment = (singlePost) => {
          showCommentInput = false;
          singlePost.val = "";
        };
        //cancel feed
        $scope.CancelFeed = () => {
          $scope.show = false;
          $scope.story = "";
          $scope.userName = "";
        };

        //save comments
        $scope.Update = (singleComment) => {
          singleComment.editMode = false;
          singleComment.content = singleComment.editedComment;
        };
        $scope.Cancel = (singleComment) => {
          singleComment.editMode = false;
          $scope.story = "";
          $scope.userName = "";
        };
      },
    ],
  };
}]);