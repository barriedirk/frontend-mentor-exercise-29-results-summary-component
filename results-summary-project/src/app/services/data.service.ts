import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Summary } from '@models/summary';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = 'assets/data/data.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<Summary> {
    return this.http.get<Summary>(this.dataUrl);
  }
}
