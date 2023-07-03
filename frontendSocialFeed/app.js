
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

angular.module("myApp").controller("myCtr", function ($scope,$http, $filter, $interval) {
  $scope.id = 0;
  $scope.show = false;
  $scope.allPosts = [
    {
      id:1,
      user_name: "Priya Agarwal",
      description:
        "PM Modi meets Elon Musk, discuss Tesla, Starlink India plans: All you need to know",
        posted_time: new Date('2023-04-04'),
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
      id:2,
      user_name: "Dhoni Singh",
      description:
        "India slams China for blocking proposal to designate 26/11 planner",
      posted_time: new Date('2023-05-01'),
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
      id:3,
      user_name: "Yuvraj",
      description:
        "submarine carrying five crew members disappeared on Sunday, American media is reporting. Internal US Department",
      likes: 10000,
      posted_time: new Date('2022-01-02'),
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
  let PostId=4;
  $scope.addToFeed = () => {
    $scope.show = false;
    const post = {
      id: PostId,
      user_name: $scope.userName,
      description: $scope.story,
      posted_time: new Date()
    };
  
    // $scope.allPosts.push(post);
    // $scope.story = "";
    // $scope.userName = "";
  
    // console.log("===after adding post to feed, allpost:", $scope.allPosts);
  
    $http.post('http://localhost:7020/post/', post)
      .then(function(response) {
        console.log('Post added successfully:', response);
        $scope.allPosts.push(post);
        $scope.story = '';
        $scope.userName = '';
        console.log('===after adding post to feed, allpost:', $scope.allPosts);
        PostId++;
      })
      .catch(function(error) {
        console.error('Error adding post:', error);
      });
  };
  
  // $http.get('http://localhost:7020/posts/')
  // .then(function(response) {
  //   console.log('Posts retrieved successfully:', response.data);
  //   $scope.allPosts = response.data; // Assuming the response data is an array of posts
  // })
  // .catch(function(error) {
  //   console.error('Error retrieving posts:', error);
  // });
  $http.get('http://localhost:7020/post/')
  .then(function(response) {
    console.log('Data retrieved successfully:', response.data,typeof(response.data));
    $scope.allData = response.data; // Assuming the response data is an array of objects
   $scope.allPosts = $scope.allPosts.concat(response.data);
  })
  .catch(function(error) {
    console.error('Error retrieving data:', error);
  });

  //delete http
  // $http.delete('http://localhost:7020/post/' + $scope.id)
  // .then(function(response) {
  //   console.log("id")
  //   console.log('Post deleted successfully');
  // })
  // .catch(function(error) {
  //   console.error('Failed to delete post:', error);
  // });

});
