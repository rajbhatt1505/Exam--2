import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor( private auth:AuthService, private router:Router) { }
data:any;
  ngOnInit(): void {
    this.auth.get().subscribe((res)=>{
this.data=res
console.log(this.data);

    })
  }
  del(id:any){
    console.log(id)
    this.auth.del(id).subscribe((res:any)=>{
        console.log("Profile successfully deleted");
        console.log(res.message);   
        this.ngOnInit()
    })
}}