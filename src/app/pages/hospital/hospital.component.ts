import { Component, OnInit } from '@angular/core';

import { Hospital } from '../../models/hospital.model';

import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


declare var swal: any;

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  total: number;
  hospitales: Hospital[];

  loading: boolean;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe( () => {
      this.cargarHospitales();
    })
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
      .subscribe( (resp: any) => {
        this.total = resp.resultados;
        this.hospitales = resp.hospitales;

        this.loading = false;
      });
  }

  buscarHospital(termino: string) {
    this.loading = true;
    if(termino.length > 0) {
      this._hospitalService.buscarHospital(termino).subscribe( hospitales => {
        this.hospitales = hospitales;
        this.loading = false;
      })
    } else {
      this.cargarHospitales();
    }
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe( guardado => {
      if(guardado) {
        swal('Hospital modificado', '', 'success');
      }
    });
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: 'Borrando hospital',
      text: `¿Está seguro que desea borrar el hospital ${hospital.nombre}?`,
      icon: 'warning',
      buttons: ['Cancelar', 'Borrar'],
      dangerMode: true,
    }).then( borrar => {
      if(borrar) {
        this._hospitalService.borrarHospital(hospital._id).subscribe( borrado => {
          if(borrado) {
            swal('Hospital borrado', `El hospital ${hospital.nombre} fue eliminado correctamente.`, 'success');
            this.cargarHospitales();
          }
        })
      }
    });
  }

  mostrarModal(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

  crearHospital() {
    swal({
      title: 'Cargar hospital',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Nombre del hospital...',
          type: 'text'
        }
      },
      buttons: {
        cancel: 'Cerrar',
        confirm: 'Cargar'
      }
    }).then( (nombre) => {
      this._hospitalService.crearHospital(nombre).subscribe( creado => {
        if(creado) {
          swal('Hospital creado', '', 'success');
          this.cargarHospitales();
        }
      })
    })
  }

}
