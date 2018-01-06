import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string = 'Cargando...';

  constructor(
    private router: Router,
    public _title: Title,
    public _meta: Meta
  ) {
    
    this.getDataRoute().subscribe( data => {
      this.titulo = data.titulo;

      // Cambiando el título que figura en la pestaña del navegador
      this._title.setTitle(this.titulo);

      // Agregando/modificando metadata de la página para agregar información
      let metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      }
      this._meta.updateTag(metaTag);
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
