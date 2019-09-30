import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
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
    //Get array from API and store in items if freezeData is false. Else use finalArray which is a local version of that array.
    this.apiService.getData('users').then(() => {
      this.apiService.currentUsers.pipe(take(1)).subscribe((data) => {
        if(!this.apiService.freezeData) {
          this.items = data[0];
        } else {
          this.items = this.apiService.finalArray;
        }
      });
    })
  }

  deleteItem(item, id) {
    //update view with local version of data
    this.items = this.apiService.deleteData('users', id, item);
  }

  updateFilter(e) {
    this.currentFilter = e.target.value;
  }

  addUser() {
    this.apiService.navigateTo('/add');
  }

}
