import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arreglo: any[],
    texto: any,
    columna: string): any[] {

    if (texto === '' || texto === undefined) {
      return arreglo;
    }

    texto = texto.toLowerCase();

    return arreglo.filter(item => {
      return item['tipopqr'].toLowerCase().includes(texto) || item['customerName'].toLowerCase().includes(texto);
    })

  }

}
