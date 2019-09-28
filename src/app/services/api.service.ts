import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  items: Observable<any>;
  private userSource = new BehaviorSubject([]);
  currentUsers = this.userSource.asObservable();
  freezeData = false;
  finalArray;
  firstPost = true;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getData(dataType){
    var prom = new Promise((resolve, reject) => {
      this.httpClient.get(`https://jsonplaceholder.typicode.com/${dataType}`).pipe(take(1)).subscribe((data) => {
        this.userSource.next([data]);
        //this.finalArray = data; <<< Uncommenting this allows for delete to work
        console.log('this.userSource: ', this.userSource)
        //this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
        resolve();
      })
    });
    return prom;
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
    this.httpClient.post(`https://jsonplaceholder.typicode.com/${dataType}`, data, options);
    //afer the first user is added we will concat on finalArray as database is not really updated
    if(!this.firstPost) {
      var array = this.finalArray;
    } else {
      var array = this.userSource['value'][0];
      this.firstPost = false;
    }
    //push newData into the array in the userSource Subject.
    this.finalArray = array.concat([JSON.parse(data)]);
    this.updateUsersList(this.finalArray)
    alert('A new user has been added!');
    this.freezeData = true;
    this.navigateTo('/search');
  }

  updateUsersList(list) {
    this.userSource.next([list])
  }

  public navigateTo(string) {
    this.router.navigate([string]);
  }
}
