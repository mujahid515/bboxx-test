import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../../app.component';
import { MySearchPipe } from '../../pipes/my-search-pipe.pipe';
import { SearchComponent } from '../search/search.component';
import { AddComponent } from './add.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
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
      MySearchPipe,
      SearchComponent,
      AddComponent
    ],
    providers: [SearchComponent]
  }).compileComponents();
}));

describe('ngOnInit', () => {
  it('should build a form group', () => {
    const fixture = TestBed.createComponent(AddComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    expect(app.formBuilder.group).toBeTruthy();
  });
});
