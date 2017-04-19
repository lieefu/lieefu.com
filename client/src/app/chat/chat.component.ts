import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { ChatService }       from './chat.service';
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
    @ViewChild('scrollChat') private myScrollChat: ElementRef;

    username = "Lieefu Way";
    messages = [];
    connection;
    message;
    constructor(private chatService: ChatService) { }
    sendMessage(input_msg) {
        this.onEnter();
        input_msg.focus();
    }
    onEnter() { // without type info
        this.chatService.sendMessage({ name: this.username, msg: this.message });
        this.message = '';
    }
    ngOnInit() {
        this.chatService.username = this.username;
        this.connection = this.chatService.getMessages().subscribe(message => {
            let msg: any = message;
            if (msg.type === "msgs") {
                this.messages = this.messages.concat(msg.data);
            }else{
                this.messages.push(message);
            }
        })
    }
    ngOnDestroy() {
        this.connection.unsubscribe();
    }
    ngAfterViewChecked() {
        this.scrollToBottom();
    }
    scrollToBottom(): void {
        try {
            this.myScrollChat.nativeElement.scrollTop = this.myScrollChat.nativeElement.scrollHeight;
        } catch (err) { console.log("scrollToBottom", err); }
    }
}
