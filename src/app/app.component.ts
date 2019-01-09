import {ChangeDetectorRef, Component} from '@angular/core';
import {Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  checked = false;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private translateService: TranslateService) {
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
    console.log(this.checked);
  }
}
