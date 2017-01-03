(function(angular) {

angular.module('comments').service('commentService', ['$q', '$timeout', commentService]);


function commentService($q, $timeout){
	this.doStuffAfterSometime = function(){
		var def = $q.defer();
		$timeout(function(){
			def.resolve();
		},700);
		return def.promise;
	}
}

})(angular);
