angular.module('comments', []);

(function(angular) {
    angular.module('comments').controller('commentsController', ['$scope','$timeout','$rootScope', '$http', function($scope,$timeout, $rootScope, $http) {
        var commentsVm = this;

        $rootScope.name = "Alex Russo";
        $rootScope.currentUser = "AlexRusso";

        $http.get('data.json').then(function(response) {
            commentsVm.comments = response.data;
        });

        commentsVm.addComment = function($event) {
            if ($event.keyCode == 13 && !$event.shiftKey) {
                if(!commentsVm.newComment.trim()){
                    $event.preventDefault();
                    return;
                }
                commentsVm.comments.unshift(new Comment($rootScope.name, $rootScope.currentUser, commentsVm.newComment));
                commentsVm.newComment="";
                $timeout(function(){commentsVm.newComment=""});
            }
        }
    }]);
})(angular);


function Comment(name, username, comment) {
    this.name = name;
    this.username = username;
    this.comment = comment;
    this.replies = [];
    this.imageURL = "images/" + username + ".png";
    this.likes = 0;
    this.isNewComment = true;
    this.doILike = false;
}