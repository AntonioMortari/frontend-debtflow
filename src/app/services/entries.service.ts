import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateEntry, IEntry } from '../@types/entry';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getByUserId(userId: string, status?: string): Observable<any> {
    const url = status !== undefined 
      ? `${this.baseUrl}/entries/user/${userId}?status=${status}` 
      : `${this.baseUrl}/entries/user/${userId}`;
  
    return this.http.get(url).pipe();
  }

  public deleteById(id: string) {
    const url = this.baseUrl + `/entries/${id}`;
    return this.http.delete(url).pipe();
  }

  public updateById(entry: IEntry) {
    const url = this.baseUrl + `/entries/${entry._id}`;

    const { date, description, price, status } = entry;

    console.log(new Date(date).toISOString())

    return this.http.put(url, {
      date: new Date(date).toISOString(),
      description,
      price: Number(price),
      status,
    });
  }

  public create(entry: ICreateEntry, userId: string) {
    const url = this.baseUrl + '/entries';

    console.log({
      ...entry,
      date: entry.date.toISOString(),
      userId,
    });

    return this.http.post(url, {
      ...entry,
      userId,
    });
  }
}
