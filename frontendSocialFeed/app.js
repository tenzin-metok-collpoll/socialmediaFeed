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

    $scope.id = 0;
    $scope.show = false;
    $scope.allPosts = [];
    $scope.count = 0;
    $scope.temp;
    $scope.editMode = false;
    $scope.editModes = false;
    $scope.newComment = ""; // Initialize the new comment input
    $scope.showCommentInput = false; // Set initial state to show the comment input field
    // getAllPosts();
    getAllData();
    
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
          // fetchPost();
          getAllData();
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    // get all post
    function getAllPosts() {
      postService
        .getAllPosts()
        .then(function (posts) {
          console.log("posts: ", posts);
          $scope.allPosts = posts;
        })
        .catch(function (error) {
          console.error("Error retrieving data:", error);
        });
    }
     // get all post
     function getAllData() {
      postService
        .getAllData()
        .then(function (posts) {
          console.log("posts:::::: ", posts);
          $scope.allPosts = posts;
        })
        .catch(function (error) {
          console.error("Error retrieving data:", error);
        });
    }
  },
]);
