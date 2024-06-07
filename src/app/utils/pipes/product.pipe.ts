import { Pipe, type PipeTransform } from '@angular/core';
import { IProduct } from '../../models/product';


@Pipe({
  name: 'appProduct',
  standalone: true,
})
export class ProductPipe implements PipeTransform {

  transform(list: IProduct[], value: string) {
    return value ? list.filter(item => item.category === value) : list;
  }

}
