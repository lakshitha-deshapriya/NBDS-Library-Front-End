import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment.prod';
import {Book} from 'src/app/models/Book';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookAddService {
  baseURL = environment.baseURL;
  book: Book;
  image: File = null;

  constructor(private http: HttpClient) {
  }

  saveBook(image: File, book: Book) {
    const formData: FormData = new FormData();
    formData.append('file', image);

    if (image != null) {
      this.http.post(this.baseURL + 'books/uploadImage', formData, {responseType: 'text'}).subscribe(
        (msg: String) => {
          this.image = image;
          this.book = book;
          this.http.post(this.baseURL + 'books', this.book).subscribe(
            (savedBook: Book) => {
              this.book = savedBook;
              return true;
            },
            (error => {
              console.log(error);
              return false;
            })
          );
        },
        (error) => {
          console.log(error);
          return false;
        }
      );
    } else {
      this.http.post(this.baseURL + 'books', this.book).subscribe(
        (savedBook: Book) => {
          this.book = savedBook;
          return true;
        },
        (error => {
          console.log(error);
          return false;
        })
      );
    }
  }
}
