angular.module("myApp", ["ngRoute"]).config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
      })
      .when("/about", {
        templateUrl: "views/about.html",
      })
      .when("/question", {
        templateUrl: "views/question.html",
      })
      .when("/feed", {
        templateUrl: "views/feed.html",
        styleUrls: ["/css/index.css"],
        controller: "myCtr",
      })
      .otherwise({
        redirectTo: "home",
      });
  },
]);

angular.module("myApp").controller("myCtr", [
  "$scope",
  "$http",
  "postService",
  function ($scope, $http, postService) {
    var vm = this;
    $scope.loading = false;
    $scope.loadingComments=false;
    $scope.loadingDelete=false;
    $scope.loadingDislike=false;
    $scope.loadinglike=false;
    $scope.id = 0;
    $scope.show = false;
    $scope.allPosts = [];
    $scope.count = 0;
    $scope.temp;
    $scope.editMode = false;
    $scope.editModes = false;
    $scope.newComment = ""; // Initialize the new comment input
    $scope.showCommentInput = false; // Set initial state to show the comment input field

    getAllData();
    $scope.handleDataFromChild = function(data) {
      console.log('Data received from child:', data);
      getAllData();
    };

    // $scope.parseAndAssignComments = function(post) {
    //   post.comments = parseComments(post.comments);
    // };

    // function parseComments(commentsArray) {
    //   if (Array.isArray(commentsArray)) {
    //     return commentsArray.map(function(commentString) {
    //        parts = commentString.split(',');
    //       return {
    //         text: parts[0],
    //         id: parts[1],
    //         editMode: false
    //       };
    //     });
    //   } else {
    //     return [];
    //   }
    // }

    
    $scope.Edit = () => {
      if ($scope.editMode) {
        // Save changes
        $scope.editMode = false;
      } else {
        // Enter edit mode
        $scope.editMode = true;
      }
    };
    //cancel a add post
    $scope.CancelFeed = () => {
      $scope.show = false;
      $scope.story = "";
      $scope.userName = "";
    };

    // adding a new post in feed
    $scope.addToFeed = () => {
      if (navigator.onLine) {
        $scope.loading = true;
      $scope.show = false;
      const post = {
        userName: $scope.userName,
        description: $scope.story,
      };

      //adding a post
      postService
        .createPost(post)
        .then(function (newPost) {
          console.log("Post added successfully:", newPost);

          $scope.story = "";
          $scope.userName = "";
          getAllData();
        })
        .catch(function (error) {
          console.error(error);
        })
      } else {
        alert("Application is offline. Please check your internet connection.");
      }
    };

 
     function getAllData() {
      if (navigator.onLine) {
      // $scope.loading = true;
      postService
        .getAllData()
        .then(function (posts) {
          $scope.loading = false;
          $scope.allPosts = posts;
        })
        .catch(function (error) {
          console.error("Error retrieving data:", error);
        });
    }
    else {
      alert("Application is offline. Please check your internet connection.");
    }}
  },

  
]);
