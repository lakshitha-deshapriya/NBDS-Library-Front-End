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
  image: File;

  constructor(private http: HttpClient) {
  }

  saveBook(image: File, book: Book) {
    const formData: FormData = new FormData();
    formData.append('file', image);

    this.http.post(this.baseURL + 'books/uploadImage', formData, {responseType: 'text'}).subscribe(
      (msg: String) => {
        this.image = image;
        this.book = book;
        this.http.post(this.baseURL + 'books', this.book).subscribe(
          (savedBook: Book) => {
            this.book = savedBook;
          },
          (error => console.log(error))
        );
      },
      (error) => console.log(error)
    );
  }
}
