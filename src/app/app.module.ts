import {
  BrowserAnimationsModule
} from "@angular/platform-browser/animations";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import {
  BrowserModule
} from "@angular/platform-browser";
import {
  FlexLayoutModule
} from "@angular/flex-layout";
import {
  LayoutModule
} from "@angular/cdk/layout";
import {
  NgModule
} from "@angular/core";
import {
  ProductRelatedComponent
} from "./pages/home/product/product-related/product-related.component";
import {
  ProductComponent
} from "./pages/home/product/product.component";
import {
  AppRoutingModule,
  RoutingComponents
} from "./app-routing.module";
import {
  ScreenBreakpointService
} from "./services/breakpoint.service";
import {
  SideNavService
} from "./services/side-nav.service";
import {
  MaterialModule
} from "./components/material/material.module";
import {
  ApiService
} from "./services/api.service";
import {
  ApiComponent
} from "./pages/home/api/api.component";
import {
  AlgComponent
} from "./pages/home/alg/alg.component";
import {
  AppComponent
} from "./app.component";
//import { AuthGuard } from "./auth.guard";
import {
  ProfileComponent
} from './pages/home/profile/profile.component';
import {
  UploadComponent
} from './pages/home/upload/upload.component';
import {
  MatSnackBarModule
} from '@angular/material/snack-bar';
import {
  NgxSpinnerModule
} from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    ProductComponent,
    ProductRelatedComponent,
    ProfileComponent,
    UploadComponent,
    ApiComponent,
    AlgComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    LayoutModule,
    FormsModule,
    MatSnackBarModule,
    NgxSpinnerModule
  ],
  bootstrap: [AppComponent],
  providers: [
    ScreenBreakpointService,
    SideNavService,
    ApiService,
    //AuthGuard,
  ],
})
export class AppModule {}
