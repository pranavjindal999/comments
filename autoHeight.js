(function(angular) {
    angular.module('comments').directive('autoHeight', function() {
        return {
            restrict: 'A',
            link: function(scope, elem) {
                elem = elem[0];
                setTimeout(function(){ 
                    elem.style.height = elem.scrollHeight + "px";
                    elem.focus();
                });                
                elem.addEventListener("input", function() {
                    elem.style.height = 'auto';
                    elem.style.height = elem.scrollHeight + "px";
                });
            }
        };
    });
})(angular);