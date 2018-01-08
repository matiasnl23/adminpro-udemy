import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as swal from 'sweetalert';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, [Validators.required]),
      correo: new FormControl( null, [Validators.required, Validators.email]),
      password: new FormControl( null, [Validators.required]),
      password2: new FormControl( null, [Validators.required]),
      condiciones: new FormControl( false )
    }, { validators: this.camposIguales( 'password', 'password2' ) } );
  }

  camposIguales( campo_1: string, campo_2: string) {
    return ( group: FormGroup) => {
      let c1 = group.controls[campo_1].value;
      let c2 = group.controls[campo_2].value;

      if(c1 === c2) {
        return null;
      }

      return { camposDiferentes: true };
    }
  }

  registrarUsuario() {

    if(this.forma.invalid) {
      return;
    }

    if(!this.forma.value.condiciones) {
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }
    
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService
      .crearUsuario( usuario )
      .subscribe( resp => this.router.navigate(['/login'] ));
  }

}
