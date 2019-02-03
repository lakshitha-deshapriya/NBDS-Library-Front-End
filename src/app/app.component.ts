import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {Constant} from './Constants/Constant';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mobileQuery: MediaQueryList;
  checked = false;

  loggedIn = false;

  private _mobileQueryListener: () => void;

  ngOnInit() {
  }

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router,
              private translateService: TranslateService, public dialog: MatDialog, private snackBar: MatSnackBar,
              private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  changed() {
    if (this.checked) {
      this.translateService.use('sl');
    } else {
      this.translateService.use('en');
    }
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.loggedIn = this.authService.isLoggedIn;
    });
  }

  openSignUp() {
    const dialogRef = this.dialog.open(SignupComponent);

    dialogRef.afterClosed().subscribe(() => {
      // this.getAllBooks();
    });
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = Constant.verticalPosition;
    config.horizontalPosition = Constant.horizontalPosition;
    config.duration = Constant.autoHide;
    this.snackBar.open(message, action, config);
  }

  logOut() {
    this.loggedIn = false;
    this.authService.isLoggedIn = false;
    this.authService.user = null;
    this.openSnackBar('Logged out successfully', 'Logout');
  }

  activateAddBook() {
    if (this.loggedIn)
    {
      return 'active';
    }
    return '';
  }
}
