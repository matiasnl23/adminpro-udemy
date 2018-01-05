import { Component, OnInit } from '@angular/core';
//import { clearInterval } from 'timers';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres().then(
      (msg) => console.log('Terminado', msg)
    ).catch( (err) => {
      console.error('Error en la promesa', err);
    })
  }

  ngOnInit() {
  }

  contarTres(): Promise<string> {
    // Una manera
    return new Promise( (resolve, reject) => {
    
      let contador = 0;
    
      let interval = setInterval(() => {
        contador++;
        console.log(contador);
    
        if(contador === 3) {
          resolve(`Se ha encontrado el ${contador}`);
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
