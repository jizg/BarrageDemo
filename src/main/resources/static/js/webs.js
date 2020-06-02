
var websocket = null;

var timerID = 0; 
function keepAlive() { 
    var timeout = 20000;  
    if (websocket.readyState == websocket.OPEN) {  
        websocket.send('');  
    }  
    timerId = setTimeout(keepAlive, timeout);  
}

function cancelKeepAlive() {  
    if (timerId) {  
        clearTimeout(timerId);  
    }  
}

function setupWebSocket(){

    if('WebSocket' in window){
        websocket = new WebSocket('ws://' + window.location.host + '/websocket');
    }else{
        alert('该浏览器不支持websocket!');
    }
    
    websocket.onopen = function (event) {
        console.log('建立连接');
        keepAlive();
    }
    
    websocket.onclose = function (event) {
        console.log('连接关闭, restarted');
        // setTimeout(setupWebSocket, 1000);
        
    }
    
    websocket.onerror = function (event) {
        alert('websocket通信错误!');
    }
    
    
    websocket.onmessage = function (event) {
        console.log(event.data);
    }

    window.onbeforeunload = function () {

        websocket.close();
    }
}

setupWebSocket();



