//component directive
angular.module("myApp").directive("postComponent", [
  "$http",
  function ($http) {
    return {
      restrict: "E",
      scope: {
        data: "=",
        allPosts: "=",
        onDataUpdated: "&",
        // Two-way binding for the data attribute
      },
      templateUrl: "component/postComponent.html",

      controller: [
        "$scope",
        "postService",
        "commentService",
        "likedislikeService",
        "$rootScope",
        function (
          $scope,
          postService,
          commentService,
          likedislikeService,
          $rootScope
        ) {
          $scope.commentArr = [];
          $scope.newComment = {};
          $scope.likeArr = [];
          $scope.newLike = {};
          $scope.likeCounter = 0;
          $scope.showErrorDiv = false;
          $scope.dislikeCounter = 0;
          $scope.formData = {
            editedComment: "",
            editModes: false,
          };

          //-------------- POST --------------------

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
                  type: "post",
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
                    $rootScope.$on("showErrorDivEvent", function () {
                      console.log("inside the event");
                      $scope.showErrorDiv = true;
                      var errorDiv = document.getElementById("errorDiv");
                      errorDiv.style.display = "block";
                    });
                  });
              }
            } else {
              $rootScope.$on("showErrorDivEvent", function () {
                console.log("inside the event");
                $scope.showErrorDiv = true;
                var errorDiv = document.getElementById("errorDiv");
                errorDiv.style.display = "block";
              });
            }
          };

          // delete a post
          $scope.deleteFeed = function (singlePost) {
            if (navigator.onLine) {
              // $scope.loading = true;
              postService
                .deletePost(singlePost.id)
                .then(function (res) {
                  if (res === "") {$scope.onDataUpdated({ data: singlePost.id });}
                  
                })
                .catch(function (error) {
                  $rootScope.$on("showErrorDivEvent", function () {
                    console.log("inside the event delete feed");
                    $scope.showErrorDiv = true;
                    var errorDiv = document.getElementById("errorDiv");
                    errorDiv.style.display = "block";
                    setTimeout(function () {
                      console.log(
                        "inside the div of delete fedd in settimeout"
                      );
                      errorDiv.style.display = "none";
                      $scope.showErrorDiv = false;
                    }, 2000);
                  });
                });
            } else {
              $rootScope.$on("showErrorDivEvent", function () {
                console.log("inside the event delete feed");
                $scope.showErrorDiv = true;
                var errorDiv = document.getElementById("errorDiv");
                errorDiv.style.display = "block";
                setTimeout(function () {
                  errorDiv.style.display = "none";
                  $scope.showErrorDiv = false;
                }, 2000);
              });
            }
          };

          //---------------END OF POST---------------------------

          //---------------COMMENTS-----------------------------

          //add comments
          $scope.addComment = (singlePost) => {
            if (navigator.onLine) {
              $scope.loadingComments = true;
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
                    $rootScope.$on("showErrorDivEvent", function () {
                      console.log("inside the event");
                      $scope.showErrorDiv = true;
                      var errorDiv = document.getElementById("errorDiv");
                      errorDiv.style.display = "block";
                    });
                  });
              }
            } else {
              $rootScope.$on("showErrorDivEvent", function () {
                console.log("inside the event");
                $scope.showErrorDiv = true;
                var errorDiv = document.getElementById("errorDiv");
                errorDiv.style.display = "block";
              });
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
              $scope.loadingDelete = true;
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
                  $rootScope.$on("showErrorDivEvent", function () {
                    console.log("inside the event");
                    $scope.showErrorDiv = true;
                    var errorDiv = document.getElementById("errorDiv");
                    errorDiv.style.display = "block";
                    setTimeout(function () {
                      errorDiv.style.display = "none";
                      $scope.showErrorDiv = false;
                    }, 2000);
                  });
                });
            } else {
              $rootScope.$on("showErrorDivEvent", function () {
                console.log("inside the event");
                $scope.showErrorDiv = true;
                var errorDiv = document.getElementById("errorDiv");
                errorDiv.style.display = "block";
                setTimeout(function () {
                  errorDiv.style.display = "none";
                  $scope.showErrorDiv = false;
                }, 2000);
              });
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
              $scope.loadingComments = true;
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
                  $rootScope.$on("showErrorDivEvent", function () {
                    console.log("inside the event");
                    $scope.showErrorDiv = true;
                    var errorDiv = document.getElementById("errorDiv");
                    errorDiv.style.display = "block";
                  });
                });
            } else {
              $rootScope.$on("showErrorDivEvent", function () {
                console.log("inside the event");
                $scope.showErrorDiv = true;
                var errorDiv = document.getElementById("errorDiv");
                errorDiv.style.display = "block";
              });
            }
          };

          //cancel the comment
          $scope.Cancel = (singleComment) => {
            singleComment.editMode = false;
            $scope.formData.EditComment = "";
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
                $rootScope.$on("showErrorDivEvent", function () {
                  console.log("inside the event like and dislike");
                  $scope.showErrorDiv = true;
                  var errorDiv = document.getElementById("errorDiv");
                  errorDiv.style.display = "block";
                });
              });
          }

          // increment likes
          $scope.incrementLike = (singlePost) => {
            if (navigator.onLine) {
              $scope.loadinglike = true;
              const newlike = {
                userName: singlePost.userName,
                type: "like",
                postId: singlePost.id,
              };

              likedislikeService
                .addlike(newlike)
                .then(function (newlike) {
                  console.log("like added successfully:", newlike);
                  $scope.onDataUpdated({ data: newlike });
                  // Update the likes count in the singlePost object
                  // singlePost.likes += 1;
                  // $scope.likeCounter = 0;
                  // $scope.dislikeCounter = 0;
                  singlePost.val = "";
                })
                .catch(function (error) {
                  $rootScope.$on("showErrorDivEvent", function () {
                    console.log("inside the event like and dislike");
                    $scope.showErrorDiv = true;
                    var errorDiv = document.getElementById("errorDiv");
                    errorDiv.style.display = "block";
                  });
                });
            } else {
              $rootScope.$on("showErrorDivEvent", function () {
                console.log("inside the event like and dislike");
                $scope.showErrorDiv = true;
                var errorDiv = document.getElementById("errorDiv");
                errorDiv.style.display = "block";
              });
            }
          };

          //increment dislike
          $scope.decrementLike = (singlePost) => {
            if (navigator.onLine) {
              $scope.loadingDislike = true;
              const newDislike = {
                userName: singlePost.userName,
                type: "dislike",
                postId: singlePost.id,
              };

              likedislikeService
                .addDislike(newDislike)
                .then(function (newDislike) {
                  console.log("dislike added successfully:", newDislike);
                  // Update the dislikes count in the singlePost object
                  // fetchLikeDislike();
                  $scope.onDataUpdated({ data: newDislike });
                  singlePost.dislikes += 1;
                  $scope.likeCounter = 0;
                  $scope.dislikeCounter = 0;
                  singlePost.val = "";
                })
                .catch(function (error) {
                  $rootScope.$on("showErrorDivEvent", function () {
                    console.log("inside the event");
                    $scope.showErrorDiv = true;
                    var errorDiv = document.getElementById("errorDiv");
                    errorDiv.style.display = "block";
                  });
                });
            } else {
              $rootScope.$on("showErrorDivEvent", function () {
                console.log("inside the event");
                $scope.showErrorDiv = true;
                var errorDiv = document.getElementById("errorDiv");
                errorDiv.style.display = "block";
              });
            }
          };

          // //check condition
          // $scope.checkCondition = function (item, data) {
          //   if (item.type === "like" && item.post_id === data.id) {
          //     $scope.incrementLikeCounter();
          //   }
          //   if (item.type === "dislike" && item.post_id === data.id) {
          //     $scope.incrementDislikeCounter();
          //   }
          // };

          // //increment the like counter
          // $scope.incrementLikeCounter = function () {
          //   $scope.likeCounter++;
          // };

          // //increment dislike counter
          // $scope.incrementDislikeCounter = function () {
          //   $scope.dislikeCounter++;
          // };

          //---------------END OF LIKE AND DISLIKE-----------------------------
        },
      ],
    };
  },
]);
