import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  items: Observable<any>;
  private userSource = new BehaviorSubject([]);
  currentUsers = this.userSource.asObservable();
  freezeData = false;
  finalArray;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getData(dataType){
    var prom = new Promise((resolve, reject) => {
      this.httpClient.get(`https://jsonplaceholder.typicode.com/${dataType}`).pipe(take(1)).subscribe((data) => { //send GET method to API
        if(!this.freezeData) {
          this.userSource.next([data]); //if we didnt use a local version of data this would be needed
          this.finalArray = data; //local version of data
        }
        resolve();
      })
    });
    return prom;
  }

  removeFunc(array, key, value) {
      //searches array by key/ value pair and returns a new array with that key/ value pair removed.
      const index = array.findIndex(obj => obj[key] === value);
      return index >= 0 ? [
          ...array.slice(0, index),
          ...array.slice(index + 1)
      ] : array;
  }

  public deleteData(dataType, id, body) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: body
    };
    this.httpClient.delete(`https://jsonplaceholder.typicode.com/${dataType}/${id}`, options).pipe(take(1)).subscribe(); //send DELETE method to API
    this.freezeData = true; //controls getData logic
    this.finalArray = this.removeFunc(this.finalArray, 'id', id); //delete object with matching id and create new array
    this.updateUsersList(this.finalArray) //If we didnt use a local version of API data this would be needed
    Swal.fire({
      title: 'Success!',
      text: 'the user with ID ' + id + ' was deleted!',
      type: 'success'
    });
    return this.finalArray;
  }

  public postData(dataType, data) {
    const options = {
      headers: new HttpHeaders({
          'Accept': 'text/html',
          'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'text'
    };
    this.httpClient.post(`https://jsonplaceholder.typicode.com/${dataType}`, data, options).pipe(take(1)).subscribe(); //send POST method to API
    //afer the first user is added we will concat on finalArray as database is not really updated
    var array = this.finalArray;
    this.finalArray = array.concat([JSON.parse(data)]);
    console.log('finalArray: ', this.finalArray);
    this.updateUsersList(this.finalArray) //If we didnt use a local version of API data this would be needed
    Swal.fire({
      title: 'Success!',
      text: 'New user has been added!',
      type: 'success'
    });
    this.freezeData = true; //controls getData logic
    this.navigateTo('/');
  }

  public updateUsersList(list) {
    this.userSource.next([list])
  }

  public navigateTo(string) {
    this.router.navigate([string]);
  }
}
