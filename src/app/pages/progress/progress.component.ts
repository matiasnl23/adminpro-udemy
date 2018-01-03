import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  porcentaje: number = 50;

  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valor: number) {
    this.porcentaje += valor;

    if (this.porcentaje < 0) {
      this.porcentaje = 0;
    } else if (this.porcentaje > 100) {
      this.porcentaje = 100;
    }
  }

}
