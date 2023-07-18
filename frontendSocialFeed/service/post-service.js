angular.module("myApp").service("postService", [
  "$http",
  "$rootScope",
  function ($http,$rootScope) {
    var showError = false; 
    var service = this;
    return {
     
      showErrorDiv: function () {
        showError = true;
        $rootScope.$broadcast("showErrorDivEvent");
      },
      getAllPosts: function () {
        return $http
          .get("http://localhost:8080/posts/", { cache: false })
          .then(function (response) {
            if (response.status === 200) {
              console.log("Get postByPost successful.");
              return response.data;
            }
            else {
              throw new Error("Failed to delete post");
            }
          })
          .catch(function (error) {
            if (error.response) {
              if (error.response.status === 404) {
                alert("Comments not found.", "error");
              } else {
                alert("An error occurred while fetching comments.", "error");
              }
            } else if (error.request) {
              alert("No response received from the server.", "error");
            } else {
              alert("An error occurred while making the request.", "error");
            }
          });
         
      },

      getAllData: function (){
        return $http 
        .get("http://localhost:8080/posts/getAllData")
        .then(function (response) {
          if (response.status === 200) {
            console.log("Get allData successful.");
            return response.data;
          }
          else {
            throw new Error("Failed to delete post");
          }
        })
        .catch(function (error) {
          // $rootScope.$emit("showErrorDivEvent");
          throw new Error("Failed to getAll post");
        });
      },
       getPostById: function () {
        return $http
          .get("http://localhost:8080/posts/")
          .then(function (response) {
            if (response.status === 200) {
              console.log("Get postById successful.");
              return response.data;
            }
            else {
              throw new Error("Failed to delete post");
            }
          })
          .catch(function (error) {
            $rootScope.$emit("showErrorDivEvent");
          });
      },
      createPost: function (postData) {
        return $http
          .post("http://localhost:8080/posts/", postData)

          .then(function (response) {
            // console.log('response:::: ', response);
            if (response.status === 200) {
              console.log("Post created successfully");
              return(response.data);
            }
            else {
              throw new Error("Failed to delete post");
            }
          })
          .catch((error) => {
            // Display the error div instead of the alert
            $rootScope.$emit("showErrorDivEvent");

            // Handle other error scenarios if needed
          });
      },
      updatePost: function (postId, postData) {
        return $http
          .put("http://localhost:8080/posts/" + postId, postData)
          .then(function (response) {
            if (response.status === 200) {
              // toastr.success("Post updated successfully");
              return response.data;
            }
            else {
              throw new Error("Failed to delete post");
            }
          })
          .catch(function (error) {
            $rootScope.$emit("showErrorDivEvent");
          });
      },
      deletePost: function (postId) {
        console.log("postId: ", postId);
        return $http
          .delete("http://localhost:8080/posts/" + postId)
          .then(function (response) {
            if (response.status === 204) {
              console.log("Post deleted successfully");
              return response.data;
            }
            else {
              throw new Error("Failed to delete post");
            }
          })
          .catch(function (error) {
            console.log('error: ', error.response);
            $rootScope.$emit("showErrorDivEvent");
          });
      },
    };
  },
]);
