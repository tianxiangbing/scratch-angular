'use strict';

function initFontSize() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    if(document.documentElement.clientWidth>750){
        document.documentElement.style.fontSize = 970/7.5 + 'px';
    }
};
initFontSize();
$(window).on('resize', initFontSize);
// Declare app level module which depends on views, and components
angular.module('myApp', [
    "myApp.directives",
    "myApp.services"
]).controller('myController',['$scope',function($scope){
    $scope.uid = $('#hd_uid').val();
    $scope.is_miaomi = $('#is_miaomi').val();
    $scope.lotteryNumber = $('#lotteryNumber').val();
}]);
"use strict";
var directives = angular.module("myApp.directives",[
    "myApp.services"
]);

directives.directive("lottery",function(service,$q){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'template/lottery.html',
        link:function(scope,element,attrs){
            var lottery = new Lottery('lotteryContainer', '#bfbfbf', 'color', $(element).width(), $(element).height(), drawPercentCallback);
            lottery.maskText="刮开此图层";
            lottery.init(lottery,'text');
            //lottery.drawLottery('helo');
            var isScratch = false,isAjax = false,isAlert =false,cindex = 0,ishave =false;
            var a = 1,b= 2,c= 3,d=4,e= 5,f= 6,g= 7,h= 8,i= 9,j=10;
            var keys = [{level:a,index:6},{level:b,index:1},{level:c,index:2},{level:d,index:11},
                        {level:e,index:9},{level:f,index:3},{level:g,index:10},
                        {level:h,index:9},{level:i,index:8},{level:j,index:5}];
            function drawPercentCallback(percent){
                var def=$q.defer().promise;
                if(percent>0 &&!isScratch ){
                    //alert(percent)
                    isScratch=true;
                    //lottery.drawLottery('he21lo');
                    if(scope.lotteryNumber>0) {
                        ishave=true;
                        def= service.lottery().then(function (result) {
                            if(result.status==true){
                                getList(scope,service);
                                lottery.drawLottery(result.msg);
                                keys.forEach(function(item,index){
                                    if(item.level == result.data){
                                        cindex= item.index;
                                    }
                                });
                                //alert(cindex)
                                isAjax = true;
                                if (scope.lotteryNumber > 0) {
                                    scope.lotteryNumber--;
                                }
                                if((percent >20&&!isAlert&& ishave)){
                                   // isAlert =true;
                                    //messageBox(cindex)
                                }
                            }else{
                                alert(result.msg)
                            }
                        }).catch(function(){
                            alert('请求出错');
                        });
                    }else{
                        ishave=false;
                        lottery.drawLottery('您没有刮刮卡了.');
                    }
                }else if(percent >20&&!isAlert&& ishave && isAjax){
                    isAlert =true;
                    messageBox(cindex)
                }
            }
            var dialog = new Dialog();
            dialog.init({target:$(".msg-0"),show:false,fixed:true,mask:true,beforeHide:function(){
                //$(".msg-0").prop('class', 'message-box msg-0');
            },afterHide:function(){
                lottery.drawLottery('');
                lottery.drawMask();
                isScratch=false;
                isAlert =false;
                isAjax =false;
                //$(".msg-0")[0].className='message-box msg-0';
            }
            });
            function messageBox(index){
                $(".msg-0").prop('class','message-box msg-0 index-'+index);
                //alert(index)
                //$('.msg-0').find('.index').remove();
                //$('.msg-0').append('<div class="index index-'+index+'"/>');
                if(index >4 || scope.is_miaomi==true){
                    $(".msg-0").find('.action').prop('class','action action-single');
                }else{
                    $(".msg-0").find('.action').prop('class','action');
                }
                dialog.show();
            }
        }
    }
});
directives.directive('lotteryCount',function(){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'template/lottery-count.html',
        scope:{count:'=counter'},
        link:function(scope,element,attrs){

        }
    }
});

