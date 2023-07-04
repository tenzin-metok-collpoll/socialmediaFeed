angular.module("myApp").service("likedislikeService", ["$http", function($http) {
    return {
      getAlllikeDislike: function() {
        console.log("-------");
        return $http.get("http://localhost:8080/likeDislike/", { cache: false })
          .then(function(response) {
            console.log('response.data: ', response.data);
            return response.data;
          })
          .catch(function(error) {
            throw error;
          });
      },
      addlike: function(like) {
        console.log("-------+");
        return $http.post("http://localhost:8080/likeDislike/", like) // Pass like object as request payload
          .then(function(response) {
            return response.data; // Return the response if needed
          })
          .catch(function(error) {
            throw error;
          });
      },
      addDislike: function(dislike) {
        return $http.post("http://localhost:8080/likeDislike/",dislike) // Pass the ID of the like/dislike to be deleted
          .then(function(response) {
            return response.data; // Return the response if needed
          })
          .catch(function(error) {
            throw error;
          });
      },
    };
  }]);
  