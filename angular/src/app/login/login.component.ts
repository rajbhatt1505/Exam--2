import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private cookieService: CookieService) {
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }
  login() {
    // alert("Login Success")
    const data = this.loginForm.value;

    this.auth.signin(data).subscribe((res) => {
      this.cookieService.set('token', res.token);
      if (res.success) {
        console.log(res);

        localStorage.setItem('token', res.token)
        this.router.navigate(['/profile'])
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        alert('login success');
      } else {
        alert(res.message)
      }
    }, err => {
      alert("Login faild !!")
    })
  }

}
