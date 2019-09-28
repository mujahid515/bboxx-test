import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  //used for search results and search filters
  searchText;
  pageNumber: number = 1;
  currentFilter = 'id';
  items;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    //Get Observable from API and store in items
    this.apiService.getData('users').then(() => {
      console.log('this.apiService.currentUsers: ', this.apiService.currentUsers);
      this.apiService.currentUsers.pipe(take(1)).subscribe((data) => {
        if(!this.apiService.freezeData) {
          this.items = data[0];
        } else {
          this.items = this.apiService.finalArray;
        }
        console.log('this.items: ', this.items);
      });
    })
  }

  removeFunc(array, key, value) {
      const index = array.findIndex(obj => obj[key] === value);
      return index >= 0 ? [
          ...array.slice(0, index),
          ...array.slice(index + 1)
      ] : array;
  }

  deleteItem(item, id) {
    this.apiService.deleteData('users', id, item);
    var array = this.apiService.finalArray;
    //delete object with matching id and create new array
    this.apiService.finalArray = this.removeFunc(array, 'id', id);
    console.log('DELETE this.apiService.finalArray: ', this.apiService.finalArray);
    this.apiService.updateUsersList(this.apiService.finalArray)
    alert('the user with ID ' + id + ' was deleted!');
    this.items = this.apiService.finalArray;
  }

  updateFilter(e) {
    this.currentFilter = e.target.value;
  }

  addUser() {
    this.apiService.navigateTo('/add');
    this.apiService.freezeData = false;
  }

}
