import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/Book';
import {BookDetailsService} from '../../services/book-details.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookDetails: Book;

  imageToShow: any;
  isImageLoading: boolean;

  constructor(private bookDetailsService: BookDetailsService,
              public domSanitizer: DomSanitizer,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.validateLogIn();
    this.loadBookDetails();
  }

  loadBookDetails() {
    this.bookDetails = this.bookDetailsService.bookDetails;
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
