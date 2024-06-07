import { Pipe, type PipeTransform } from '@angular/core';

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'});

@Pipe({
  name: 'appBrazilianReal',
  standalone: true,
})
export class BrazilianRealPipe implements PipeTransform {

  transform(value: number): unknown {
    return `${BRL.format(value)}`;
  }

}
