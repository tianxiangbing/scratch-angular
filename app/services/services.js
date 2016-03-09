"use strict";
var services = angular.module('myApp.services',[]);
services.service("service",function($q,$http){
    var data = {};
    return {
        getList: function (uid) {
            return ajax(uid,'/pc/group-buy-lottery-gua-gua-ka/get-my-reward-list');
            //return ajax(uid,'json/list.json');
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
                        "img":"http://ott.ewanse.com/kalemao_f2e/main/view/pc/scratch/css/images/cross.jpg",
                        "url":"http://kalemao.ewanse.com/pc/group-buy/index?goods_name=%E7%98%A6%E8%BA%AB%E5%AD%A3"
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