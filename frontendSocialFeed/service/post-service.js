angular.module("myApp").service("postService", ["$http", function($http) {
    return {
        getAllPosts : function (){
            console.log("-------++++");
            return $http.get("http://localhost:8080/post/",{ cache: false })
            .then(function(response) {
                console.log('response.data: ', response.data);
                return response.data;
                
            })
            .catch(function(error) {
                throw error;
            });
        },
        getPostById : function (){
            return $http.get("http://localhost:8080/post/")
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                throw error;
            });
        },
        createPost: function(postData) {
            console.log("-------+");
            return $http.post("http://localhost:8080/post/", postData)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    throw error;
                });
        },
        updatePost: function(postId, postData) {
            return $http.put("http://localhost:8080/post/" + postId, postData)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    throw error;
                });
        },
        deletePost: function(postId) {
            return $http.delete("http://localhost:8080/post/" + postId)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    throw error;
                });
        }
    }
}])
