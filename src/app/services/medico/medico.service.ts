import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from '../../config/config';

import { Medico } from '../../models/medico.model';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class MedicoService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    let url = `${URL_SERVICIOS}/medico/`;

    return this.http.get(url);
  }

  cargarMedico(id: string) {
    let url = `${URL_SERVICIOS}/medico/${id}`;

    return this.http.get(url)
      .map( (resp: any): Medico => resp.medico)
  }

  buscarMedicos(termino: string) {
    let url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;

    return this.http.get(url).map( (resp: any) => { return resp.medicos; } );
  }

  guardarMedico(medico: Medico) {
    let url = `${URL_SERVICIOS}/medico`;

    if(medico._id.length > 0) {
      url += `/${medico._id}?token=${this._usuarioService.token}`;
      return this.http.put(url, medico)
        .map( (resp: any) => {
          swal('Médico modificado', '', 'success');
          return resp.medicoGuardado;
        });
    }

    url += `?token=${this._usuarioService.token}`;
    return this.http.post(url, medico)
      .map( (resp: any) => {
        swal('Médico creado', '', 'success');
        return resp.medicoGuardado;
      });
  }

  borrarMedico(medico: Medico) {
    let url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this._usuarioService.token}`;

    return this.http.delete(url);
  }
}
