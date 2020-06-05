<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/dist/style.css">
    <style>
pre{margin:0;}
pre.error{color:#f00;}
pre.warning{color:#FFC500;}
.s-button, .abp .button{
	display:block; border:1px solid #f88; padding:8px 6px 8px 6px; 
	background:#000; color:#f88; float:left;
	-moz-user-select: none;
	-khtml-user-select: none; 
	-webkit-user-select: none; 
	-o-user-select: none; 
	user-select: none; 
	cursor:default;
}
.s-button:hover,.abp .button:hover{background:#f88; color:#000;}
</style>
    <script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="/dist/CommentCoreLibrary.js"></script>
    <script src="/dist/scripting/Host.js"></script>
</head>
<body>
<div style="position:absolute;right:0; top:0; width: 45%; overflow:auto; height:384px; padding:3px;" id="debug-console"></div>

<div class="bigbox">
    <div class="head-box"></div>
    <div class="content-box">
        <!--<div class="vid-box">
            <video class="pause" poster="/img/timg.jpg" width="100%" height="auto">
                <source src="/video/Pigv3.mp4" type="video/mp4">
                您的浏览器不支持html5！
            </video>
            <div class="barrage-box">
            </div>
            <div class="play-button"><img class="play-img" src="/img/play.png"/></div>
        </div>-->
        <div id="player-unit" style="width:100%;clear:both;background:#000">
            <div class="m20 abp" id="player" style="height:375px">
                <div id="commentCanvas" class="container"></div>
                <video id="abpVideo" autobuffer="true" data-setup="{}" width="100%" height="100%" style="z-index:-1;width:100%;height:100%;top:0;left:0;right:0;bottom:0;" preload="auto">
                </video>
                
            </div>
            <div style="clear:both;"></div>
        </div>

        <div class="inpu-box" contenteditable=true><p>这里输入弹幕</p></div>
        <div id="button" class="button"><img class="send-img" src="/img/send.png" alt="发送"/></div>
        
        
        </div>

        <!--
        <div id='my-player' class='abp' style="width:100%; height:300px; background:#000;">
        <div id='my-comment-stage' class='container'></div>
        <div class="controlbox">
            <h3>调试用绑定</h3>
            <p>这里提供了一些调试用的绑定，可以通过操作它们感受操控 CCL 的方法。打开 main.js 就可以看到实现这些方法的绑定函数。</p>
            <ul>
                <li><a href="#" id="btnLoadTimeline">载入一个弹幕列表</a></li>
                <li><a href="#" id="btnInsertTimeline">插入一个弹幕到弹幕列表</a></li>
                <li><a href="#" id="btnTimer">启用/重置 定时器来告知播放器目前的播放位置</a> <span id="txPlayPos">0</span></li>
            </ul>
        </div>
        -->
    </div>

    

</div>


<script src="/js/vid.js"></script>
<script src="/js/main.js"></script>
<script src="/js/webs.js"></script>
</body>
</html>