import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {CommonModule} from "@angular/common";
import {NavbarComponent} from "./navbar.component";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {ORLPService} from "../../orlp.service";
import {MainModule} from "../main/main.module";
import {CategoryInfoModule} from "../categoryInfo/categoryInfo.module";
import {SignUpModule} from "../signup/signup.module";
import {AdminModule} from "../admin/admin.module";
import {CardModule} from "../card/card.module";
import {LoginModule} from "../login/login.module";
import {NavbarFilterPipe} from "./navbar.filter.pipe";
import {DeckService} from "./deck.service";
import {CabinetModule} from "../cabinet/cabinet.module";
import {StarRatingModule} from "angular-star-rating";
import {CookieService} from "angular2-cookie/core";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forRoot([
            {path: '', redirectTo: 'main', pathMatch: 'full'},
            {path: '**', redirectTo: 'main', pathMatch: 'full'}
        ]),

        CategoryInfoModule,
        SignUpModule,
        LoginModule,
        MainModule,
        AdminModule,
        CardModule,
        CabinetModule,
        StarRatingModule
    ],
    exports: [],
    declarations: [
        NavbarComponent,
        NavbarFilterPipe,
    ],

    providers: [ORLPService, DeckService, CookieService],
    bootstrap: [NavbarComponent]
})
export class NavbarModule {
}
