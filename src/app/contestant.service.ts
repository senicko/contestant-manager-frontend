import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

export type Contestant = {
  id: number;
  name: string;
};

export type ContestantCreateData = Omit<Contestant, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class ContestantService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Makes an http request to retrieve all contestants.
   * @returns list of contestants
   */
  getAll() {
    return this.httpClient
      .get<Contestant[]>('http://localhost:3000/contestants', {
        withCredentials: true,
      })
      .pipe(
        catchError(() => {
          return of();
        })
      );
  }

  /**
   * Makes an http request to create a new contestant.
   * @param data contestant data
   * @returns
   */
  create(data: ContestantCreateData) {
    return this.httpClient
      .post<Contestant>('http://localhost:3000/contestants', data, {
        withCredentials: true,
      })
      .pipe(catchError(() => of()));
  }
}
