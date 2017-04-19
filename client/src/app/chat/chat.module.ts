import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChatService }       from './chat.service';
import {chatRoutes} from './chat.routes';
@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(chatRoutes)
    ],
    declarations: [ChatComponent],
    providers: [ChatService]
})
export class ChatModule { }
