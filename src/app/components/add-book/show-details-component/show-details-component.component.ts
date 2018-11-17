import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { Router } from '@angular/router';
import { BookAddService } from 'src/app/services/book-add/book-add.service';

@Component({
  selector: 'app-show-details-component',
  templateUrl: './show-details-component.component.html',
  styleUrls: ['./show-details-component.component.css']
})
export class ShowDetailsComponentComponent implements OnInit {
  bookDetails: Book;

  constructor(private bookAddService: BookAddService, private router: Router) {
  }

  ngOnInit() {
    this.loadBookDetails();
  }

  loadBookDetails() {
    this.bookDetails = this.bookAddService.book;
    if (this.bookDetails == null) {
      this.router.navigate(['/page-not-found']);
    }
  }
}
