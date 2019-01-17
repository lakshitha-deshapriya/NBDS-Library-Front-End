import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookSearchService {
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
