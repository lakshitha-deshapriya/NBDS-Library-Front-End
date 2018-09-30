import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  addBook: FormGroup;

  constructor() { }

  ngOnInit() {
    this.addBook = new FormGroup({
      'bookTitle': new FormControl(null, Validators.required),
      'roomType': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required),
      'endDate': new FormControl(null, Validators.required),
      'noofrooms': new FormControl(null, Validators.required),
      'maxAdults': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'markup': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'pbox': new FormControl(null, Validators.required),
      'region': new FormControl(null),
      'city': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'zipcode': new FormControl(null)
    });
  }

}
