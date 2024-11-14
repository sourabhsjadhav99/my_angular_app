import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { EventlistComponent } from './pages/eventlist/eventlist.component';
import { CreateeventComponent } from './pages/createevent/createevent.component';
import { UpdateeventComponent } from './pages/updateevent/updateevent.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardService } from './gaurd/auth.gaurd';
import { LoginGuard } from './gaurd/login.gaurd';

const routes: Routes = [
  {path:"login", component:LoginComponent,canActivate: [LoginGuard] },
  {path:"register", component:RegisterComponent},
  { path: 'list', component: EventlistComponent, canActivate: [AuthGuardService] },
  { path: 'create-event', component: CreateeventComponent },
  { path: 'update-event/:id', component:UpdateeventComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
