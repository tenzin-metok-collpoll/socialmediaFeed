angular.module("myApp").filter("timeAgo", function () {
  return function (timestamp) {
    let currentTime = new Date().getTime();
    let postTime = new Date(timestamp).getTime();
    let timeDiff = currentTime - postTime;
    let seconds = Math.floor(timeDiff / 1000);

    if (seconds < 5) {
      return "Just now";
    }

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };
});
