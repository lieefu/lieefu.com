import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LilydictComponent } from './lilydict.component';
import {lilydictRoutes} from './lilydict.routes';
@NgModule({
  imports: [
    CommonModule,
      RouterModule.forChild(lilydictRoutes)
  ],
  declarations: [LilydictComponent]
})
export class LilydictModule { }
