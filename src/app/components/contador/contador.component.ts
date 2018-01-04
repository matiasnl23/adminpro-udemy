import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styles: []
})
export class ContadorComponent implements OnInit {

  @ViewChild('cajaProgreso') cajaProgreso: ElementRef;

  @Input() titulo: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('Titulo: ', this.titulo);
    console.log('progreso: ', this.progreso);
  }

  ngOnInit() {
    console.log('Titulo: ', this.titulo);
  }

  onChanges(nuevoValor: number) {
    if (nuevoValor < 0) {
      this.progreso = 0;
    } else if (nuevoValor > 100) {
      this.progreso = 100;
    } else {
      this.progreso = nuevoValor;
    }

    this.cajaProgreso.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor: number) {
    this.progreso += valor;

    if (this.progreso < 0) {
      this.progreso = 0;
    } else if (this.progreso > 100) {
      this.progreso = 100;
    }

    this.cambioValor.emit(this.progreso);
    this.cajaProgreso.nativeElement.focus();
  }
}
