import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {BookSearchService} from '../../services/book-search/book-search.service';
import {Book} from '../../models/BookSearchTable';
import {BookDetailsService} from '../../services/book-details/book-details.service';
import {BookDetailsComponent} from '../book-details/book-details.component';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  dataSource;

  bookList: Book[];
  book: Book;

  displayedColumns = ['bookId', 'bookTitle', 'author', 'publishedDate', 'detailsButton'];

  constructor(private bookSearchService: BookSearchService, private bookDetailsService: BookDetailsService, public dialog: MatDialog) {
    this.getAllBooks();
  }

  ngOnInit() {
  }

  getAllBooks() {
    this.bookSearchService.getAllBooks().subscribe(
      (books: Book[]) => {
        console.log(books);
        this.bookList = books;
        this.dataSource = new MatTableDataSource<Book>(this.bookList);
      },
      (error) => console.log(error)
    );
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

  openBookDetailsDialog() {
    const dialogRef = this.dialog.open(BookDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getAllBooks();
    });
  }
}
