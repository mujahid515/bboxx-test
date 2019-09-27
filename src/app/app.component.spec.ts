import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MySearchPipe } from './pipes/my-search-pipe.pipe';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';

beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      Ng2SearchPipeModule,
      NgxPaginationModule,
      AngularFontAwesomeModule,
      ReactiveFormsModule
    ],
    declarations: [
      AppComponent,
      MySearchPipe
    ],
  }).compileComponents();
}));

describe('AppComponent', () => {
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

describe('ngOnInit', () => {
  it('should build a form group', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    expect(app.formBuilder.group).toBeTruthy();
  });
});

describe('getItems', () => {
  it('should get array from api service and store array in "items"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.getItems();
    setTimeout(() => {
      expect(app.items.length).toBeGreaterThan(0);
    }, 10);
  });
})

describe('deleteItem', () => {
  it('should delete the user with the inputted ID', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(window, 'alert');
    app.ngOnInit();
    setTimeout(() => {
      var item = app.items[0];
      var id = app.items[0].id;
      app.deleteItem(item, id);
      expect(window.alert).toHaveBeenCalledWith('the user with ID ' + id + ' was deleted!');
    }, 5);
  });
});

describe('addItem', () => {
  it('should add new user to list', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(window, 'alert');
    app.ngOnInit();
    var data = {
      address: {
        street: 'test street',
        suite: 'test suite',
        city: 'test city',
        zipcode: 'test zipcode',
        geo: {
          lat: '',
          lng: ''
        }
      },
      company: {
        name: 'test company name',
        catchPhrase: '',
        bs: ''
      },
      email: 'test@email.com',
      id: 1000,
      name: 'test name',
      phone: 'test phone',
      username: 'test username',
      website: 'test website'
    }
    app.addItem(data);
    setTimeout(() => {
      console.log('window.alert: ', window.alert);
      expect(window.alert).toHaveBeenCalledWith(data.username + ' has been added!');
    }, 10);
  })
});

/*describe('updateFilter', () => {
  it('should update currentFilter to the target.value of the provided event object', () => {

  })
});

describe('showAddUserForm', () => {
  it('should update the value of showForm to true', () => {

  })
});

describe('hideAddUserForm', () => {
  it('should update the value of showForm to false', () => {

  });

  it('should update the value of submitted to false', () => {

  });

  it('should call the reset() method on newUserForm', () => {

  });
});

describe('f', () => {
  it('should return form controls of newUserForm', () => {

  })
});

describe('getLatestID', () => {
  it('should push all IDs from the items array into the listOfIDs array', () => {

  });

  it('should find the highest number in the listOfIDs array, add 1 to it and store it in the var newID', () => {

  });

  it('should return the var newID', () => {

  });
});

describe('onSubmit', () => {
  it('should update the value of submitted to true', () => {

  });

  it('should end the function if newUserForm.invalid is true', () => {

  });

  it('should call the getLatestID function and store the returned number in the const finalId', () => {

  });

  it('should store an empty string in the var finalCatchPhrase', () => {

  });

  it('should store an empty string in the var finalBs', () => {

  });

  it('should store the value of newUserForm.value.catchPhrase in the var finalCatchPhrase if it isnt null', () => {

  });

  it('should store the value of newUserForm.value.bs in the var finalBs if it isnt null', () => {

  });

  it('should populate and store an object in the const data', () => {

  });

  it('should call the addItem method and use the generated const data as its parameter', () => {

  });

  it('should call the hideAddUserForm method', () => {

  });
})*/
