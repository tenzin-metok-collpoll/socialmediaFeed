angular.module("myApp").service("optionService", [
    "$http",
    function ($http) {
      return {
        getAllOption: function () {
          return $http
            .get("http://localhost:8080/options/", { cache: false })
            .then(function (response) {
              if (response.status === 200) {
                console.log("Get all options successful.");
                return response.data;
              }
              else {
                throw new Error("Failed to delete options");
              }
            })
            .catch(function (error) {
              if (error.response) {
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
              throw error;
            });
        },
        getOptionsByQuestionId: function (id) {
          return $http
            .get("http://localhost:8080/options/byId/"+ id, { cache: false })
            .then(function (response) {
              console.log('response: ', response);
              if (response.status === 200) {
                console.log("Get all options successful.");
                return response.data;
              }
              else {
                throw new Error("Failed to delete options");
              }
            })
            .catch(function (error) {
              if (error.response) {
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
              throw error;
            });
        },
  
        
        addOptionInBulk: function (options) {
          return $http
            .post("http://localhost:8080/options/bulk", options)
            .then(function (response) {
              if (response.status === 200) {
                console.log("options added successfully.");
                return response.data;
              }
              else {
                throw new Error("Failed to delete options");
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
  