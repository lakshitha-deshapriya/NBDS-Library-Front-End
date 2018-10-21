import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment.prod';
import { Book } from 'src/app/models/Book';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookAddService {
  baseURL = environment.baseURL;
  book: Book[];
  responseMsg: string;

  constructor(private http: HttpClient) {}

  saveBook(book) {
    this.book = book;
    return this.http.post(this.baseURL + 'books', this.book);
  }
}
