import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //used for search results and search filters
  items;
  searchText;
  pageNumber: number = 1;
  currentFilter = 'id';

  //Used for form
  showForm = false;
  newUserForm: FormGroup;
  submitted = false;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newUserForm = this.formBuilder.group({
      street: ['', Validators.required],
      suite: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      companyName: ['', Validators.required],
      catchPhrase: [''],
      bs: [''],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      website: ['', Validators.required],
    });
    this.getItems();
  }

  getItems() {
    //Get JSON from API and push to items
    this.apiService.getData('users').subscribe((data) => {
      console.log('Data: ', data);
      this.items = data;
    });
    //this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  }

  deleteItem(item, id) {
    console.log('Delete item: ', item);
    this.apiService.deleteData('users', id, item).subscribe((data) => {
      console.log('New Data After Delete: ', data);
      //Data is not deleted from API so commenting this out for now
      //this.items = data;
    });
  }

  addItem(data) {
    this.apiService.postData('users', JSON.stringify(data)).subscribe((newData) => {
      console.log('New data after post: ', newData);
      this.items = newData;
    })
  }

  updateFilter(e) {
    this.currentFilter = e.target.value;
  }

  showAddUserForm() {
    this.showForm = true;
  }

  hideAddUserForm() {
    this.showForm = false;
    this.submitted = false;
    this.newUserForm.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.newUserForm.controls; }

  getLatestID() {
    var listOfIDs = [];
    for(var i = 0; i < this.items.length; i++) {
      listOfIDs.push(this.items[i].id);
    }
    var newID = Math.max.apply(Math, listOfIDs) + 1;
    return newID;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newUserForm.invalid) {
        return;
    }
    //Success! post data to API
    console.log('form data: ', this.newUserForm.value);
    const finalId = this.getLatestID();
    var finalCatchPhrase = '';
    var finalBs = '';
    if(this.newUserForm.value.catchPhrase == null) {
      finalCatchPhrase = '';
    } else {
      finalCatchPhrase = this.newUserForm.value.catchPhrase;
    }
    if(this.newUserForm.value.bs == null) {
      finalBs = ''
    } else {
      finalBs = this.newUserForm.value.bs;
    }
    const data = {
      address: {
        street: this.newUserForm.value.street,
        suite: this.newUserForm.value.suite,
        city: this.newUserForm.value.city,
        zipcode: this.newUserForm.value.zipcode,
        geo: {
          lat: "",
          lng: ""
        }
      },
      company: {
        name: this.newUserForm.value.companyName,
        catchPhrase: finalCatchPhrase,
        bs: finalBs
      },
      email: this.newUserForm.value.email,
      id: finalId,
      name: this.newUserForm.value.firstName + ' ' + this.newUserForm.value.lastName, //fname + lname
      phone: this.newUserForm.value.phone,
      username: this.newUserForm.value.username,
      website: this.newUserForm.value.website
    }
    console.log('FinalData: ', data);
    this.addItem(data);
    this.hideAddUserForm();
  }
}
