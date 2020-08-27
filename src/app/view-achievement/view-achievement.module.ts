import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAchievementPageRoutingModule } from './view-achievement-routing.module';

import { ViewAchievementPage } from './view-achievement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAchievementPageRoutingModule
  ],
  declarations: [ViewAchievementPage]
})
export class ViewAchievementPageModule {}
