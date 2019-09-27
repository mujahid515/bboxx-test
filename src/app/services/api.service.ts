import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getData(dataType){
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/${dataType}`);
  }

  public deleteData(dataType, id, body) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: body
    };
    return this.httpClient.delete(`https://jsonplaceholder.typicode.com/${dataType}/${id}`, options);
  }

  public postData(dataType, data) {
    const options = {
      headers: new HttpHeaders({
          'Accept': 'text/html',
          'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'text'
    };
    return this.httpClient.post(`https://jsonplaceholder.typicode.com/${dataType}`, data, options);
  }
}
