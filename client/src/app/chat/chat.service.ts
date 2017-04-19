import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as socketio from 'socket.io-client';
@Injectable()
export class ChatService {
    constructor() { }
    private url = '/chat';
    private chat;
    public username;
    sendMessage(message) {
        this.chat.emit('chat', message);
    }
    getMessages() {
        //let chat = this.chat;
        let observable = new Observable(observer => {
            let chat = this.chat = socketio.connect(this.url);
            let username = this.username;
            chat.on('connect', function() {
                console.log(username);
                chat.emit("useronline", { name: username });
                chat.emit("getmsgs");
            });
            chat.on("useronline", function(data) {
                console.log("新用户上线", data);
                observer.next({type:"sys",data:{name:'system',msg:data.name+" online"}});
            });
            chat.on("useroffline", function(data) {
                console.log("用户下线", data);
                observer.next({type:"sys",data:{name:'system',msg:data.name+" offline"}});
            })
            chat.on('chat', (data) => {
                //console.log("chat", data);
                observer.next({type:"chat",data:data});
            });
            chat.on('msgs', (data) => {
                console.log("chat", data);
                observer.next({type:"msgs",data:data});
            });
            return () => {
                chat.disconnect();
            };
        })
        return observable;
    }
}
