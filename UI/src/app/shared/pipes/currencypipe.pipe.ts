import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'currencypipe'
})
export class CurrencypipePipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: any): any {
    if (!isNaN(value)) {
      if(value < 0){
        const formattedValue = this.currencyPipe.transform(value, 'USD' , 'symbol' , '3.2');
        const finalValue = formattedValue.substring(1);
        return '(' + finalValue + ')';
      } else if(value === 0){
        return this.currencyPipe.transform(value, 'USD' , 'symbol' , '1.2');
      } else {
        return this.currencyPipe.transform(value, 'USD' , 'symbol' , '3.2');
      }
    }
    return value;
  }

}
