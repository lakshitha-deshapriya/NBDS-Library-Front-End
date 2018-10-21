import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import { Book } from 'src/app/models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookSearchService {
  bookList: Book[];
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {
  }

  getAllBooks() {
    return this.http.get(this.baseURL + 'books');
  }

  getAllCategories() {
    return this.http.get(this.baseURL + 'books/categories');
  }
}