directives.directive('goodsList',function(service){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'template/goods-list.html',
        link:function(scope,element,attrs){
            getList(scope,service);
        }
    }
});
function getList(scope,service){
    service.getList(scope.uid).then(function(res){
        //scope.list = res.data;
        if(res.status){
            var data = res.data;
            var children = $('.goods-list').children();
            if(data.a>0){
                children.eq(0).find('i').addClass('active').html(data.a);
                children.eq(0).children().eq(1).addClass('hide');
            }
            if(data.b>0){
                children.eq(1).find('i').addClass('active').html(data.b);
                children.eq(1).children().eq(1).addClass('hide');
            }
            if(data.c>0){
                children.eq(2).find('i').addClass('active').html(data.c);
                children.eq(2).children().eq(1).addClass('hide');
            }
            if(data.d>0){
                children.eq(3).find('i').addClass('active').html(data.d);
                children.eq(3).children().eq(1).addClass('hide');
            }
            scope.e= data.e;
            children.eq(3).unbind('click');
            children.eq(3).bind('click',function(){
                $("body").scrollTop(0);
                var dialog = new Dialog();
                dialog.init({target:$('.msg-1'),show:true,mask:true,fixed:false});
            });
        }else{
            alert(res.msg);
        }
    });
}
directives.directive('rule',function(){
   return {
       restrict:'EA',
       replace:true,
       templateUrl:'template/rule.html',
       link:function(scope,element,attrs){

       }
   }
});
directives.directive('onFinish',function($timeout){
   return {
       restrict:"A",
       link:function(scope,element,attrs){
           if(scope.$last===true){
               $timeout(function(){
                   scope.$emit('ngFinish');
               });
           }
       }
   }
});
directives.directive('goodsPreview',function(service){
    return {
        restrict:'EA',
        replace:true,
        templateUrl:'template/goods-preview.html',
        link:function(scope,element,attrs){
            service.getGoodsList().then(function(result){
                if(result.status){
                    scope.goodsList = result.data;
                    scope.$on('ngFinish',function(){
                        var cs = new CarouselImage();
                        cs.init({
                            target:$('.carousel-image'),
                            num:$('.carousel-num')
                        });
                    });
                }
            });
        }
    }
});

"use strict";
var services = angular.module('myApp.services',[]);
services.service("service",function($q,$http){
    var data = {};
    return {
        getList: function (uid) {
            //return ajax(uid,'/pc/group-buy-lottery-gua-gua-ka/get-my-reward-list');
            return ajax(uid,'json/list.json');
        },
        getRecordList:function(uid){
            return ajax(uid,'json/myRecordList.json');
        },
        lottery:function(uid){
            //return ajax(uid,'/pc/group-buy-lottery-gua-gua-ka/');
            return ajax(uid,'json/scratch.json');
        },
        getGoodsList: function (uid) {
            //return ajax(uid,'json/goods-list.json');
            var deferred = $q.defer();
            setTimeout(function(){
                var data =  [
                    {
                        "img":"http://ott.ewanse.com/kalemao_f2e/main/view/pc/scratch/css/images/cross.jpg",
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
angular.module("myApp").run(["$templateCache",function(a){"use strict";a.put("template/goods-list.html",'<div>\r\n<div class="goods-list">\r\n    <a class="item item-1">\r\n        <i></i>\r\n        <div class="mask"></div>\r\n    </a>\r\n    <a class="item item-2">\r\n        <i></i>\r\n        <div class="mask"></div>\r\n    </a>\r\n    <a class="item item-3">\r\n        <i></i>\r\n        <div class="mask"></div>\r\n    </a>\r\n    <div class="item item-5">\r\n    </div>\r\n</div>\r\n    <div class="hide">\r\n        <div class="message-box msg-1">\r\n            <a class="close js-dialog-close"></a>\r\n            <div class="money">{{e.money}}</div>\r\n            <div class="history">\r\n                <div class="item" ng-repeat="item in e.history  track by $index">第 {{$index+1}} 次获得：{{item}}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>'),a.put("template/goods-preview.html",'<div class="carousel-content">\r\n<div class="carousel-image">\r\n    <div>\r\n        <a ng-repeat="item in goodsList" href="{{item.url}}" on-finish>\r\n            <img ng-src="{{item.img}}"/>\r\n        </a>\r\n    </div>\r\n    <div class="carousel-num">\r\n    </div>\r\n</div>\r\n</div>'),a.put("template/lottery-count.html",'<div class="lottery-count">\r\n    <span class="left"></span>\r\n    <span class="text">{{count}}</span>\r\n    <span class="right"></span>\r\n</div>'),a.put("template/lottery.html",'<div id="lotteryContainer"></div>'),a.put("template/rule.html","<div>\r\n    <h2>活动规则说明</h2>\r\n    <div>\r\n        <p>1、活动时间：3月9日 15:00-3月15日 24:00</p>\r\n        <p>2、活动期间，凡团购任意瘦身季商品：成诺瘦身系列（4瓶）或H-Tree代餐粉（2罐）即可累计获得刮刮卡2枚；或辉夜姬酵素（2瓶）即可累计获得刮刮卡4枚；活动期间内完成兑换即可</p>\r\n        <p>3、活动入口在pc端和喵秘端，均可参与</p>\r\n        <p>4、刮刮卡奖品内容直接进虚拟仓或是我的猫粮账户，请注意查收</p>\r\n        <p>5、本次活动商品不支持退货</p>\r\n    </div>\r\n</div>")}]);