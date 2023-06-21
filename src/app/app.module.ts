import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => HomeModule },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AuthModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
