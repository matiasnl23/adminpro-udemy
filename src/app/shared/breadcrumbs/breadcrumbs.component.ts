import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    this.router.events
    .filter( evento => evento instanceof ActivationEnd)
    .filter( (evento: ActivationEnd) => evento.snapshot.data.titulo !== undefined)
    .map( (evento: ActivationEnd) => evento.snapshot.data )
    .subscribe( evento => {
      console.log(evento);
    });
  }

  ngOnInit() {
  }

}
