angular.module("myApp").service("postService", [
  "$http",
  function ($http) {
    return {
      getAllPosts: function () {
        return $http
          .get("http://localhost:8080/posts/", { cache: false })
          .then(function (response) {
            console.log("response.data: ", response.data);
            return response.data;
          })
          .catch(function (error) {
            throw error;
          });
      },

      getAllData: function (){
        return $http 
        .get("http://localhost:8080/posts/getAllData")
        .then(function (response) {
          console.log("response.data:::::::::: ", response);
          return response.data;
        })
        .catch(function (error) {
          throw error;
        });
      },
       getPostById: function () {
        return $http
          .get("http://localhost:8080/posts/")
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            throw error;
          });
      },
      createPost: function (postData) {
        return $http
          .post("http://localhost:8080/posts/", postData)

          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            throw error;
          });
      },
      updatePost: function (postId, postData) {
        return $http
          .put("http://localhost:8080/posts/" + postId, postData)
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            throw error;
          });
      },
      deletePost: function (postId) {
        console.log("postId: ", postId);
        return $http
          .delete("http://localhost:8080/posts/" + postId)
          .then(function (response) {
            console.log("response: ", response);
            return response.data;
          })
          .catch(function (error) {
            throw error;
          });
      },
    };
  },
]);
