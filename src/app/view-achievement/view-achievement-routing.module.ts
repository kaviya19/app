import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAchievementPage } from './view-achievement.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAchievementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAchievementPageRoutingModule {}
