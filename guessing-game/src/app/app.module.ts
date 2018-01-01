import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { GetFromServer } from './services/getFromServer.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EnableComponent } from './components/game-zone/enable/enable.component';
import { GameStartComponent } from './components/game-zone/game-start/gameStart.component';

const appRoutes: Routes = [
  { path: 'enable', component: EnableComponent },
  { path: 'gameStart', component: GameStartComponent },
  {
    path: '',
    redirectTo: '/enable',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EnableComponent,
    GameStartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    HttpModule
  ],
  providers: [GetFromServer],
  bootstrap: [AppComponent]
})
export class AppModule { }
