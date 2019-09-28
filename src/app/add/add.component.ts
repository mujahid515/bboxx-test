import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

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
  }

  addItem(data) {
    console.log('DATA!: ', data);
    this.apiService.postData('users', JSON.stringify(data));
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

  public maxID(listOfIDs, data) {
    for(var i = 0; i < data.length; i++) {
      listOfIDs.push(data[i].id);
    }
    var newID = Math.max.apply(Math, listOfIDs) + 1;
    return newID;
  }

  public getLatestID() {
    var listOfIDs = [];
    var prom = new Promise((resolve, reject) => {
      this.apiService.currentUsers.pipe(take(1)).subscribe((data) => {
        //afer the first user is added we will calculate ID from finalArray as database is not really updated
        if(!this.apiService.firstPost) {
          resolve(this.maxID(listOfIDs, this.apiService.finalArray));
        } else {
          resolve(this.maxID(listOfIDs, data[0]));
        }
      })
    })
    return prom;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newUserForm.invalid) {
        return;
    }
    //Success! post data to API
    this.getLatestID().then((finalId) => {
      var finalCatchPhrase = '';
      var finalBs = '';
      if(this.newUserForm.value.catchPhrase != null) {
        finalCatchPhrase = this.newUserForm.value.catchPhrase;
      }
      if(this.newUserForm.value.bs != null) {
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
    })
  }

}
