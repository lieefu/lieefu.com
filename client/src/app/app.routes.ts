import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DownloadComponent} from './download/download.component';

export const appRoutes = [
  {
    path: '',
    redirectTo: 'lilydict',
    pathMatch: 'full'
  },
  {
    path: 'lilydict',
    loadChildren: './lilydict/lilydict.module#LilydictModule'
  },{
    path:'download',
    component:DownloadComponent
  }
];
