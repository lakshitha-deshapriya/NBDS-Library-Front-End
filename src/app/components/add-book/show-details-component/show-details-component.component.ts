import { Component, OnInit } from '@angular/core';
import { BookDetailsService } from 'src/app/services/book-details/book-details.service';
import { Book } from 'src/app/models/Book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-details-component',
  templateUrl: './show-details-component.component.html',
  styleUrls: ['./show-details-component.component.css']
})
export class ShowDetailsComponentComponent implements OnInit {
  bookDetails: Book;

  constructor(private bookDetailService: BookDetailsService, private router: Router) {
  }

  ngOnInit() {
    this.loadBookDetails();
  }

  loadBookDetails() {
    this.bookDetails = this.bookDetailService.bookDetails;
    if (this.bookDetails == null) {
      this.router.navigate(['/page-not-found']);
    }
  }
}
