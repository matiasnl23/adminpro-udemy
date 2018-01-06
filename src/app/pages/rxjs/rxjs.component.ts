import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    

    this.regresaObservable()
    .subscribe(
      numero => console.log('Subs ', numero),
      err => console.error('Error en el obs ', err),
      () => console.log('Fin del obs')
    );
  }

  ngOnInit() {
  }

  regresaObservable(): Observable<any> {
    return new Observable( observer => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador++;

        let salida = {
          valor: contador
        };

        observer.next(salida);

        if(contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        // if(contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Este es un mensaje de error que será atrapado en el subscribe');
        // }

      }, 1000);
    }).retry(2)
    .map( (resp: any, index) => {
      // Antes obtenía un valor como respuesta directa de este observable
      // ahora suponiendo que el servidor cambió el tipo de respuesta antes 'contador' ahora '{ valor: contador }'
      // lo transformo antes de enviarlo al componente

      return resp.valor;

    })
  }

}
