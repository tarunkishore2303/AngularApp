import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../shared/Baseurl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  constructor(private http: HttpClient) {}

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(BaseURL + 'promotions');
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(BaseURL + 'promotions/' + id);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http
      .get<Promotion[]>(BaseURL + 'promotions?featured=true')
      .pipe(map((dishes) => dishes[0]));
  }
}
