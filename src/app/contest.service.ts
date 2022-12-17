import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contestant } from './contestant.service';

export type Contest = {
  id: number;
  name: string;
};

export type PopulatedContest = Contest & {
  contestants: Contestant[];
};

export type ContestCreateData = Omit<Contest, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class ContestService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Makes a http request to retrieve all contests.
   * @returns list of contests
   */
  getAll() {
    return this.httpClient.get<Contest[]>('http://localhost:3000/contests', {
      withCredentials: true,
    });
  }

  /**
   * Makes a http request to retrieve a contest.
   * @param id contest id
   * @returns contest
   */
  get(id: number | string) {
    return this.httpClient.get<PopulatedContest>(
      `http://localhost:3000/contests/${id}`,
      { withCredentials: true }
    );
  }

  /**
   * Makes a http request to create a new contest.
   * @param data contest data
   * @returns created contest
   */
  create(data: ContestCreateData) {
    return this.httpClient.post<Contest>(
      'http://localhost:3000/contests',
      data,
      { withCredentials: true }
    );
  }

  /**
   * Assigns the contestant to the contest.
   * @param contestId id of contest to which contestant will be assigned
   * @param contestantId id of contestant
   * @returns
   */
  addContestant(contestId: number, contestantId: number) {
    return this.httpClient.post(
      `http://localhost:3000/contests/${contestId}/contestants`,
      { id: contestantId },
      { withCredentials: true }
    );
  }

  /**
   * Remove the contestant from the contest.
   * @param contestId
   * @param contestantId
   */
  removeContestant(contestId: number, contestantId: number) {
    return this.httpClient.delete(
      `http://localhost:3000/contests/${contestId}/contestants/${contestantId}`,
      { withCredentials: true }
    );
  }

  /**
   * Deletes the contest.
   * @param id id of the deleted contest
   */
  delete(id: number) {
    return this.httpClient.delete(`http://localhost:3000/contests/${id}`, {
      withCredentials: true,
    });
  }

  edit(id: number, data: Partial<Contest>) {
    return this.httpClient.put(`http://localhost:3000/contests/${id}`, data, {
      withCredentials: true,
    });
  }
}
