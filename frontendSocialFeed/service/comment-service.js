angular.module("myApp").service("commentService", [
  "$http",
  function ($http) {
    return {
      getAllComments: function () {
        return $http
          .get("http://localhost:8080/comments/", { cache: false })
          .then(function (response) {
            if (response.status === 200) {
              console.log("Get all comments successful.");
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
            throw error;
          });
      },

      addComment: function (comment) {
        return $http
          .post("http://localhost:8080/comments/", comment)
          .then(function (response) {
            if (response.status === 200) {
              console.log("Comments added successfully.");
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
      updateComment: function (commentId, commentData) {
        return $http
          .put("http://localhost:8080/comments/" + commentId, commentData)
          .then(function (response) {
            if (response.status === 200) {
              console.log("Comments updated successfully.");
              return response.data;
            }
            else {
              throw new Error("Failed to delete post");
            }
          })
          .catch(function (error) {
            if (error.response) {
              if (error.status === 400) {
                alert("Bad Request: Invalid data format");
              }

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
      deleteComment: function (commentId) {
        return $http
          .delete("http://localhost:8080/comments/" + commentId)
          .then(function (response) {
            if (response.status === 204) {
              console.log("Comments deleted successfully.");
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
    };
  },
]);
