import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookSearchComponent} from './components/book-search/book-search.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {AddBookComponent} from './components/add-book/add-book.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import { ShowDetailsComponent } from './components/add-book/show-details-component/show-details.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {EditBookComponent} from './components/edit-book/edit-book.component';


const appRoutes: Routes = [
  {path: '', component: BookSearchComponent},
  {path: 'bookSearch', component: BookSearchComponent},
  {path: 'bookDetails', component: BookDetailsComponent},
  {path: 'addBook', component: AddBookComponent},
  {path: 'showDetails', component: ShowDetailsComponent},
  {path: 'logIn', component: LoginComponent},
  {path: 'register', component: SignupComponent},
  {path: 'editBook', component: EditBookComponent},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'bookSearch'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
