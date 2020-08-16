import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../shared/Baseurl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  constructor(private http: HttpClient) {}

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(BaseURL + 'leadership');
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(BaseURL + 'leadership/' + id);
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http
      .get<Leader[]>(BaseURL + 'leadership?featured=true')
      .pipe(map((leaders) => leaders[0]));
  }
}
