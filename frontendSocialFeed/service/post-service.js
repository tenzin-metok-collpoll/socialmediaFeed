angular.module("myApp").service("postService", [
  "$http",
  function ($http) {
    return {

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
          if (error.response) {
            if (error.response.status === 404) {
              alert("Data not found.", "error");
            } else {
              alert("An error occurred while fetching post.", "error");
            }
          } else if (error.request) {
            alert("No response received from the server.", "error");
          } else {
            alert("An error occurred while making the request.", "error");
          }
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
            if (error.response) {
              if (error.status === 400) {
                // Bad Request: Data sent is incorrect or not in the expected format
                alert("Bad Request: Invalid data format");
              }
      
              if (error.response.status === 404) {
                alert("post not found.", "error");
              } else {
                alert("An error occurred while fetching post.", "error");
              }
            } else if (error.request) {
              alert("No response received from the server.", "error");
            } else {
              alert("An error occurred while making the request.", "error");
            }
          });
      },
      createPost: function (postData) {
        return $http
          .post("http://localhost:8080/posts/", postData)

          .then(function (response) {
            if (response.status === 200) {
              console.log("Post created successfully");
              return response.data;
            }
            else {
              throw new Error("Failed to delete post");
            }
          })
          .catch(function (error) {
            if (error.response) {
              if (error.status === 400) {
                // Bad Request: Data sent is incorrect or not in the expected format
                alert("Bad Request: Invalid data format");
              }
              if (error.response.status === 404) {
                alert("post not found.", "error");
              } 
              else {
                alert("An error occurred while fetching post.", "error");
              }
            } else if (error.request) {
              alert("No response received from the server.", "error");
            } else {
              alert("An error occurred while making the request.", "error");
            }
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
            if (error.response) {
              if (error.status === 400) {
                // Bad Request: Data sent is incorrect or not in the expected format
                alert("Bad Request: Invalid data format");
              }
              if (error.response.status === 404) {
                alert("post not found.", "error");
              } else {
                alert("An error occurred while fetching post.", "error");
              }
            } else if (error.request) {
              alert("No response received from the server.", "error");
            } else {
              alert("An error occurred while making the request.", "error");
            }
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
            if (error.response) {
              if (error.status === 400) {
                // Bad Request: Data sent is incorrect or not in the expected format
                alert("Bad Request: Invalid data format");
              }
              if (error.response.status === 404) {
                alert("post not found.", "error");
              } 
              else {
                alert("An error occurred while fetching post.", "error");
              }
            } else if (error.request) {
              alert("No response received from the server.", "error");
            } else {
              alert("An error occurred while making the request.", "error");
            }
          });
      },
    };
  },
]);
