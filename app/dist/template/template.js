angular.module("myApp").run(["$templateCache",function(a){"use strict";a.put("template/goods-list.html",'<div>\r\n<div class="goods-list">\r\n    <a class="item item-1">\r\n        <i></i>\r\n        <div class="mask"></div>\r\n    </a>\r\n    <a class="item item-2">\r\n        <i></i>\r\n        <div class="mask"></div>\r\n    </a>\r\n    <a class="item item-3">\r\n        <i></i>\r\n        <div class="mask"></div>\r\n    </a>\r\n    <div class="item item-5">\r\n    </div>\r\n</div>\r\n    <div class="hide">\r\n        <div class="message-box msg-1">\r\n            <a class="close js-dialog-close"></a>\r\n            <div class="money">{{e.money}}</div>\r\n            <div class="history">\r\n                <div class="item" ng-repeat="item in e.history  track by $index">第 {{$index+1}} 次获得：{{item}}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>'),a.put("template/goods-preview.html",'<div class="carousel-content">\r\n<div class="carousel-image">\r\n    <div>\r\n        <a ng-repeat="item in goodsList" href="{{item.url}}" on-finish>\r\n            <img ng-src="{{item.img}}"/>\r\n        </a>\r\n    </div>\r\n    <div class="carousel-num">\r\n    </div>\r\n</div>\r\n</div>'),a.put("template/lottery-count.html",'<div class="lottery-count">\r\n    <span class="left"></span>\r\n    <span class="text">{{count}}</span>\r\n    <span class="right"></span>\r\n</div>'),a.put("template/lottery.html",'<div id="lotteryContainer"></div>'),a.put("template/rule.html","<div>\r\n    <h2>活动规则说明</h2>\r\n    <div>\r\n        <p>1、活动时间：3月9日 15:00-3月15日 24:00</p>\r\n        <p>2、活动期间，凡团购任意瘦身季商品：成诺瘦身系列（4瓶）或H-Tree代餐粉（2罐）即可累计获得刮刮卡2枚；或辉夜姬酵素（2瓶）即可累计获得刮刮卡4枚；活动期间内完成兑换即可</p>\r\n        <p>3、活动入口在pc端和喵秘端，均可参与</p>\r\n        <p>4、刮刮卡奖品内容直接进虚拟仓或是我的猫粮账户，请注意查收</p>\r\n        <p>5、本次活动商品不支持退货</p>\r\n    </div>\r\n</div>")}]);