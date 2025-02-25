import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./account/components/login/login.component";
import { ForgotPasswordComponent } from "./account/components/forgot-password/forgot-password.component";
import { MainLayoutComponent } from "./shared/layouts/main-layout/main-layout.component";
import { ChangePasswordComponent } from "./account/components/change-password/change-password.component";
import { WelcomeComponent } from "./account/components/welcome/welcome.component";
import { RouteGuard } from "./core/guard/route.guard";
import { LoginLayoutComponent } from "./shared/layouts/login-layout/login-layout.component";
const routes: Routes = [
  {
    path: "",
    component: LoginLayoutComponent,
    data: { breadcrumb: "Login Page" },
    children: [
      {
        path: "",
        component: LoginComponent,
        data: {
          breadcrumb: "Login",
        },
      },
      // {
      //   path: "admin",
      //   loadChildren: () =>
      //     import("./admin/admin.module").then((m) => m.AdminModule),
      // }
    ]
  },
  {
    path: "",
    component: MainLayoutComponent,
 //   canActivate: [RouteGuard],
    data: { breadcrumb: "Main Page" },
    children: [
      // {
      //   path: "account",
      //   loadChildren: () =>
      //     import("./account/account.module").then((m) => m.AccountModule),
      // },
      {
        path: "admin",
        loadChildren: () =>
          import("./admin/admin.module").then((m) => m.AdminModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
