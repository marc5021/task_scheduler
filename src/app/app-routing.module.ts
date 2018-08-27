import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';

const router: Routes = [

	{path: '', component: AppComponent},
	{path: 'login', component: LoginPageComponent}

]

const routes: Routes = [];

@NgModule({
  imports: [
	RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
