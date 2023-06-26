angular.module("myApp", ["ngRoute"]).config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "/views/home.html",
      })
      .when("/about", {
        templateUrl: "/views/about.html",
      })
      .when("/question", {
        templateUrl: "/views/question.html",
      })
      .when("/feed", {
        templateUrl: "/views/feed.html",
        styleUrls: "/css/index.css",
        controller: "myCtr",
      })
      .otherwise({
        redirectTo: "home",
      });
  },
]);