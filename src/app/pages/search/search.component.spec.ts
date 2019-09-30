import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from '../../app.component';
import { MySearchPipe } from '../../pipes/my-search-pipe.pipe';
import { SearchComponent } from './search.component';
import { AddComponent } from '../add/add.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';

import * as SweetAlert from 'sweetalert2';

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
      MySearchPipe,
      SearchComponent,
      AddComponent
    ],
    providers: [
      SearchComponent
    ]
  }).compileComponents();
}));

describe('getItems', () => {
  it('should get array from api service and store array in "items"', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    setTimeout(() => {
      expect(app.items.length).toBeGreaterThan(0);
    }, 10);
  });
});

describe('deleteItem', () => {
  it('should delete the user with the inputted ID', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    setTimeout(() => {
      var item = app.items[0];
      var id = app.items[0].id;
      app.deleteItem(item, id);
      expect(app.items[0].id).toBe(2);
    }, 10);
  });
});
