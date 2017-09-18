import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FacilitiesComponent } from './dashboard/facilities/facilities.component';

import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

import { ModalNewEntity } from './dashboard/modal-new-entity/modal-new-entity.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClient } from './HttpAuthTokenInterceptor.service';

import { SelectedEntityService } from './sidebar/selected-entity/selected-entity.service'
import { CreateEntityService } from './dashboard/create-entity/create-entity.service';
import { InfoConfirmDialogComponent } from './dashboard/info-confirm-dialog/info-confirm-dialog.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';


import { routing } from './app.routing';
import { OrganizationsComponent } from './dashboard/organizations/organizations.component';
import { UsersComponent } from './dashboard/users/users.component';
import { RolesComponent } from './dashboard/roles/roles.component';
import { PermissionsComponent } from './dashboard/permissions/permissions.component';
import { OperationsComponent } from './dashboard/operations/operations.component';
import { CategoriesComponent } from './dashboard/categories/categories.component';


import { FacilitiesService } from './dashboard/facilities/facilities.service';
import { OrganizationsService } from './dashboard/organizations/organizations.service';
import { UsersService } from './dashboard/users/users.service';
import { RolesService } from './dashboard/roles/roles.service';
import { OperationsService } from './dashboard/operations/operations.service';


@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        DashboardComponent,
        FacilitiesComponent,
        ModalNewEntity,
        InfoConfirmDialogComponent,
        LoginComponent,
        OrganizationsComponent,
        UsersComponent,
        RolesComponent,
        PermissionsComponent,
        OperationsComponent,
        CategoriesComponent
    ],
    imports: [
        BrowserModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        routing
    ],
    providers: [
        HttpClient,
        SelectedEntityService,
        CreateEntityService,
        LoginService,
        FacilitiesService,
        OrganizationsService,
        UsersService,
        RolesService,
        OperationsService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [ModalNewEntity]
})
export class AppModule { }
