import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
//import { AuthGuard } from './service/auth.guard';
//import { LoginComponent } from './login/login.component';
//import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
//import { MembersComponent } from './members/members.component';
import { ChatComponent } from './chat/chat.component';

const routes: Route[] = [
//  { path: '', pathMatch: 'full', canActivate: [AuthGuard], redirectTo: 'home'},
  { path: '', pathMatch: 'full', redirectTo: 'chat'},
  { path: 'home', component: HomeComponent },
 // { path: 'login', component: LoginComponent },
 // { path: 'register', canActivate: [AuthGuard], component: RegisterComponent },
 // { path: 'members', canActivate: [AuthGuard], component: MembersComponent },
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
