$(document).ready(function () {

        var button = $("#button");
        var inputBox = $(".inpu-box");
        var barrageBox = $(".barrage-box");

        //输入框获取焦点的事件/删除提示字
        inputBox.focus(function () {
            $(this).find("p").remove();
        });


        // 点击发送按钮后
        button.click(function () {
            websocket.send(inputBox.text());       //发送输入框的文本信息
            //发送后删除输入框消息
            inputBox.empty();
        });
        //或者输入框按下回车按钮后
        inputBox.keypress(function (event) {
            if (event.which == 13) {
                event.preventDefault();     //给回车事件一个默认函数,防止自动换行
                websocket.send(inputBox.text());
                //发送后删除输入框消息
                inputBox.empty();
            }
        });


        //发送弹幕逻辑------------------------------------------------
        websocket.onmessage = function (event) {

            var msgtxt = event.data; //获取弹幕消息

            var colorRandom = getRandomColor();//得到随机颜色

            var num = generateRandom(3);//得到随机的三位数
            var toppx = num % 300; //得到距离顶端距离(0-300)

            //给新弹幕<p>添加样式和内容
            var newTxt = '<p style="top:' + toppx + 'px; color:' + colorRandom + '">' + msgtxt + '</p>';

            barrageBox.append(newTxt); //将新弹幕<p>加到弹幕盒子中
            var newBarrage = barrageBox.find("p"); //获取新弹幕元素

            var pWidth = newBarrage.width();  //得到新弹幕元素的宽度
            newBarrage.css("right", "-" + pWidth + "px"); //初始位置在弹幕盒子右边外面

            //然后添加右移动画效果 最后消失
            newBarrage.animate({right: "666px"}, 5000, "linear", function () {
                $(this).remove();
            });

        }

        //随机颜色
        var getRandomColor = function () {
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
        }

        //获取随机n位数字符串
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        function generateRandom(n) {
            var result = "";
            for (var i = 0; i < n; i++) {
                var index = Math.ceil(Math.random() * 9);
                result += chars[index];
            }
            return result;
        }
    }
);
/*
window.addEventListener('load', function(){
    var CM = new CommentManager(document.getElementById('my-comment-stage'));
    CM.init(); // 初始化

    // 启动播放弹幕（在未启动状态下弹幕不会移动）
    CM.start();
    // 绑定按钮们
    document.getElementById('btnLoadTimeline').addEventListener('click', function(e){
        e.preventDefault(); // 抑制默认操作
        var danmakuTimeline = [
            {
                "mode":1,
                "text":"Hello World",
                "stime":0,
                "size":25,
                "color":0xffffff
            }
        ];
        CM.load(danmakuTimeline);
    });
    
    document.getElementById('btnInsertTimeline').addEventListener('click', function(e){
        e.preventDefault(); // 抑制默认操作
        var danmaku = {
            "mode":1,
            "text":"Hello CommentCoreLibrary",
            "stime":1000,
            "size":30,
            "color":0xff0000
        };
        CM.insert(danmaku);
    });
    
    var startTime = 0, iVal = -1;
    document.getElementById('btnTimer').addEventListener('click', function(e){
        e.preventDefault(); // 抑制默认操作
        startTime = Date.now(); // 设定起始时间
        if(iVal >= 0){
            clearInterval(iVal); // 如果之前就有定时器，把它停掉
        }
        //建立新的定时器
        iVal = setInterval(function(){
            var playTime = Date.now() - startTime; // 用起始时间和现在时间的差模拟播放
            CM.time(playTime); // 通报播放时间
            document.getElementById('txPlayPos').textContent = playTime; // 显示播放时间
        }, 100); // 模拟播放器每 100ms 通报播放时间
    });
    
    // 开放 CM 对象到全局这样就可以在 console 终端里操控
    window.CM = CM;
}); */