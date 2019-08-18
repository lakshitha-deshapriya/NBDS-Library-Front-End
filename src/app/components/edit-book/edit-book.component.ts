import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/Book';
import {BookEditService} from '../../services/book-edit.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../../services/auth.service';
import {BookDetailsService} from '../../services/book-details.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookSearchService} from '../../services/book-search.service';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  book: Book;
  editBook: FormGroup;

  imageToShow: any;
  isImageLoading: boolean;

  options: String[];
  filteredOptions: Observable<String[]>;

  uploadedImage: File;
  imageName: string;
  imageSrc: string;
  imageAdded = false;

  constructor( private bookEditService: BookEditService,
               private bookDetailService: BookDetailsService,
               private bookSearchService: BookSearchService,
               private authService: AuthService,
               public domSanitizer: DomSanitizer,
               public dialogRef: MatDialogRef<EditBookComponent>) { }

  ngOnInit() {
    this.authService.validateLogIn();
    this.loadBookDetails();
    this.getAllCategories();
    this.editBook = new FormGroup({
      'bookTitle': new FormControl(this.book.bookTitle, Validators.required),
      'author': new FormControl(this.book.author, Validators.required),
      'bookCode': new FormControl(this.book.bookCode, Validators.required),
      'category': new FormControl(this.book.category, Validators.required),
      'description': new FormControl(this.book.description, Validators.required),
      'publisher': new FormControl(this.book.publisher, Validators.required),
      'publishedDate': new FormControl(this.book.publishedDate, Validators.required),
      'image': new FormControl(null),
    });
  }

  onImageSelect(event) {
    this.uploadedImage = <File>event.target.files[0];
    this.imageName = this.uploadedImage.name;
    if (this.imageName.length > 17) {
      this.imageName = this.imageName.slice(0, 17);
      this.imageName = this.imageName.concat('...');
    }

    const reader = new FileReader();
    reader.onload = () => this.imageSrc = reader.result;
    this.imageAdded = true;
    reader.readAsDataURL(this.uploadedImage);
  }

  loadBookDetails() {
    this.book = this.bookEditService.book;
    this.isImageLoading = true;

    this.bookDetailService.loadImage(this.book.imageName).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  getAllCategories() {
    this.bookSearchService.getAllCategories().subscribe(
      (categories: string[]) => {
        this.options = categories;
        this.optionFilter();
      },
      (error) => console.log(error)
    );
  }

  private optionFilter() {
    this.filteredOptions = this.editBook.get('category').valueChanges
      .pipe(
        startWith(this.book.category),
        map(value => this._filter(value))
      );
  }

  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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

  onSave() {
    const formValues = this.editBook.value;
    this.imageName = this.imageAdded ? this.imageName : 'TBA.jpg';

    this.book.bookCode = formValues.bookCode;
    this.book.bookTitle = formValues.bookTitle;
    this.book.description = formValues.description;
    this.book.author = formValues.author;
    this.book.publisher = formValues.publisher;
    this.book.publishedDate = formValues.publishedDate;
    this.book.category = formValues.category;
    this.book.imageName = this.imageName;

    this.bookEditService.saveBook(this.uploadedImage, this.book, this.dialogRef );
  }

  clearImage() {
    this.uploadedImage = null;
    this.imageAdded = false;
  }
}
