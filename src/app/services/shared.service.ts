import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../models/order';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  firstArray = new BehaviorSubject<IOrder[]>([]);
  secondArray = new BehaviorSubject<IOrder[]>([]);

  // firstArray$ = this.firstArray.asObservable();
  // secondArray$ = this.secondArray.asObservable();

  http = inject(HttpClient);

  fetchData(url: string) {
    this.http.get<IOrder[]>(url).subscribe(data => {
      this.firstArray.next(data);
    });
  }

  addDataToFirstArray(url: string, data: IOrder) {
    return this.http.post<IOrder>(url, data).subscribe(data => {
      const currentValue = this.firstArray.getValue();
      currentValue.push(data);
      return this.firstArray.next([...currentValue, data]);
    });
  }

  transferItemToSecondArray(item: IOrder) {
    const currentFirstArray = this.firstArray.value;
    const currentSecondArray = this.secondArray.value;
  
    // Remove the item from the first array
    const updatedFirstArray = currentFirstArray.filter(i => i !== item);
    // Add the item to the second array
    const updatedSecondArray = [...currentSecondArray, item];
    currentSecondArray.push(item);
  
    console.log('Before update:', { currentFirstArray, currentSecondArray });
    console.log('After update:', { updatedFirstArray, updatedSecondArray });
    
    // Update the BehaviorSubjects
    this.firstArray.next(updatedFirstArray);
    this.secondArray.next(updatedSecondArray);
  }

  public getSecondArray() {
    return this.secondArray.value
  }
  
}