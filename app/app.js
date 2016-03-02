'use strict';

function initFontSize() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    if(document.documentElement.clientWidth>750){
        document.documentElement.style.fontSize = 970/7.5 + 'px';
    }
}
initFontSize();
$(window).on('resize', initFontSize);
// Declare app level module which depends on views, and components
angular.module('myApp', [
    "myApp.directives",
    "myApp.services"
]).controller('myController',['$scope',function($scope){
    $scope.uid = $('#hd_uid').val();

    $scope.lotteryNumber = $('#lotteryNumber').val();

}]);