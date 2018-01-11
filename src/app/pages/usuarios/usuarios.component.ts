import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  offset: number = 0;
  total: number = 0;

  loading: boolean = false;

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true;
    this._usuarioService.cargarUsuario(this.offset).subscribe( (resp: any) => {
      this.total = resp.resultados;
      this.usuarios = resp.usuarios;
      this.loading = false;
    });
  }

  cambiarOffset(offset: number) {
    let offsetTemp = this.offset + offset;

    if(offsetTemp >= this.total || offsetTemp < 0) {
      return;
    }

    this.offset += offset;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {
    if(termino.length <= 0) {
      return;
    }
    
    this.loading = true;
    this._usuarioService.buscarUsuario(termino).subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.loading = false;
    });
  }
}
