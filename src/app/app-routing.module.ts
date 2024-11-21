import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a login como pantalla inicial de la app.
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'restore-password',
    loadChildren: () => import('./restore-password/restore-password.module').then( m => m.RestorePasswordPageModule)
  },
  {
    path: 'crear-recordatorio',
    loadChildren: () => import('./crear-recordatorio/crear-recordatorio.module').then( m => m.CrearRecordatorioPageModule)
  },
  {
    path: 'detalles-recordatorio/:idrecordatorio',
    loadChildren: () => import('./detalles-recordatorio/detalles-recordatorio.module').then( m => m.DetallesRecordatorioPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
