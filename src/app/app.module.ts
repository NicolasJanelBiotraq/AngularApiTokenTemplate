import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './component/register/register.component';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {MyAccountComponent} from './component/my-account/my-account.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpTokenInterceptor} from './interceptor/http-token.interceptor';

@NgModule({
        declarations: [
                AppComponent,
                RegisterComponent,
                LoginComponent,
                HomeComponent,
                MyAccountComponent
        ],
        imports: [
                BrowserModule,
                AppRoutingModule,
                FormsModule,
                HttpClientModule
        ],
        providers: [
                {
                        provide: HTTP_INTERCEPTORS,
                        useClass: HttpTokenInterceptor,
                        multi: true
                }
        ],
        bootstrap: [AppComponent]
})
export class AppModule {
}
