(function(angular) {

    angular.module('comments').directive('comment', function() {
        return {
            restrict:'E',
            scope: {
                commentObj: '=value',
                ownerArray: '='
            },
            controllerAs: 'commentDirectiveVm',
            bindToController: true,
            controller: ['$scope', '$rootScope', '$timeout', 'commentService', commentController],
            templateUrl: 'comment.html'
        };
    });

    function commentController($scope, $rootScope, $timeout, commentService) {
        var commentDirectiveVm = this;

        $timeout(function() {
            delete commentDirectiveVm.commentObj.isNewComment;
        }, 1000);

        commentDirectiveVm.deleteComment = function() {
            commentDirectiveVm.isDeleting = true;
            commentService.doStuffAfterSometime().then(function() {
                commentDirectiveVm.ownerArray.splice(commentDirectiveVm.ownerArray.indexOf(commentDirectiveVm.commentObj), 1);
                commentDirectiveVm.isDeleting = false;
            });
        }

        commentDirectiveVm.likeButtonClick = function() {
            commentDirectiveVm.isLiking = true;
            commentService.doStuffAfterSometime().then(function() {
                commentDirectiveVm.commentObj.doILike = !commentDirectiveVm.commentObj.doILike;
                if (commentDirectiveVm.commentObj.doILike) {
                    commentDirectiveVm.commentObj.likes++;
                } else {
                    commentDirectiveVm.commentObj.likes--;
                }
                commentDirectiveVm.isLiking = false;
            });
        }

        commentDirectiveVm.replyClick = function() {
            commentDirectiveVm.showReply = !commentDirectiveVm.showReply;
            if (!commentDirectiveVm.showReply)
                commentDirectiveVm.newReply = "";
        }

        commentDirectiveVm.editComment = function() {
            commentDirectiveVm.editMode = !commentDirectiveVm.editMode;
            if (commentDirectiveVm.editMode) {
                commentDirectiveVm.editedComment = commentDirectiveVm.commentObj.comment;
            }
        }

        commentDirectiveVm.saveEditedComment = function($event) {
            if ($event.keyCode == 13 && !$event.shiftKey) {
                if (!commentDirectiveVm.editedComment.trim()) {
                    $event.preventDefault();
                    return;
                }

                commentDirectiveVm.isSavingAfterEdit = true;
                commentDirectiveVm.commentObj.comment = commentDirectiveVm.editedComment;
                commentDirectiveVm.editMode = false;
                commentService.doStuffAfterSometime().then(function() {
                    commentDirectiveVm.isSavingAfterEdit = false;
                });

            }
        }

        commentDirectiveVm.addReply = function($event) {
            if ($event.keyCode == 13 && !$event.shiftKey) {
                if (!commentDirectiveVm.newReply.trim()) {
                    $event.preventDefault();
                    return;
                }
                commentDirectiveVm.commentObj.replies.unshift(new Comment($rootScope.name, $rootScope.currentUser, commentDirectiveVm.newReply));
                commentDirectiveVm.newReply = "";
                commentDirectiveVm.showReply = false;
            }
        }
    }

})(angular);
