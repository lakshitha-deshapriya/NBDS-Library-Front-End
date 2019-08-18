import {Injectable} from '@angular/core';
import {Book} from '../models/Book';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {BookDetailsComponent} from '../components/book-details/book-details.component';
import {Constant} from '../Constants/Constant';
import {Router} from '@angular/router';
import {BookDetailsService} from './book-details.service';
import {EditBookComponent} from "../components/edit-book/edit-book.component";

@Injectable({
  providedIn: 'root'
})
export class BookEditService {
  baseURL = environment.baseURL;
  book: Book;
  image: File = null;

  constructor(private bookDetailsService: BookDetailsService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              private router: Router,
              private http: HttpClient) {
  }

  saveBook(image: File, book: Book, dialogRef: MatDialogRef<EditBookComponent> ) {
    const formData: FormData = new FormData();
    formData.append('file', image);
    let saveFinished = false;

    if (image != null) {
      this.http.post(this.baseURL + 'books/uploadImage', formData, {responseType: 'text'}).subscribe(
        (msg: String) => {
          this.image = image;
          this.book = book;
          this.http.post(this.baseURL + 'books', this.book).subscribe(
            (savedBook: Book) => {
              this.book = savedBook;
              this.openBookDetailsDialog( dialogRef );
            },
            (error => {
              console.log(error);
              this.openSnackBar( 'Book Edit failed', 'Save' );
            })
          );
        },
        (error) => {
          console.log(error);
          this.openSnackBar( 'Book Edit failed', 'Save' );
        }
      );
    } else {
      this.http.post(this.baseURL + 'books', this.book).subscribe(
        (savedBook: Book) => {
          this.book = savedBook;
          saveFinished = true;
          this.book = savedBook;
          this.openBookDetailsDialog( dialogRef );
        },
        (error => {
          console.log(error);
          this.openSnackBar( 'Book Edit failed', 'Save' );
        })
      );
    }
  }

  openBookDetailsDialog( editDialogRef: MatDialogRef<EditBookComponent> ) {
    this.bookDetailsService.setBookDetail( this.book );
    editDialogRef.close();
    this.dialog.open(BookDetailsComponent).afterClosed().subscribe(() => {
      this.router.navigate(['/bookSearch']);
    });
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = Constant.verticalPosition;
    config.horizontalPosition = Constant.horizontalPosition;
    config.duration = Constant.autoHide;
    this.snackBar.open(message, action, config);
  }
}
