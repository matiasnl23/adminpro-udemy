import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  
  constructor() { }

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
      console.log('Debe de haceptar las condiciones');
      return;
    }
    
    console.log( this.forma.value );
    console.log( this.forma.valid );
  }

}
