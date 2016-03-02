"use strict";
var services = angular.module('myApp.services',[]);
services.service("service",function($q,$http){
    var data = {};
    return {
        getList: function (uid) {
            return ajax(uid,'json/list.json');
        },
        getRecordList:function(uid){
            return ajax(uid,'json/myRecordList.json');
        },
        lottery:function(uid){
            return ajax(uid,'json/scratch.json');
        },
        getGoodsList: function (uid) {
            return ajax(uid,'json/goods-list.json');
        }
    }
    function ajax (uid,url){
        var deferred = $q.defer();
        var path = url;
        $http.get(path,{
            params:{userId:uid}
        }).then(function (response) {
            if(response.status){
                deferred.resolve(response.data) ;
            }else{
                alert(response.msg);
                deferred.reject(response);
            }
        });
        return deferred.promise;
    }
});