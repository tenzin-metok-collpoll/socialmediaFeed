angular.module("myApp").service("commentService", ["$http", function($http) {
    return {
        getAllComments : function (){
            
            return $http.get("http://localhost:8080/comment/",{ cache: false })
            .then(function(response) {
                console.log('response.data: ', response.data);
                return response.data;
                
            })
            .catch(function(error) {
                throw error;
            });
        },
        // getPostById : function (){
        //     return $http.get("http://localhost:8080/post/")
        //     .then(function(response) {
        //         return response.data;
        //     })
        //     .catch(function(error) {
        //         throw error;
        //     });
        // },
        addComment: function(comment) {
            
         return $http.post("http://localhost:8080/comment/", comment,{
                transformResponse: [function(data) {
                    // Custom response transformation logic
                    try {   
                        let parsedData = JSON.parse(data);
                        console.log("-----",parsedData);
                        return parsedData;
                    } catch (error) {
                    //   console.error('Invalid JSON response:', data);
                      return data;
                    }
                  }]
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    if (error.status === 400) {
                        // Bad Request: Data sent is incorrect or not in the expected format
                        console.error('Bad Request: Invalid data format');
                      } else {
                        // Other errors
                        console.error('An error occurred:', error);
                      }
                });
            },
        updateComment: function(commentId, commentData) {
            return $http.put("http://localhost:8080/comment/" + commentId, commentData)
                .then(function(response) {
                    console.log('response.data: ', response.data);
                    return response.data;
                   
                })
                .catch(function(error) {
                    throw error;
                });
        },
        deleteComment: function(commentId) {
            return $http.delete("http://localhost:8080/comment/" + commentId)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    throw error;
                });
        }
    }
}])
