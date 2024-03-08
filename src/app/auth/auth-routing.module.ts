import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QaLoginComponent } from './qa-login/qa-login.component';
import { QaAdminComponent } from './qa-admin/qa-admin.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: 'qa-login', component: QaLoginComponent},
      {path: 'qa-admin', component: QaAdminComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
