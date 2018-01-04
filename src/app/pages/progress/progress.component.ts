import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  porcentaje: number = 50;
  porcentaje2: number = 1;

  constructor() { }

  ngOnInit() {
  }

}
