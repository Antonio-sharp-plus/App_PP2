import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesRecordatorioPageRoutingModule } from './detalles-recordatorio-routing.module';

import { DetallesRecordatorioPage } from './detalles-recordatorio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesRecordatorioPageRoutingModule
  ],
  declarations: [DetallesRecordatorioPage]
})
export class DetallesRecordatorioPageModule {}
