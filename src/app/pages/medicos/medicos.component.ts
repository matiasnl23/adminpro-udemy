import { Component, OnInit } from '@angular/core';

import { Medico } from '../../models/medico.model';

import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[];
  total: number;

  loading: boolean;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.cargarMedicos();
  }

  buscarMedico(termino: string) {
    this.loading = true;
    if(termino.length > 0) {
      this._medicoService.buscarMedicos(termino).subscribe( medicos => this.medicos = medicos );
      this.loading = false;
    } else {
      this.cargarMedicos();
    }
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos().subscribe( (resp: any) => {
      this.total = resp.resultados;
      this.medicos = resp.medicos;

      this.loading = false;
    })
  }

  borrarMedico(medico: Medico) {
    swal({
      title: 'Borrando médico',
      text: `¿Está seguro que desea borrar al médico ${medico.nombre}?`,
      icon: 'warning',
      buttons: ['Cancelar', 'Borrar'],
      dangerMode: true,
    }).then( borrar => {
      if(borrar) {
        this._medicoService.borrarMedico(medico).subscribe( () => {
          swal('Medico borrado', `Se ha borrado al médico ${medico.nombre}`, 'success');
          this.cargarMedicos();
        });
      }
    });
  }
}
