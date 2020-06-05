var cm = new CommentManager(document.getElementById('commentCanvas'));
cm.init(); // 初始化

$(document).ready(function () {

		loadDynamicSource();
		// cm.start();

        var button = $("#button");
        var inputBox = $(".inpu-box");
        // var barrageBox = $(".barrage-box");

        //输入框获取焦点的事件/删除提示字
        inputBox.focus(function () {
            $(this).find("p").remove();
        });


        // 点击发送按钮后
        button.click(function () {
            websocket.send(bilibiliFormater(inputBox.text()));       //发送输入框的文本信息
            //发送后删除输入框消息
            inputBox.empty();
        });
        //或者输入框按下回车按钮后
        inputBox.keypress(function (event) {
            if (event.which == 13) {
                event.preventDefault();     //给回车事件一个默认函数,防止自动换行
                websocket.send(bilibiliFormater(inputBox.text()));
                //发送后删除输入框消息
                inputBox.empty();
            }
        });


        //发送弹幕逻辑------------------------------------------------
        websocket.onmessage = function (event) {

			if (event.data) {
				cm.send(bilibiliParser(event.data));
			}
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

function loadDynamicSource() {
	var provider = new CommentProvider();

	// 绑定动态源，动态源可以是两种：LongPoll 或者 EventDispatcher
	provider.addDynamicSource(websocket, CommentProvider.SOURCE_XML);
	// 会使用 parseOne 来逐个解析动态弹幕
	provider.addParser(new BilibiliFormat.XMLParser(), CommentProvider.SOURCE_XML);

	provider.addTarget(cm);

	cm.start();
}
var index = 0;
function bilibiliFormater(comment) {
	var templates = [
		"<?xml version=\"1.0\" encoding=\"UTF-8\"?><i><chatserver>chat.bilibili.tv</chatserver><chatid>170102</chatid><d p=\"94,1,25,16777215,1307940958,0,Da9e216f,30723621\">{comment}</d></i>",
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?><i><chatserver>chat.bilibili.tv</chatserver><chatid>170102</chatid><d p=\"1.9500000476837,7,12,0,1304950431,1,b82a51a3,26514873\">[\"162\",\"285\",\"1-0\",\"6\",{comment},\"0\",\"0\",\"161\",\"360\",\"6000\",\"0\"]</d></i>",
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?><i><chatserver>chat.bilibili.tv</chatserver><chatid>170102</chatid><d p=\"62.5,1,25,39423,1309764903,0,D7db7038,34406385\">{comment}</d></i>",
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?><i><chatserver>chat.bilibili.tv</chatserver><chatid>170102</chatid><d p=\"44.049999237061,7,36,16777215,1304950431,1,b82a51a3,26515093\">[\"194\",\"178\",\"0-1\",\"4.0\",\"{comment}\"]</d></i>",
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?><i><chatserver>chat.bilibili.tv</chatserver><chatid>170102</chatid><d p=\"86.800003051758,4,18,16711680,1316669406,0,1086a4ae,51534405\">{comment}</d></i>",
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?><i><chatserver>chat.bilibili.tv</chatserver><chatid>170102</chatid><d p=\"109.15000152588,7,64,16777215,1304950431,1,b82a51a3,26515466\">[\"78\",\"383\",\"1-0\",\"3.5\",\"{comment}\",\"0\",\"30\",\"20\",\"130\",\"3500\",\"0\"]</d></i>",
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?><i><chatserver>chat.bilibili.tv</chatserver><chatid>170102</chatid><d p=\"74.800003051758,4,18,0,1307879028,0,96645f00,30843692\">{comment}</d></i>"
    ];
    if (index > templates.length - 1) {
        index = 0
    }
	return templates[index++].replace("{comment}", comment)
}

function bilibiliParser(comment) {
	xmlParser = new DOMParser();

	var bparser = new BilibiliFormat.XMLParser();
	
	var formattedComment = xmlParser.parseFromString(comment,"text/xml")
	return bparser.parseOne(formattedComment.getElementsByTagName('d')[0]);
}