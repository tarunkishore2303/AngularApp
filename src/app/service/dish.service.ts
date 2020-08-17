import { Injectable } from '@angular/core';
import { Dish } from '../shared/Dish';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../shared/Baseurl';
import { Observable } from 'rxjs';
import { ProcessHTTPmsgService } from '../service/process-httpmsg.service';
@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPmsgService
  ) {}

  getDishes(): Observable<Dish[]> {
    return this.http
      .get<Dish[]>(BaseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http
      .get<Dish>(BaseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get<Dish[]>(BaseURL + 'dishes?featured=true')
      .pipe(map((dishes) => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .pipe(map((dishes) => dishes.map((dish) => dish.id)))
      .pipe(catchError((error) => error));
  }
}
