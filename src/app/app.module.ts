import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { DetailsComponent } from './details/details.component';
import { MatBottomSheetModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StorageServiceModule} from 'angular-webstorage-service';
import { BackendServiceService } from './admin/backend-service.service';
import { AuthGuard } from './auth.guard';



const appRoutes: Routes = [
  { path:"login",component:LoginComponent},
  { path:"signup",component:SignupComponent},
  { path:"admin",component:AdminComponent, canActivate:[AuthGuard]},
  { path:"user/:id",component:UserComponent, canActivate:[AuthGuard]},
  { path:"detail",component:DetailsComponent},
  
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    UserComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    MatBottomSheetModule,
    BrowserAnimationsModule,
    StorageServiceModule,
    MatDialogModule
    
    
    
    
    
  ],
  providers: [BackendServiceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
