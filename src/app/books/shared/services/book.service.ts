import { Injectable } from '@angular/core';

//http
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { IBook } from '../interfaces/IBook';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly URL_GET_ALL: string = 'https://www.googleapis.com/books/v1/volumes?q=Develop&max-results=40';

  constructor(private httpClient: HttpClient) { }

  getAll(){

     return this.httpClient.get(this.URL_GET_ALL);
          
  }
}
