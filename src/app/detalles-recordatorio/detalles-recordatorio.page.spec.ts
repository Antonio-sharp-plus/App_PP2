import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesRecordatorioPage } from './detalles-recordatorio.page';

describe('DetallesRecordatorioPage', () => {
  let component: DetallesRecordatorioPage;
  let fixture: ComponentFixture<DetallesRecordatorioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesRecordatorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
