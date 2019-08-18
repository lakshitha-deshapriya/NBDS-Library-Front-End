import {Injectable} from '@angular/core';
import {Book} from '../models/Book';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {Utils} from "../utils/Utils";

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
      this.mapData( book );
      this.bookDetails = book;
    }
  }

  loadImage(imageName: string): Observable<Blob> {
    const params = new HttpParams().set('imageName', imageName);
    return this.http.get(this.baseURL + 'books/loadImage', { params: params, responseType: 'blob' });
  }

  loadImageFromDb(imageName: string): Observable<Blob> {
    const params = new HttpParams().set('imageName', imageName);
    return this.http.get(this.baseURL + 'books/loadImageDb', { params: params, responseType: 'blob' });
  }

  private mapData(book: Book) {
      book.publishedDate = new Date(book.publishedDate);
      book.publishedDateStr = Utils.getCustomDate(book.publishedDate);
  }
}
