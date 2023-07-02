
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

angular.module("myApp").controller("myCtr", function ($scope, $filter, $interval) {
  $scope.id = 0;
  $scope.show = false;
  $scope.allPosts = [
    {
      name: "Priya Agarwal",
      messg:
        "PM Modi meets Elon Musk, discuss Tesla, Starlink India plans: All you need to know",
      posted: new Date('2023-04-04'),
      likes: 56,
      dislike: 4,

      comments: [
        {
          content: "30-minute intervals",
          editMode: false,
        },
        {
          content: "disappeared on Sunday",
          editMode: false,
        },
      ],
    },
    {
      name: "Dhoni Singh",
      messg:
        "India slams China for blocking proposal to designate 26/11 planner",
      posted: new Date('2023-05-01'),
      likes: 3,
      dislike: 43,

      comments: [
        {
          content: "Internal US Department",
          editmode: false,
        },
        {
          content: "🔥🔥🔥🔥🔥🔥",
          editmode: false,
        },
        {
          content: "🤣🤣🤣🤣",
          editmode: false,
        },
      ],
    },
    {
      name: "Yuvraj",
      messg:
        "submarine carrying five crew members disappeared on Sunday, American media is reporting. Internal US Department",
      likes: 10000,
      posted: new Date('2022-01-02'),
      dislike: 122,
      comments: [
        {
          content: "🥳🥳🥳🥳🥳🥳🥳🥳",
          editmode: false,
        },
      ],
    },
  ];
  $scope.count = 0;
  $scope.temp;
  $scope.editMode = false;
  $scope.editModes = false;
  $scope.newComment = ""; // Initialize the new comment input
  $scope.showCommentInput = false; // Set initial state to show the comment input field

  $scope.Edit = () => {
    if ($scope.editMode) {
      // Save changes
      $scope.editMode = false;
    } else {
      // Enter edit mode
      $scope.editMode = true;
    }
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
    $scope.allPosts.push({
      name: $scope.userName,
      messg: $scope.story,
      likes: 0,
      dislike: 0,
      posted: new Date(),
      comments: [],
    });
    $scope.story = "";
    $scope.userName = "";
    console.log("===after adding post to feed, allpost :", $scope.allPosts);
  };

});
