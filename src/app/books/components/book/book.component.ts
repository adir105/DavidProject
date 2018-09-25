import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import {IBook} from '../../shared/interfaces/IBook';
import { BookService } from '../../shared/services/book.service';
import 'rxjs';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UpperCaseFirstLetterPipe } from '../../pipes/upper-case-first-letter.pipe';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

   books: Array<IBook>;
  private currentDeltedIndex = -1;
  private currentEditIndex = -1;
  currentBook: IBook;
  
  @ViewChild("title") private titleField: ElementRef;
  @ViewChild("authors") private authorField: ElementRef;
  @ViewChild("datePublished") private dateField: ElementRef;
  @ViewChild("editModal") private myEditeModal: ElementRef;

  title: FormControl;
  authors: FormControl;
  datePublished: FormControl;
  editForm: FormGroup;
  isTitleAlreadyExist: boolean = false;
  

  constructor(private bookService: BookService, private upperCaseFirstLetterPipe: UpperCaseFirstLetterPipe) {
    this.books = new Array<IBook>();
   }

  ngOnInit() { 
    this.getAllBooks();
    this.setCurrentBook();
   this.resetFormGroup();
  }
  setCurrentBook(){
    this.currentBook = {
      Id: 0,
      AuthorName: [],
      Title: '',
      PublishedDate: ''
    };
  }
  
  //initial form group.
  resetFormGroup(){
    this.title = new FormControl('', [Validators.required]);
    this.authors = new FormControl('', [Validators.required]);
    this.datePublished = new FormControl('',
             [Validators.required,
            Validators.pattern("^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$")]);

    this.editForm = new FormGroup({
      title: this.title,
      authors: this.authors,
      datePublished: this.datePublished
    });
  }
  saveIndex(index){
    this.currentDeltedIndex = index;
  } 
  saveEditIndex(index, book: IBook){
    this.currentEditIndex = index;
    this.currentBook = {
      Id: book.Id,
      Title: book.Title,
      AuthorName: book.AuthorName,
      PublishedDate: book.PublishedDate
    };
  } 

  deleteBook(){
    this.books.splice(this.currentDeltedIndex, 1);
  }

  editBook(){        
    let ans: boolean = this.titleAlreadyExist(this.titleField.nativeElement['value']);
    this.isTitleAlreadyExist = ans;
    if(this.editForm.valid && !ans){
      this.books[this.currentEditIndex].Title = this.titleField.nativeElement['value'];
      this.books[this.currentEditIndex].AuthorName = this.authorField.nativeElement['value'];
      this.books[this.currentEditIndex].PublishedDate = this.dateField.nativeElement['value'];
      this.myEditeModal.nativeElement.click();
      
      this.resetInputs();
    }
  }

  titleAlreadyExist(title: string): boolean{
    let ans: boolean = false;
    this.books.forEach(book => {
      let bookTitle = this.upperCaseFirstLetterPipe.removeNonEnglishLetters(book.Title);      
      if(bookTitle.toLowerCase() === title.toLowerCase()){
        ans = true;
          return ans;
      } 
    });
    return ans;
  }

  resetInputs(){
    this.titleField.nativeElement['value'] = "";
    this.authorField.nativeElement['value'] = "";
    this.dateField.nativeElement['value'] = "";
  }

  getAllBooks(){
    this.bookService.getAll().subscribe(
      (data) => {
        data['items'].forEach(item => {
          let book: IBook = {
            Id: item['id'],
            Title: item['volumeInfo']['title'],
            AuthorName: item['volumeInfo']['authors'],
            PublishedDate: item['volumeInfo']['publishedDate']  
          };
          this.books.push(book);  
        });
      },
      (error) => {
        console.log(error);
      } 
    );
  }
}
