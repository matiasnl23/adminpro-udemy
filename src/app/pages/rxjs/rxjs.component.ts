import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    let obs = new Observable( observer => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador++;
        observer.next(contador);

        if(contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        if(contador === 2) {
          clearInterval(intervalo);
          observer.error('Este es un mensaje de error que será atrapado en el subscribe');
        }

      }, 1000);
    });

    obs.retry(5)
    .subscribe(
      numero => console.log('Subs ', numero),
      err => console.error('Error en el obs ', err),
      () => console.log('Fin del obs')
    );
  }

  ngOnInit() {
  }

}
