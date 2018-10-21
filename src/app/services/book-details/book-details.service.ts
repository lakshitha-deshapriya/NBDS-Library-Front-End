import { Injectable } from '@angular/core';
import {Book} from '../../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
  bookDetails: Book;

  constructor() { }

  setBookDetail( book: Book ) {
    if (book != null) {
      this.bookDetails = book;
    }    
  }
}
