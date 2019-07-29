import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpInfo} from '../../models/signup-info';
import {AuthService} from '../../services/auth.service';
import {MatDialogRef, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {Constant} from '../../Constants/Constant';

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

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SignupComponent>,
              private translator: TranslateService) {
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

    let action = '';
    let message = '';
    this.translator.get('Sign_up.SignUp').subscribe((text: string) => action = text);
    this.authService.register(this.signUpInfo).subscribe(
      () => {
        this.translator.get('Sign_Up.SignUpSuccess').subscribe((text: string) => message = text);
        this.openSnackBar(message, action);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.dialogRef.close();
      },
      error => {
        message = error.error.message;
        this.openSnackBar(message, action);
        this.isSignUpFailed = true;
        this.signUpForm.reset();
      }
    );
  }

  setEmailFocus(focus: boolean) {
    this.emailFocused = focus;
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = Constant.verticalPosition;
    config.horizontalPosition = Constant.horizontalPosition;
    config.duration = Constant.autoHide;
    this.snackBar.open(message, action, config);
  }
}
