import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { MatDialogModule, MatButtonModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

const MATERIAL_MODULES = [MatDialogModule, MatButtonModule];

@NgModule({
  imports: [CommonModule, ...MATERIAL_MODULES, RouterModule.forChild(routes)],
  declarations: [LoginComponent]
})
export class LoginModule {}
