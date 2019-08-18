import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {BookSearchService} from '../../services/book-search.service';
import {Book} from '../../models/Book';
import {BookDetailsService} from '../../services/book-details.service';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {EditBookComponent} from '../edit-book/edit-book.component';
import {BookEditService} from '../../services/book-edit.service';
import {Utils} from '../../utils/Utils';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();

  bookList: Book[];
  book: Book;

  displayedColumns = ['bookCode', 'bookTitle', 'author', 'publishedDate', 'detailsButton', 'editButton'];

  constructor(private bookSearchService: BookSearchService,
              private bookDetailsService: BookDetailsService,
              private bookEditService: BookEditService,
              private authService: AuthService,
              public dialog: MatDialog) {
    this.getAllBooks();
  }

  ngOnInit() {

  }

  getAllBooks() {
    this.bookSearchService.getAllBooks().subscribe(
      (books: Book[]) => {
        books = this.mapData(books);
        this.bookList = books;
        this.dataSource = new MatTableDataSource<Book>(this.bookList);
      },
      (error) => console.log(error)
    );
  }

  private mapData(books: Book[]) {
    books.forEach(function (book) {
      book.publishedDate = new Date(book.publishedDate);
      book.publishedDateStr = Utils.getCustomDate(book.publishedDate);
    });
    return books;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  showDetails(bookId: number) {
    this.book = this.bookList.find(bk => bk.bookId === bookId);
    this.bookDetailsService.setBookDetail(this.book);
    this.openBookDetailsDialog();
  }

  editDetails(bookId: number) {
    this.bookEditService.book = this.bookList.find(bk => bk.bookId === bookId);
    const dialogRef = this.dialog.open(EditBookComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getAllBooks();
    });
  }

  openBookDetailsDialog() {
    const dialogRef = this.dialog.open(BookDetailsComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getAllBooks();
    });
  }

  isLoggedInUser() {
    return this.authService.isLoggedIn;
  }
}
