import {Injectable} from '@angular/core';
import {Book} from '../models/Book';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
  baseURL = environment.baseURL;
  bookDetails: Book;

  constructor(private http: HttpClient) {
  }

  setBookDetail(book: Book) {
    if (book != null) {
      this.bookDetails = book;
    }
  }

  loadImage(imageName: string): Observable<Blob> {
    const params = new HttpParams().set('imageName', imageName);
    return this.http.get(this.baseURL + 'books/loadImage', { params: params, responseType: 'blob' });
  }
}
