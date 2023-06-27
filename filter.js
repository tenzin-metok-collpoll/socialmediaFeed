angular.module("myApp").filter("timeAgo", () => {
    return function (posted) {
      let postTime = posted;
      let current = new Date();
      let elapsed = current - postTime;
      let seconds = Math.floor(elapsed / 1000);
      if (seconds < 60) {
        return "just now";
      }
  
      let minutes = Math.floor(seconds / 60);
      if (minutes < 60) {
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
      } else {
        let years = Math.floor(months / 12);
        return years + " year ago";
      }
    };
  });