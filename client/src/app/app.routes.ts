import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DownloadComponent} from './download/download.component';
import { RipplewalletComponent} from './ripplewallet/ripplewallet.component';

export const appRoutes = [
  {
    path: '',
    redirectTo: 'lilydict',
    pathMatch: 'full'
  },{
    path: 'lilydict',
    loadChildren: './lilydict/lilydict.module#LilydictModule'
  },{
    path: 'ripplewallet',
    component:RipplewalletComponent
  },{
    path:'download',
    component:DownloadComponent
  },{
    path: 'chat',
    loadChildren: './chat/chat.module#ChatModule'
  }
];
