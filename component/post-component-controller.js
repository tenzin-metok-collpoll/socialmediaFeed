//component directive
angular.module("myApp").directive("postComponent", function () {
    return {
      restrict: "E",
      scope: {
        data: "=",
        // Two-way binding for the data attribute
      },
      templateUrl: "/component/postComponent.html",
      controller: [
        "$scope",
        function ($scope) {
          console.log("--------");
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
          $scope.saveChanges = () => {
            if ($scope.editedContent === undefined) {
              console.log('$scope.editedContent: ', $scope.editedContent);
              $scope.data.messg = $scope.data.messg;
            } else {
              onsole.log('$scope.editedContent: ', $scope.editedContent);
              $scope.data.messg = $scope.editedContent;
            }
            $scope.editMode = false;
          };
          // delete a feed
          $scope.deleteFeed = (singlePost) => {
            console.log("singlePost: ", singlePost);
            $scope.data.splice($scope.allPost.findIndex(a => a.name === singlePost.name) , 1)
            console.log('$scope.data: ', $scope.data);
            console.log("------after deleting feed", $scope.allPosts);
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