import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment.prod';
import {Book} from 'src/app/models/Book';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookAddService {
  baseURL = environment.baseURL;
  book: Book;
  image: File;

  constructor(private http: HttpClient) {
  }

  saveBook(image: File, book: Book) {
    const formData: FormData = new FormData();
    formData.append('file', image);

    return this.http.post(this.baseURL + 'books/uploadImage', formData).subscribe(
      () => {
        this.image = image;
        this.book = book;
        return this.http.post(this.baseURL + 'books', this.book).subscribe(
          (savedBook: Book) => {
            this.book = savedBook;
          },
          (error => console.log(error))
        );
      },
      (error) => console.log(error)
    );
  }

  // saveImage(image: File) {
  //   const formdata: FormData = new FormData();
  //
  //   formdata.append('file', image);
  //
  //   return this.http.post(this.baseURL + 'books/uploadImage', formdata ).subscribe(
  //     (msg: String) => {
  //       console.log(msg);
  //     },
  //     (error1) => console.log(error1)
  //   );
  // }
}
