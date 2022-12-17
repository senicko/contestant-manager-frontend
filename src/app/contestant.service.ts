import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

export type Contestant = {
  id: number;
  name: string;
  gender: string;
  birthDate: string;
  skiLength: number;
};

export type ContestantCreateData = Omit<Contestant, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class ContestantService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Makes a http request to retrieve all contestants.
   * @returns list of contestants
   */
  getAll() {
    return this.httpClient.get<Contestant[]>(
      'http://localhost:3000/contestants',
      { withCredentials: true }
    );
  }

  get(id: number | string) {
    return this.httpClient.get<Contestant>(
      `http://localhost:3000/contestants/${id}`,
      { withCredentials: true }
    );
  }

  /**
   * Makes a http request to create a new contestant.
   * @param data contestant data
   * @returns created contestant
   */
  create(data: ContestantCreateData) {
    return this.httpClient.post<Contestant>(
      'http://localhost:3000/contestants',
      data,
      { withCredentials: true }
    );
  }

  /**
   * Edits the contestant.
   * @param id edited contestant's id
   * @param data updated data
   */
  edit(id: number, data: Partial<ContestantCreateData>) {
    return this.httpClient.put(
      `http://localhost:3000/contestants/${id}`,
      data,
      { withCredentials: true }
    );
  }

  /**
   * Removes the contestant.
   * @param id contestant id
   * @returns
   */
  remove(id: number) {
    console.log(id);

    return this.httpClient.delete(`http://localhost:3000/contestants/${id}`, {
      withCredentials: true,
    });
  }
}
