angular.module("myApp").service("commentService", [
  "$http",
  function ($http) {
    return {
      getAllComments: function () {
        return $http
          .get("http://localhost:8080/comments/", { cache: false })
          .then(function (response) {
            console.log("response.data: ", response.data);
            return response.data;
          })
          .catch(function (error) {
            throw error;
          });
      },

      addComment: function (comment) {
        return $http
          .post("http://localhost:8080/comments/", comment)
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            if (error.status === 400) {
              // Bad Request: Data sent is incorrect or not in the expected format
              console.error("Bad Request: Invalid data format");
            } else {
              // Other errors
              console.error("An error occurred:", error);
            }
          });
      },
      updateComment: function (commentId, commentData) {
        return $http
          .put("http://localhost:8080/comments/" + commentId, commentData)
          .then(function (response) {
            console.log("response.data: ", response.data);
            return response.data;
          })
          .catch(function (error) {
            throw error;
          });
      },
      deleteComment: function (commentId) {
        return $http
          .delete("http://localhost:8080/comments/" + commentId)
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            throw error;
          });
      },
    };
  },
]);
