import { Injectable } from '@angular/core';
import {Book} from '../../models/BookSearchTable';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
  bookDetails: Book;

  constructor() { }

  setBookDetail( book: Book ) {
    this.bookDetails = book;
  }
}
