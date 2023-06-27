//component directive
angular.module("myApp").directive("postComponent", function () {
  return {
    restrict: "E",
    scope: {
      data: "=",
      allPosts: "=",
      // Two-way binding for the data attribute
    },
    templateUrl: "/component/postComponent.html",
    controller: [
      "$scope",
      function ($scope) {
        $scope.setId = function (singlePost) {
          var id = $scope.allPosts.indexOf(singlePost);
          $scope.allPosts.id = id;
          // console.log(=);
          
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
            $scope.data.comments.push({
              content: singlePost.val,
              editMode: false,
            });
            singlePost.val = "";
          }
        };
       
        //save changes to edit content feed
        $scope.saveChanges =  ()=> {
          if($scope.editedContent===undefined){
              $scope.allPosts[$scope.allPosts.id].messg = $scope.allPosts[$scope.allPosts.id].messg;
            }
            else{
              $scope.allPosts[$scope.allPosts.id].messg=$scope.editedContent;
            }
            $scope.editMode = false;
         
        };
        // delete a feed
        $scope.deleteFeed = (singlePost) => {
          $scope.allPosts.splice($scope.allPosts.indexOf($scope.data) , 1)
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
});