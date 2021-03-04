import {
  Routes,
  RouterModule
} from "@angular/router";
import {
  NgModule
} from "@angular/core";


import {
  SideNavComponent
} from "./pages/home/layout/side-nav/side-nav.component";
import {
  AppBarComponent
} from "./pages/home/layout/app-bar/app-bar.component";

import {
  MainComponent
} from "./pages/home/main/main.component";
import {
  ApiComponent
} from "./pages/home/api/api.component";
import {
  AlgComponent
} from "./pages/home/alg/alg.component";
import {
  AuthComponent
} from "./pages/auth/auth.component";
import {
  HomeComponent
} from "./pages/home/home.component";
import {
  AuthGuard
} from "./auth.guard";
import {
  ProductComponent
} from "./pages/home/product/product.component";
import {
  ProfileComponent
} from "./pages/home/profile/profile.component";
import {
  UploadComponent
} from "./pages/home/upload/upload.component";

const routes: Routes = [{
    path: "",
    component: HomeComponent,
    // canActivate: [AuthGuard],
    children: [{
        path: "",
        component: MainComponent,
      },
      {
        path: "api",
        component: ApiComponent,
      },
      {
        path: "algoritmos",
        component: AlgComponent,
      },
      {
        path: "query/:id",
        component: MainComponent,
      },
      {
        path: "product/:id",
        component: ProductComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "profile/:id",
        component: ProfileComponent,
      },
      {
        path: "upload",
        component: UploadComponent,
      },{
        path: "upload/:id",
        component: UploadComponent,
      }
    ],
  },
  {
    path: "auth",
    component: AuthComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponents = [
  ProductComponent,
  SideNavComponent,
  AppBarComponent,
  AuthComponent,
  HomeComponent,
  MainComponent,
];
