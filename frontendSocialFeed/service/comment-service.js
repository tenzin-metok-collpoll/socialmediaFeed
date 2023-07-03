angular.module("myApp").service("commentService", ["$http", function($http) {
    return {
        getAllComments : function (){
            console.log("-------");
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
            console.log("-------+",comment);
            return $http.post("http://localhost:8080/comment/", comment)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    throw error;
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
