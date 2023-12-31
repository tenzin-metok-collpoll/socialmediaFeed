angular.module("myApp").service("likedislikeService", [
  "$http","$rootScope",
  function ($http,$rootScope) {
    return {
      showErrorDiv: function () {
        showError = true;
        $rootScope.$broadcast("showErrorDivEvent");
      },
      getAlllikeDislike: function () {
        return $http
          .get("http://localhost:8080/likeDislike/", { cache: false })
          .then(function (response) {
            console.log("response.data: ", response.data);
            return response.data;
          })
          .catch(function (error) {
            throw error;
          });
      },
      addlike: function (like) {
        return $http
          .post("http://localhost:8080/likeDislike/", like) // Pass like object as request payload
          .then(function (response) {
            return response.data; // Return the response if needed
          })
          .catch(function (error) {
            $rootScope.$emit("showErrorDivEvent");
          });
      },
      addDislike: function (dislike) {
        return $http
          .post("http://localhost:8080/likeDislike/", dislike) // Pass the ID of the like/dislike to be deleted
          .then(function (response) {
            return response.data; // Return the response if needed
          })
          .catch(function (error) {
            $rootScope.$emit("showErrorDivEvent");
          });
      },
    };
  },
]);
