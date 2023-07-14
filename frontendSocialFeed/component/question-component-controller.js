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
          "optionService",
          "answerService",
          "likedislikeService",
          function ($scope, postService, commentService, optionService, answerService) {
            $scope.options=[];
            $scope.checkbox=false;
            $scope.showBar=false;

               //setID for modal pop up
          $scope.setId = function (singlePost) {
            $scope.modalData = { value: singlePost };
            $(`#editModal${singlePost.id}`).modal("show");
          };


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
                    type: "question"
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

            $scope.addAnswer = function(optionId, userName) {
              $scope.checkbox=false; 
              $scope.showBar=true;

              let answer = {
                  optionId: optionId,
                  userName: userName
                };
              
                answerService
                .addAnswer(answer)
                .then(function (newAnswer) {
                  console.log("Post added successfully:", newAnswer);

                  if(newAnswer.optionId){
                    optionService.getOptionsById(newAnswer.optionId)
                    .then(function(newOption){
                      console.log('newOption:::::::: ', newOption);
                      $scope.pickedOption=newOption.content;
                    })
                    .catch(function (error) {
                      console.error(error);
                    });
                  }

                  // fetchComment();
                  // $scope.onDataUpdated({ data: newAnswer });
                })
                .catch(function (error) {
                  console.error(error);
                });
              };
          

            $scope.getOptionsByQuestionId = function (id) {
              // $scope.checkbox=true;
              console.log("data and id",id)
              if (navigator.onLine) {
                $scope.loading = true;
                optionService
                  .getOptionsByQuestionId(id)
                  .then(function (res) {
                    $scope.options = res;
                    console.log('res: ', res);
                   
                    // $scope.onDataUpdated({ data: id });
                    // Handle the successful deletion
                    console.log("get option successfully");
                    
                    // fetchPost();
                  })
                  .catch(function (error) {
                    console.error("Failed to get option:", error);
                  });
              } else {
                alert(
                  "Application is offline. Please check your internet connection."
                );
              }
            };

          },
        ],
      };
    },
  ]);
  