import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BookAddService } from 'src/app/services/book-add.service';
import {DomSanitizer} from '@angular/platform-browser';
import {BookDetailsService} from '../../../services/book-details.service';

@Component({
  selector: 'app-show-details-component',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {
  bookDetails: Book;

  imageToShow: any;
  isImageLoading: boolean;

  constructor(private bookAddService: BookAddService, public domSanitizer: DomSanitizer, private bookDetailsService: BookDetailsService) {
  }

  ngOnInit() {
    this.loadBookDetails();
  }

  loadBookDetails() {
    this.bookDetails = this.bookAddService.book;
    this.isImageLoading = true;

    this.bookDetailsService.loadImage(this.bookDetails.imageName).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
