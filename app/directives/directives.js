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
            var isScratch = false,isAlert =false,cindex = 0,ishave =false;
            var a = 1,b= 2,c= 3,d= 4,e= 5,f= 6,g= 7,h= 8,i= 9,j=10;
            var keys = [{level:a,index:1},{level:b,index:2},{level:c,index:3},{level:d,index:4},
                        {level:e,index:5},{level:f,index:6},{level:g,index:7},
                        {level:h,index:8},{level:i,index:9},{level:j,index:10}];
            function drawPercentCallback(percent){
                var def=$q.defer().promise;
                if(percent>0 &&!isScratch ){
                    //alert(percent)
                    isScratch=true;
                    //lottery.drawLottery('he21lo');
                    if(scope.lotteryNumber>0) {
                        ishave=true;
                        def= service.lottery().then(function (result) {
                            lottery.drawLottery(result.msg);
                            keys.forEach(function(item,index){
                                if(item.level == result.data){
                                    cindex= item.index;
                                }
                            });
                            if (scope.lotteryNumber > 0) {
                                scope.lotteryNumber--;
                            }
                        }).then(function(){
                            if((percent >50&&!isAlert&& ishave) ){
                                isAlert =true;
                                messageBox(cindex)
                            }
                        });
                    }else{
                        ishave=false;
                        lottery.drawLottery('您没有刮刮卡了.');
                    }
                }else if((percent >50&&!isAlert&& ishave) ){
                    isAlert =true;
                    messageBox(cindex)
                }
            }
            var dialog = new Dialog();
            dialog.init({target:$(".msg-0"),show:false,fixed:true,mask:true,afterHide:function(){
                lottery.drawLottery('');
                lottery.drawMask();
                isScratch=false;
                isAlert =false;
            }
            });
            function messageBox(index){
                dialog.show();
                $(".msg-0").prop('class','message-box msg-0 index-'+index);
                if(index >4){
                    $(".msg-0").find('.action').prop('class','action action-single');
                }
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
            service.getList(scope.uid).then(function(res){
                //scope.list = res.data;
                if(res.status){
                    var data = res.data;
                    var children = angular.element(element.children('.goods-list').children());
                    console.log(children)
                    if(data.a>0){
                        children.eq(0).find('i').addClass('active').html(data.a);
                    }
                    if(data.b>0){
                        children.eq(1).find('i').addClass('active').html(data.b);
                    }
                    if(data.c>0){
                        children.eq(2).find('i').addClass('active').html(data.c);
                    }
                    if(data.d>0){
                        children.eq(3).find('i').addClass('active').html(data.d);
                    }
                    scope.e= data.e;
                    children.eq(3).bind('click',function(){
                        var dialog = new Dialog();
                        dialog.init({target:$('.msg-1'),show:true,fixed:true,mask:true});
                    });
                }else{
                    alert(res.msg);
                }
            });
        }
    }
});
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
