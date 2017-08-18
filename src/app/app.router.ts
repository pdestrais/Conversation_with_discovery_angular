import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(
  routes,
  {
    useHash: true
  }
);
