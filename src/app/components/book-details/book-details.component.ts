import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/BookSearchTable';
import {BookDetailsService} from '../../services/book-details/book-details.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookDetails: Book;

  constructor(private bookDetailService: BookDetailsService) {
  }

  ngOnInit() {
    this.loadBookDetails();
  }

  loadBookDetails() {
    this.bookDetails = this.bookDetailService.bookDetails;
  }

}
