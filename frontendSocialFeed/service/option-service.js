angular.module("myApp").service("optionService", [
    "$http","$rootScope",
    function ($http,$rootScope) {
      return {
        showErrorDiv: function () {
          showError = true;
          $rootScope.$broadcast("showErrorDivEvent");
        },
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
              $rootScope.$emit("showErrorDivEvent");
            });
        },
        getOptionsById: function (id) {
          return $http
            .get("http://localhost:8080/options/"+ id, { cache: false })
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
              $rootScope.$emit("showErrorDivEvent");
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
              // if (error.response) {
              //   if (error.response.status === 404) {
              //     alert("options not found.", "error");
              //   } else {
              //     alert("An error occurred while fetching options.", "error");
              //   }
              // } else if (error.request) {
              //   alert("No response received from the server.", "error");
              // } else {
              //   alert("An error occurred while making the request.", "error");
              // }
              // throw error;
              $rootScope.$emit("showErrorDivEvent");

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
              $rootScope.$emit("showErrorDivEvent");
            });
        },
        
      };
    },
  ]);
  