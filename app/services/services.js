"use strict";
var services = angular.module('myApp.services',[]);
services.service("service",function($q,$http){
    var data = {};
    return {
        getList: function (uid) {
            return ajax(uid,'/pc/group-buy-lottery-gua-gua-ka/get-my-reward-list');
        },
        getRecordList:function(uid){
            return ajax(uid,'json/myRecordList.json');
        },
        lottery:function(uid){
            return ajax(uid,'/pc/group-buy-lottery-gua-gua-ka/');
            //return ajax(uid,'json/scratch.json');
        },
        getGoodsList: function (uid) {
            //return ajax(uid,'json/goods-list.json');
            var deferred = $q.defer();
            setTimeout(function(){
                var data =  [
                    {
                        "img":"http://ott.ewanse.com/kalemao_f2e/main/view/pc/scratch/css/images/carouse-1.jpg",
                        "url":"#"
                    },
                    {
                        "img":"http://ott.ewanse.com/kalemao_f2e/main/view/pc/scratch/css/images/carouse-2.jpg",
                        "url":"#"
                    },
                    {
                        "img":"http://ott.ewanse.com/kalemao_f2e/main/view/pc/scratch/css/images/carouse-3.jpg",
                        "url":"#"
                    }
                ];
                deferred.resolve({status:true,data:data});
            });
            return deferred.promise;
        }

    }
    function ajax (uid,url){
        var deferred = $q.defer();
        var path = url;
        $http.post(path,{
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