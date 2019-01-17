import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpInfo} from '../../models/signup-info';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  emailFocused = false;

  signUpInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.email),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    });
  }

  register() {
    const formValues = this.signUpForm.value;
    this.signUpInfo = new SignUpInfo(
      formValues.name,
      formValues.username,
      formValues.email,
      formValues.password);

    this.authService.register(this.signUpInfo).subscribe(
      () => {
        this.openSnackBar(this.errorMessage, '');
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        this.errorMessage = error.error.message;
        this.openSnackBar(this.errorMessage, '');
        this.isSignUpFailed = true;
      }
    );
  }

  setEmailFocus(focus: boolean) {
    this.emailFocused = focus;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
