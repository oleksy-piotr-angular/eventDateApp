import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly apiUrl = 'http://localhost:3000/';
  private http = inject(HttpClient);

  getEvents() {
    return this.http.get(`${this.apiUrl}events`);
  }
}
