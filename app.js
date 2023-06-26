let myApp=angular.module("myApp",['ngRoute','ngAnimate']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
      .when('/home', {
          templateUrl: 'views/home.html',
      })
      .when('/about', {
          templateUrl: 'views/about.html'
      })
      .when('/question', {
        templateUrl: 'views/question.html'
       })
      .when('/feed', {
          templateUrl: 'views/feed.html',
          styleUrls:'/css/index.css',
          controller: 'myCtr'
      })
      .otherwise({
          redirectTo: 'home'
      });
}]);


//component directive
myApp.directive('postComponent', function() {
  return {
    restrict: 'EAC',
    scope: {
      data: '=' ,
      allpost: '='
      // Two-way binding for the data attribute
    },
    templateUrl: 'postComponent.html',
    controller: 'myCtr',

  };
});

myApp.controller('myCtr',function($scope, $filter,$interval){
  $scope.id=0;
  $scope.show=false;
  $scope.allPosts=[{
    name: "Priya Agarwal",
    messg:"PM Modi meets Elon Musk, discuss Tesla, Starlink India plans: All you need to know",
    posted:new Date(),
    likes:56,
    dislike: 4,
  
    comments: [{
      content: "30-minute intervals",
      editMode:false},
      {
      content: "disappeared on Sunday",
      editMode: false }]
  },
{
  name:"Dhoni Singh",
  messg:"India slams China for blocking proposal to designate 26/11 planner",
  posted:new Date(),
  likes:3,
  dislike: 43,

  comments: [{
    content:"Internal US Department",
    editmode:false
    },{
      content:"🔥🔥🔥🔥🔥🔥",
      editmode:false
    },{
      content:"🤣🤣🤣🤣",
      editmode:false
    }
    
    ]
},
{
name: "Yuvraj",
messg: "submarine carrying five crew members disappeared on Sunday, American media is reporting. Internal US Department",
likes: 10000,
posted:new Date(),
dislike: 122,
comments: [{
  content: "🥳🥳🥳🥳🥳🥳🥳🥳",
  editmode:false
}]
}];
  $scope.count=0;
  $scope.temp;
  $scope.editMode = false;
  $scope.editModes = false;
  $scope.newComment = ''; // Initialize the new comment input
  $scope.showCommentInput = false; // Set initial state to show the comment input field
 
  $scope.Edit = () =>{
    if ($scope.editMode) {
      // Save changes
      $scope.editMode = false;
    } else {
      // Enter edit mode
      $scope.editMode = true;
    }
  };
  const updateTime = () => {
    let post = [];
    $scope.allPosts.forEach((singlePost) => {
      // console.log("SinglePost",singlePost);
      post.posted = $filter('timeAgo')(singlePost);
      // console.log("posted",singlePost.posted);
    });
  }
  

  // Update the time every second
  $interval(updateTime, 1000);

  $scope.setId =  (singlePost)=>{
    console.log('====singlePost: ', singlePost);
    let id=$scope.allPosts.indexOf(singlePost);
    console.log('singlePost: ', singlePost);
    $scope.id=id;
  }
  // adding a new content in feed
  $scope.addToFeed = ()=> {
      $scope.show=false;
      $scope.allPosts.push({
        name: $scope.userName,
        messg:$scope.story,
        likes:0,
        dislike: 0,
        posted:new Date(),
        comments: []
      });
      $scope.story="";
      $scope.userName="";
      console.log("===after adding post to feed, allpost :",$scope.allPosts);
  };
  //likes
  $scope.incrementLike = (singlePost)=>{
    console.log('after adding like singlePost: ', singlePost);
    console.log("after adding like allpost: ",$scope.allPosts);
  //  let indexx= $scope.allPosts.indexOf(singlePost);
  let indexx = $scope.allPosts.indexOf(singlePost);
    console.log('$scope.allPosts: ', $scope.allPosts);
    console.log('indexx: ', indexx);
    $scope.allPosts[indexx].likes+=1;
  };
  //dislike
  $scope.decrementLike = (singlePost)=>{
    let indexx = $scope.allPosts.indexOf(singlePost);
    $scope.allPosts[indexx].dislike+=1;
    console.log($scope.allPosts);
  };
  $scope.onShow = function () {
    $scope.show = true;
  };
//add comments
$scope.addComment =  (singlePost) =>{
  $scope.showCommentInput = false;
  if (singlePost.val !== '') {
  singlePost.comments.push({
      content: singlePost.val,
      editMode: false
    })
    singlePost.val=''; 
  }
};
//save changes to edit content feed
$scope.saveChanges =  ()=> {
  console.log("+++=",$scope.editedContent);
  if($scope.editedContent===undefined){
      $scope.allPosts[$scope.id].messg = $scope.allPosts[$scope.id].messg;
    }
    else{
      $scope.allPosts[$scope.id].messg=$scope.editedContent;
    }
    $scope.editMode = false;
 
};
//delete a feed
$scope.deleteFeed = (singlePost)=>{
  console.log('singlePost: ', singlePost);
  console.log("+++++++, allpost",$scope.allPosts);
  let indexx = $scope.allPosts.indexOf(singlePost);
  $scope.allPosts.splice(indexx, 1);
  console.log("------after deleting feed",$scope.allPosts);
}
//edit comments
$scope.EditComment =(singlePost,singleComment)=> {
  singleComment.editMode=true;
  singleComment.editedComment=singleComment.content;
};
//save comments
$scope.saveComment= (singlePost,singleComment)=>{
  singleComment.editMode=false;
  singleComment.content = singleComment.editedComment;
}

//cancel comments
$scope.cancelComment =  ()=>{
  singleComment.editMode=false;
}
//delete comment
 $scope.deleteComment =(singlePost,singleComment)=> {
  var index = $scope.allPosts[singlePost].comments.indexOf(singleComment);
  console.log('index: ', index);
  if (index > -1) {
    $scope.allPosts[singlePost].comments.splice(index, 1); // Remove the comment from the comments array
  } 
};
$scope.cancelAddComment =  (singlePost)=> {
  showCommentInput = false;
  singlePost.val=''; 
}
//cancel feed
$scope.CancelFeed=()=>{
$scope.show=false;
$scope.story="";
$scope.userName="";
}

//save comments
$scope.Update=(singleComment)=>{
  singleComment.editMode=false;
  singleComment.content= singleComment.editedComment;
 
}
$scope.Cancel=(singleComment)=>{
  singleComment.editMode=false;
   $scope.story="";
      $scope.userName="";
 
}


});
//filter Date and time
myApp.filter('timeAgo', ()=> {
  return function(singlePost) {
   let postTime=singlePost.posted
    let current = new Date();
    let elapsed = current - postTime;
    let seconds = Math.floor(elapsed / 1000);
    if (seconds < 60) {
      return "just now";
    }

    let minutes = Math.floor(seconds / 60);
    if (minutes < 60 ) {
      return minutes + " minute ago";
    }

    let hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return hours + " hour ago";
    }

    let days = Math.floor(hours / 24);
    if (days < 30) {
      return days + " day ago";
    }

    let months = Math.floor(days / 30);
    if (months < 12) {
      return months + " month ago";
    }
   else{
    let years = Math.floor(months / 12);
    return years + " year ago";
   }
  };
});



 