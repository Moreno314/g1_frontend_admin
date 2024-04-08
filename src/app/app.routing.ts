import { Routes,RouterModule, Router} from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

import { AdminGuard } from "./guards/admin.guard";
import { IndexUsuarioComponent } from "./components/usuarios/index-usuario/index-usuario.component";

const appRoute:Routes=[
    {path:'',component:InicioComponent,canActivate:[AdminGuard]},
    {path:'panel',children:[
        {path:'usuarios',component:IndexUsuarioComponent,canActivate:[AdminGuard]}
    ]},
    {path: 'login',component:LoginComponent}
]

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders<any>=RouterModule.forRoot(appRoute);