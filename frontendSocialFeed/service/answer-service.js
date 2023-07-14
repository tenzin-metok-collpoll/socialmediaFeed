angular.module("myApp").service("answerService", [
    "$http",
    function ($http) {
      return {
        addAnswer: function (answer) {
          return $http
            .post("http://localhost:8080/answers/", answer)
            .then(function (response) {
                console.log('response: ', response);
              if (response.status === 200) {
                console.log("answers added successfully.");
                return response.data;
              }
              else {
                throw new Error("Failed to add answers");
              }
            })
            .catch(function (error) {
              if (error.response) {
                if (error.status === 400) {
                  // Bad Request: Data sent is incorrect or not in the expected format
                  alert("Bad Request: Invalid data format");
                }
  
                if (error.response.status === 404) {
                  alert("options not found.", "error");
                } else {
                  alert("An error occurred while fetching options.", "error");
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
  