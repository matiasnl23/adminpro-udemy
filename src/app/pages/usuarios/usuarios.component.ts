import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

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
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe( () => {
      this.cargarUsuarios();
    });
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

  borrarUsuario( usuario: Usuario ) {
    if(usuario._id === this._usuarioService.usuario._id) {
      swal('¡Error!', 'No te puedes borrar a ti mismo.', 'error');
      return;
    }

    swal({
      title: '¿Está seguro?',
      text: `Está a punto de borrar al usuario ${usuario.nombre}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then( borrar => {
      if(borrar) {
        this._usuarioService.borrarUsuario(usuario._id)
          .subscribe( (borrado: boolean) => this.cargarUsuarios());
      }
    });
  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario ).subscribe();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }
}
