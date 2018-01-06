import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  subscription: Subscription;

  constructor() {
    
    // Modificacion realizada para poder desuscribirse a un observable
    this.subscription = this.regresaObservable()
    .subscribe(
      numero => console.log('Subs ', numero),
      err => console.error('Error en el obs ', err),
      () => console.log('Fin del obs')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Acá la desuscripcion del observable
    // NOTA: El setInterval va a seguir funcionando en el fondo
    // y se debe crear una variable global para poder llamar a un
    // clearInterval desde el ngOnDestroy

    this.subscription.unsubscribe();
    console.log('ventana cerrada');
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

        // if(contador === 11) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if(contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Este es un mensaje de error que será atrapado en el subscribe');
        // }

      }, 500);
    }).retry(2)
    .map( (resp: any, index) => {
      // Antes obtenía un valor como respuesta directa de este observable
      // ahora suponiendo que el servidor cambió el tipo de respuesta antes 'contador' ahora '{ valor: contador }'
      // lo transformo antes de enviarlo al componente
      // (index) parámetro opcional

      return resp.valor;

    })
    .filter( (valor, index) => {
      // Devuelve el valor solo si se cumple la función retornando un 'true'
      // (index) parámetro opcional
      
      if( (valor % 2) === 0) {
        return true;
      }
    })
  }

}
