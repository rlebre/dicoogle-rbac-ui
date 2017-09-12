import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FacilitiesComponent } from './dashboard/facilities/facilities.component';

import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

import { ModalNewEntity } from './dashboard/facilities/modal-new-facility/modal-new-facility.component';



@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        DashboardComponent,
        FacilitiesComponent,
        ModalNewEntity
    ],
    imports: [
        BrowserModule,
        ModalModule.forRoot(),
        BootstrapModalModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [ ModalNewEntity ]
})
export class AppModule { }
