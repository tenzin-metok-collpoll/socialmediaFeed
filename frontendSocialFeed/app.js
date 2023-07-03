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
    fetchPost();
    $scope.Edit = () => {
      if ($scope.editMode) {
        // Save changes
        $scope.editMode = false;
      } else {
        // Enter edit mode
        $scope.editMode = true;
      }
    };
    //cancel feed
    $scope.CancelFeed = () => {
      $scope.show = false;
      $scope.story = "";
      $scope.userName = "";
    };
    // const updateTime = () => {
    //   let post = [];
    //   $scope.allPosts.forEach((singlePost) => {
    //     // console.log("SinglePost",singlePost);
    //     post.posted = $filter("timeAgo")(singlePost);
    //     // console.log("posted",singlePost.posted);
    //   });
    // };


    // Update the time every second
    // $interval(updateTime, 1000);

    // adding a new content in feed
    $scope.addToFeed = () => {
      $scope.show = false;
      const post = {
        user_name: $scope.userName,
        description: $scope.story,
        posted_time: new Date(),
      };
      //adding a post
      postService
        .createPost(post)
        .then(function (newPost) {
          console.log("Post added successfully:", newPost);

          $scope.story = "";
          $scope.userName = "";
          // Handle the newly created post
          console.log(newPost);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    fetchPost();

    // };
    function fetchPost() {
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
  },
]);
