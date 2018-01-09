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

  login( usuario: Usuario, recordar: boolean = false ) {

    if(recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    
    const url = `${ URL_SERVICIOS }/login`;

    return this.http.post( url, usuario ).map( (resp: any) => {

      localStorage.setItem('id', resp.id );
      localStorage.setItem('token', resp.token );
      localStorage.setItem('usuario', JSON.stringify(resp.usuario));

      return true;
    });
    
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
