import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor(private http:HttpClient) { }

  isAuthenticated(){
    return this.isLoggedIn;
  }

  signup(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/auth/register',data,{withCredentials:true});
  }
  signin(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/auth/login',data,{withCredentials:true})
  }
  getProfile():Observable<any>{
    // const headers ={
    //   'Authorization':"Bearer" + localStorage.getItem('token')
    // }
    return this.http.get('http://localhost:8080/auth/profile',{withCredentials:true})
  }
  get(){
    return this.http.get('http://localhost:8080/auth/get',{withCredentials:true})
  }
  // Profiledelete(id:any):Observable<any> {

  // }
  profile(data:any){
   return this.http.post("http://localhost:8080/auth/Profileget",data)
  }
  
  del(data:any){
   return this.http.delete("http://localhost:8080/auth/delete/"+data)
  }
  update(data:any,id:any){
   return this.http.patch("http://localhost:8080/auth/update/"+id,data)
  }

  }
  
  
  
  
  
  
