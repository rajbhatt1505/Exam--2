import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksListComponent } from './books-list/books-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
// import { AuthGuard } from './service/auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile', component:ProfileComponent},
  {path:'home',component:HomeComponent},
  {path:'user',component:UserComponent},
  {path:'books-list',component:BooksListComponent},
  { path:'add-book', component:AddBookComponent},
  {path:'edit-book/:id', component:BookDetailComponent},
  {path:'', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
