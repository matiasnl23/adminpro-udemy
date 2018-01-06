import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string = 'Cargando...';

  constructor(
    private router: Router,
    public _title: Title
  ) {
    
    this.getDataRoute().subscribe( data => {
      this.titulo = data.titulo;

      // Cambiando el título que figura en la pestaña del navegador
      this._title.setTitle(this.titulo);
    });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events
    .filter( evento => evento instanceof ActivationEnd)
    .filter( (evento: ActivationEnd) => evento.snapshot.data.titulo !== undefined)
    .map( (evento: ActivationEnd) => evento.snapshot.data );
  }

}
