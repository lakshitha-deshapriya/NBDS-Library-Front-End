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
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  errorMessage = '';
  msg1 = '';
  msg2 = '';
  private loginInfo: AuthLoginInfo;

  @ViewChild('user') userInput: ElementRef;

  constructor(private authService: AuthService, private msgService: ErrorMsgService,
              public dialogRef: MatDialogRef<LoginComponent>, public snackBar: MatSnackBar, private translate: TranslateService) {
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

    this.translate.get('Login.Login').subscribe((text: string) => this.msg2 = text);
    this.authService.attemptAuth(this.loginInfo).subscribe(
      (user) => {
        this.authService.setLogInStatus(true);
        this.authService.user = user;
        this.translate.get('Login.LoggedIn').subscribe((text: string) => this.msg1 = text);
        this.openSnackBar(this.msg1, this.msg2);
        this.dialogRef.close();
      },
      error => {
        this.errorMessage = error.error;
        this.authService.setLogInStatus(false);
        this.userInput.nativeElement.focus();
        this.openSnackBar(this.errorMessage, this.msg2);
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
