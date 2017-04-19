'use strict';
var msgs=[];
module.exports = function(socketio) {
    var chat = socketio.of('/chat');
    chat.on('connection', function(socket) {
        console.log("a connnect",socket.id);
        socket.on("useronline",function(data){
            socket.user=data;
            console.log("新用户上线",data);
            socket.broadcast.emit("useronline",data);
        })
        socket.on("getmsgs",function(){
            if(msgs.length>100){
                msgs=msgs.splice(-50);
            }
            socket.emit("msgs",msgs);
        })
        socket.on('chat', function(message) {
            message.datetime=Date();
            console.log("receive:", message);            
            msgs.push({type:'chat',data:message});
            chat.emit('chat', message);
        })
        socket.on("disconnect",function(){
            console.log("disconnect",socket.user);
            chat.emit("useroffline",socket.user);
        })
    });
}
