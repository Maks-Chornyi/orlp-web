import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

import {CommonModule} from "@angular/common";
import {PageComponent} from "./page/page.component";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./page/login/login.component";
import {HttpModule} from "@angular/http";
import {SignUpComponent} from "./page/signup/signup.component";
import {ORLPService} from "./orlp.service";

import {SignupService} from "./page/signup/signup.service";
import {SignupAlertService} from "./page/signup/signup-alert.service";
import {AdminComponent} from "./page/admin/admin.component";
import {CatalogInfoModule} from "./page/catalogInfo/catalogInfo.module";
import {StartPageModule} from "./page/mainPage/startPage.module";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        CommonModule,
        RouterModule.forRoot([
            {path: 'login', component: LoginComponent},
            {path: 'registr', component: SignUpComponent},
            {path: 'admin', component: AdminComponent},
            {path: '', redirectTo: 'startPage', pathMatch: 'full'},
            {path: '**', redirectTo: 'startPage', pathMatch: 'full'}
        ]),

        CatalogInfoModule,
        StartPageModule
    ],
    exports: [],
    declarations: [
        PageComponent,
        LoginComponent,
        SignUpComponent,
        AdminComponent],

    providers: [ORLPService, SignupService, SignupAlertService],
    bootstrap: [PageComponent]
})
export class PageModule {
}
