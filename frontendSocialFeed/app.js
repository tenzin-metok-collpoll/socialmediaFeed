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
      .when("/share", {
        templateUrl: "views/share.html",
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
  "optionService",
  "$routeParams",
  "$rootScope",
  function ($scope, $http, postService, optionService, $routeParams,$rootScope) {
    var vm = this;

    // ... (existing code)

    vm.showErrorDiv = false; // Initialize the showErrorDiv variable

    $scope.loading = false;
    $scope.loadingComments = false;
    $scope.loadingDelete = false;
    $scope.loadingDislike = false;
    $scope.loadinglike = false;
    $scope.askQuestionMode = false;
    $scope.showfirstOption = false;
    $scope.id = 0;
    $scope.isDiv1Clicked = false;
    $scope.isDiv2Clicked = false;
    $scope.show = false;
    $scope.showPollOption = false;
    $scope.showOption2 = false;
    $scope.showOption3 = false;
    $scope.showOption4 = false;
    $scope.showErrorDiv = false;
    $scope.askquestion = false;
    $scope.addposts = false;
    $scope.isFirstOptionSelected = false;
$scope.isSecondOptionSelected = false;

    $scope.showSecondOption = false;
    
    $scope.allPosts = [];
    $scope.count = 0;
    $scope.temp;
    $scope.editMode = false;
    $scope.editModes = false;
    $scope.newComment = ""; // Initialize the new comment input
    $scope.showCommentInput = false; // Set initial state to show the comment input field
    $scope.userName = $routeParams.userName;
    $scope.description = $routeParams.description;
    $scope.postedTime = $routeParams.postedTime;
    getAllData();
    $scope.handleDataFromChild = function (data) {
      console.log("Data received from child:", data);
      getAllData();
    };
    $rootScope.$on("showErrorDivEvent", function () {
      console.log("inside the event");
      $scope.showErrorDiv=true;
      var errorDiv = document.getElementById("errorDiv");
      errorDiv.style.display = "block"; 
    });

    $scope.addOption = function () {
      if (!$scope.showOption2) {
        $scope.showOption2 = true;
      } else if (!$scope.showOption3) {
        $scope.showOption3 = true;
      } else if (!$scope.showOption4) {
        $scope.showOption4 = true;
      }
    };

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
      $scope.askquestion = false;
      $scope.show = false;
      $scope.story = "";
      $scope.userName = "";
      $scope.showPollOption = false;
      $scope.showfirstOption = false;
      $scope.showSecondOption = false;
      $scope.isDiv1Clicked = false;
      $scope.isDiv2Clicked = false;
      for (let i = 0; i <= $scope.options.length; i++) {
        console.log("called cancel ");
        $scope.cancelOption(i);
      }
      $scope.options.splice(0, 1);
      var errorDiv = document.getElementById("errorDiv");
      errorDiv.style.display = "none";
    };

    // adding a new post in feed
    $scope.addToFeed = () => {
      if (navigator.onLine) {
        $scope.loading = true;
        
        $scope.askquestion = false;
        const post = {
          userName: $scope.userName,
          description: $scope.story,
          type: "post",
        };

        //adding a post
        postService
          .createPost(post)
          .then(function (newPost) {
            console.log("Post added successfully:", newPost);
            if(newPost){
            $scope.show = false;
            $scope.story = "";
            $scope.userName = "";
          }

           
            getAllData();
          })
          .catch(function (error) {
            $rootScope.$on("showErrorDivEvent", function () {
              console.log("inside the event");
              $scope.showErrorDiv=true;
              var errorDiv = document.getElementById("errorDiv");
              errorDiv.style.display = "block"; 
            });
          });
      } else {
        //showErrorDiv();
      }
    };
    $scope.options = [];

    $scope.hasTextInPreviousOption = function (index) {
      if (index === 0) {
        return true; // For the first option, always return true
      } else {
        const prevOption = $scope.options[index - 1];
        return prevOption && prevOption.value.trim() !== "";
      }
    };

    // Updated addOption function
    $scope.addOption = function () {
      if ($scope.hasTextInPreviousOption($scope.options.length )) {
        $scope.options.push({ value: "" });
      } else {
        console.log("length",$scope.options.length - 1);
        alert("Please enter text in the previous option before adding a new option.");
      }
    };

    $scope.cancelOption = function (index) {
      $scope.options.splice(index, 1);
    };
    $scope.CancelPoll = function () {
      for (let i = 0; i < $scope.options.length; i++) {
        console.log("called cancel");
        $scope.cancelOption(i);
      }
      $scope.options.splice(0, 1);
    };

    $scope.addQuestion = () => {
      if (navigator.onLine) {
        $scope.loading = true;
        $scope.show = false;
        $scope.askquestion = false;

        const post = {
          userName: $scope.userName,
          description: $scope.story,
          type: "question",
        };
        //creating post with type question
        postService
          .createPost(post)
          .then(function (newPost) {
            console.log("Post added successfully:", newPost.id);
            $scope.story = "";
            $scope.userName = "";
            // getAllData();

            if ($scope.showfirstOption) {
              $scope.isFirstOptionSelected = false;
              if ($scope.isDiv2Clicked) {
                $scope.selectedOption = [
                  {
                    content: "True",
                    questionId: newPost.id,
                  },
                  {
                    content: "False",
                    questionId: newPost.id,
                  },
                ];
              }
              if ($scope.isDiv1Clicked) {
                $scope.selectedOption = [
                  {
                    content: "Strongly Agree",
                    questionId: newPost.id,
                  },
                  {
                    content: "Agree",
                    questionId: newPost.id,
                  },
                  {
                    content: "Neutral",
                    questionId: newPost.id,
                  },
                  {
                    content: "Disagree",
                    questionId: newPost.id,
                  },
                  {
                    content: "Strongly Disagree",
                    questionId: newPost.id,
                  },
                ];
              }
              console.log("$scope.selectedOption", $scope.selectedOption);
              optionService
                .addOptionInBulk($scope.selectedOption)
                .then(function (options) {
                  console.log("options: ", options);
                  console.log("Post added successfully:", newPost);

                  $scope.story = "";
                  $scope.userName = "";
                  $scope.showPollOption = false;
                  $scope.showfirstOption = false;
                  $scope.showSecondOption = false;
                  $scope.isDiv1Clicked = false;
                  $scope.isDiv2Clicked = false;
                  getAllData();
                })
                .catch(function (error) {
                 
                  $scope.showError = true;
                });
            } else if ($scope.showSecondOption) {
              $scope.newOption = [];
              $scope.isSecondOptionSelected=false;
              $scope.isFirstOptionSelected=false;
              $scope.isDiv2Clicked=false;
              $scope.isDiv1Clicked=false;
              $scope.isSecondOptionSelected = false;
              for (let i = 0; i < $scope.options.length; i++) {
                if ($scope.options[i].value.trim() !== "") {
                  let option = {
                    content: $scope.options[i].value,
                    questionId: newPost.id,
                  };
                  $scope.newOption.push(option);
                }
              }

              console.log("$scope.newOption", $scope.newOption);
              optionService
                .addOptionInBulk($scope.newOption)
                .then(function (options) {
                  console.log("options: ", options);
                  console.log("Options added successfully:", newPost);

                  $scope.story = "";
                  $scope.userName = "";
                  getAllData();
                })
                .catch(function (error) {
                  console.error(error);
                });
            }

            $scope.showSecondOption = false;
            $scope.showfirstOption = false;
            for (let i = 0; i <= $scope.options.length; i++) {
              console.log("called cancel ");
              $scope.cancelOption(i);
            }
            $scope.options.splice(0, 1);
          })
          .catch(function (error) {
            $rootScope.$on("showErrorDivEvent", function () {
              console.log("inside the event");
              $scope.showErrorDiv=true;
              var errorDiv = document.getElementById("errorDiv");
              errorDiv.style.display = "block"; 
            });
          });
      } else {
        $rootScope.$on("showErrorDivEvent", function () {
          console.log("inside the event");
          $scope.showErrorDiv=true;
          var errorDiv = document.getElementById("errorDiv");
          errorDiv.style.display = "block"; 
        });
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
            return posts;
          })
          .catch(function (error) {
            $rootScope.$on("showErrorDivEvent", function () {
              console.log("inside the event");
              $scope.showErrorDiv=true;
              var errorDiv = document.getElementById("errorDiv");
              errorDiv.style.display = "block"; 
            });
          });
      } else {
        $rootScope.$on("showErrorDivEvent", function () {
          console.log("inside the event");
          $scope.showErrorDiv=true;
          var errorDiv = document.getElementById("errorDiv");
          errorDiv.style.display = "block"; 
        });
      }
    }
    function showErrorDiv() {
      $scope.showErrorDiv=true;
      var errorDiv = document.getElementById("errorDiv");
      errorDiv.style.display = "block";
  }
  },
]);
