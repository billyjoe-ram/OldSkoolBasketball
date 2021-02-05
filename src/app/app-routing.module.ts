import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    // Impedindo que o usuário acesse outras páginas caso ele não esteja logado
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    // Impedindo que o usuário acesse essa página caso ele esteja logado
    canActivate: [LoginGuard]
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule),
    // Impedindo que o usuário acesse outras páginas caso ele não esteja logado
    canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule),
    // Impedindo que o usuário acesse outras páginas caso ele não esteja logado
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
