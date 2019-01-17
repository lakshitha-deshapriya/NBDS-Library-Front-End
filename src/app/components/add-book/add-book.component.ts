import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {BookSearchService} from '../../services/book-search.service';
import {Book} from '../../models/Book';
import { BookAddService } from 'src/app/services/book-add.service';
import { Router } from '@angular/router';
import { BookDetailsService } from 'src/app/services/book-details.service';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  addBook: FormGroup;
  uploadedImage: File;
  imageName: string;
  imageSrc: string;
  imageAdded = false;
  newBook: Book;

  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(private bookSearchService: BookSearchService,
    private bookAddService: BookAddService,
    private router: Router,
    private bookDetailsService: BookDetailsService,
    public dialog: MatDialog
    ) {
  }

  ngOnInit() {
    this.getAllCategories();
    this.addBook = new FormGroup({
      'bookTitle': new FormControl(null, Validators.required),
      'author': new FormControl(null, Validators.required),
      'category': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'publisher': new FormControl(null, Validators.required),
      'publishedDate': new FormControl(null, Validators.required),
      'image': new FormControl(null),
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
    this.filteredOptions = this.addBook.get('category').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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

  onSave() {
    const formValues = this.addBook.value;
    this.newBook = new Book(
      formValues.bookTitle,
      formValues.description,
      formValues.author,
      formValues.publishedDate,
      formValues.category,
      formValues.publisher,
      this.imageName
    );

    this.bookAddService.saveBook(this.uploadedImage, this.newBook);

    this.bookDetailsService.setBookDetail(this.newBook);
    this.openBookDetailsDialog();
  }

  openBookDetailsDialog() {
    const dialogRef = this.dialog.open(BookDetailsComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/bookSearch']);
    });
  }
}
