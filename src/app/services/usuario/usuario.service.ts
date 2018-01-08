import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class UsuarioService {

  constructor( public http: HttpClient ) {
    console.log('Servicio de usuario listo');
  }

  crearUsuario( usuario: Usuario ) {

    const url = `${ URL_SERVICIOS }/usuario`;

    return this.http.post( url, usuario )
      .map( (resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario
      });
  }

}
