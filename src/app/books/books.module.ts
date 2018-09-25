import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './components/book/book.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UpperCaseFirstLetterPipe } from './pipes/upper-case-first-letter.pipe';


 


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [BookComponent, UpperCaseFirstLetterPipe],
  exports: [
    BookComponent
  ],
  providers: [
    UpperCaseFirstLetterPipe
  ]
})
export class BooksModule { }
