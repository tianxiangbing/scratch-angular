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
            var keys = [{level:a,index:6},{level:b,index:1},{level:c,index:4},{level:d,index:11},
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
