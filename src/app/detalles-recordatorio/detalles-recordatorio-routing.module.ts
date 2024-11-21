import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesRecordatorioPage } from './detalles-recordatorio.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesRecordatorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesRecordatorioPageRoutingModule {}
