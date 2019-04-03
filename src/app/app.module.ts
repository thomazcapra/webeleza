import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ...MATERIAL_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
