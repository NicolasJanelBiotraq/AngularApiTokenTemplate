import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {MyAccountComponent} from './component/my-account/my-account.component';
import {AuthGuard} from './guard/auth.guard';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';


const routes: Routes = [
        {path: '', component: HomeComponent},
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent},
        {path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard]}
];

@NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
})
export class AppRoutingModule {
}
