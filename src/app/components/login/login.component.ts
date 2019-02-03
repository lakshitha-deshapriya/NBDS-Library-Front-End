import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthLoginInfo} from '../../models/login-info';
import {AuthService} from '../../services/auth.service';
import {ErrorMsgService} from '../../services/error-msg.service';
import {
  MatDialogRef,
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';
import {Constant} from '../../Constants/Constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  errorMessage = '';
  private loginInfo: AuthLoginInfo;

  @ViewChild('user') userInput: ElementRef;

  constructor(private authService: AuthService, private msgService: ErrorMsgService,
              public dialogRef: MatDialogRef<LoginComponent>, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'userName': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (this.loginForm.valid && event.key === 'Enter') {
      this.login();
    }
  }

  login() {
    const formValues = this.loginForm.value;
    this.loginInfo = new AuthLoginInfo(formValues.userName, formValues.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      (user) => {
        this.authService.setLogInStatus(true);
        this.authService.user = user;
        this.openSnackBar('Logged in Successfully!', 'Login');
        this.dialogRef.close();
      },
      error => {
        this.errorMessage = error.error;
        this.authService.setLogInStatus(false);
        this.userInput.nativeElement.focus();
        this.openSnackBar(this.errorMessage, 'Login');
        this.loginForm.reset();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = Constant.verticalPosition;
    config.horizontalPosition = Constant.horizontalPosition;
    config.duration = Constant.autoHide;
    this.snackBar.open(message, action, config);
  }
}
