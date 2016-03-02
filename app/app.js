'use strict';
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
// Declare app level module which depends on views, and components
angular.module('myApp', [
    "myApp.directives",
    "myApp.services"
]).controller('myController',function($scope,service,$http){
    $scope.uid = $('#hd_uid').val();

    $scope.lotteryNumber = $('#lotteryNumber').val();

});