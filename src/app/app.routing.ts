import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { UserDetailsComponent } from './dashboard/user-details/user-details.component';
import { UsersComponent } from './dashboard/users/users.component';
import { OrganizationsComponent } from './dashboard/organizations/organizations.component';
import { FacilitiesComponent } from './dashboard/facilities/facilities.component';
import { RolesComponent } from './dashboard/roles/roles.component';
import { PermissionsComponent } from './dashboard/permissions/permissions.component';
import { OperationsComponent } from './dashboard/operations/operations.component';
import { CategoriesComponent } from './dashboard/categories/categories.component';
import { ResourcesComponent } from './dashboard/resources/resources.component';

const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard', component: SidebarComponent,
        children: [
            { path: 'facilities', component: FacilitiesComponent },
            { path: 'organizations', component: OrganizationsComponent },
            { path: 'users', component: UsersComponent },
            { path: 'user/:id', component: UserDetailsComponent },
            { path: 'roles', component: RolesComponent },
            { path: 'permissions', component: PermissionsComponent },
            { path: 'operations', component: OperationsComponent },
            { path: 'categories', component: CategoriesComponent },
            { path: 'resources', component: ResourcesComponent },
        ]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);