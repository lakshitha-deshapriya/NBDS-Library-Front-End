import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookSearchComponent} from './components/book-search/book-search.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {AddBookComponent} from './components/add-book/add-book.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';


const appRoutes: Routes = [
  {path: '', component: BookSearchComponent},
  {path: 'bookSearch', component: BookSearchComponent},
  {path: 'bookDetails', component: BookDetailsComponent},
  {path: 'addBook', component: AddBookComponent},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
